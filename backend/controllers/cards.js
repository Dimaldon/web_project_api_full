import Card from '../models/card.js';

export const getCards = async (req, res, next) => {
  try {
    const cardsList = await Card.find();
    return res.send(cardsList);
  } catch (err) {
    return next(err);
  }
};

export const postCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    return res.send(newCard);
  } catch (err) {
    return next(err);
  }
};

export const deleteCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const selectedCard = await Card.findById(cardId).orFail();
    if (selectedCard.owner.valueOf() === req.user._id) {
      const deletedCard = await Card.findByIdAndRemove(cardId);
      return res.send(deletedCard);
    }
    return res
      .status(403)
      .send({ message: 'No tienes permiso para borrar esta carta' });
  } catch (err) {
    return next(err);
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(likedCard);
  } catch (err) {
    return next(err);
  }
};

export const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const dislikedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(dislikedCard);
  } catch (err) {
    return next(err);
  }
};
