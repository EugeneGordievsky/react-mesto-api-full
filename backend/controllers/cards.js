const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NotValidError = require('../errors/not-valid-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Данные не найдены'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Данные не найдены'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Данные не найдены'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};
