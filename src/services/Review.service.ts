import Review from "../database/models/Reviews.model";
import { Reviewinterface } from "../interfaces";

export const addReviewservice = async (newReview: Reviewinterface) => {
  const reviewData = {
    userId: newReview.userId,
    productId: newReview.productId,
    rating: newReview.rating,
    feedback: newReview.feedback,
  };

  const addReview = await Review.create(reviewData);
  return addReview;
};

export const getProductReviewService = async (productId: string) => {
  const getreview = await Review.findAll({
    where: { productId },
  });
  return getreview;
};
export const getUserReviewService = async (
  productId: string,
  userId: string,
) => {
  const getreview = await Review.findAll({
    where: { productId, userId },
  });
  return getreview;
};
export const deleteProductReviewService = async (productId: string) => {
  const deleteReview = await Review.destroy({
    where: {
      productId,
    },
  });
  return deleteReview;
};
export const removeUserProductReviewService = async (
  productId: string,
  userId: string,
) => {
  const removeReview = await Review.destroy({
    where: {
      productId,
      userId,
    },
  });
  return removeReview;
};
export const updateReviewService = async (
  productId: string,
  userId: string,
  newReview: Reviewinterface,
) => {
  const reviewData = {
    userId: newReview.userId,
    productId: newReview.productId,
    rating: newReview.rating,
    feedback: newReview.feedback,
  };
  const updateReview = await Review.update(reviewData, {
    where: {
      productId,
      userId,
    },
  });
  return updateReview;
};
