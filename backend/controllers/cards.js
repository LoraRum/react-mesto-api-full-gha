const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

module.exports.getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const newCard = await Card.create({ ...req.body, owner: req.user._id });
    const card = await Card.findById(newCard._id).populate(['owner', 'likes']);

    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorMessage = err.message;
      next(new BadRequest(errorMessage));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (!card) {
      next(new NotFound('Card not found'));
    } else if (card.owner.toString() !== req.user._id) {
      next(new Forbidden('Deletion is not permitted'));
    } else {
      const deletedCard = await Card.findByIdAndRemove(cardId);

      if (!deletedCard) {
        next(new NotFound('Card not found'));
      } else {
        res.status(200).json(deletedCard);
      }
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Incorrect data provided'));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      next(new NotFound('Card not found'));
    } else {
      res.send(card);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Invalid card ID'));
    } else {
      next(err);
    }
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      next(new NotFound('Card not found'));
    } else {
      res.send(card);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Invalid card ID'));
    } else {
      next(err);
    }
  }
};
