import { Request, Response } from "express";
import {
  addReviewservice,
  getProductReviewService,
  getUserReviewService,
  deleteProductReviewService,
  removeUserProductReviewService,
  updateReviewService,
} from "../services";

export const addReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const review = req.body;
    const allreadyReviewed = await getUserReviewService(productId, userId);
    if (allreadyReviewed.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "already reviewed",
      });
    } else {
      const data = await addReviewservice({
        ...review,
        userId,
        productId,
      });
      res.status(201).json({
        status: 201,
        success: true,
        message: "review added",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "unexpected Error while adding Review ",
    });
  }
};
export const getReview = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = await getProductReviewService(productId);
    res.status(200).json({
      status: 200,
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "unexpected Error while getting product review ",
    });
  }
};
export const deleteallProductReview = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = await deleteProductReviewService(productId);
    res.status(200).json({
      status: 200,
      success: true,
      message: "all review deleted",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "unexpected Error while deleting all review",
    });
  }
};
export const deleteUserReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const data = await removeUserProductReviewService(productId, userId);
    res.status(200).json({
      status: 200,
      success: true,
      message: "review removed",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "unexpected Error while deleting review",
    });
  }
};
export const updateReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const review = req.body;
    const allreadyReviewed = await getUserReviewService(productId, userId);
    if (allreadyReviewed.length <= 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No review available,review first",
      });
    } else {
      const data = await updateReviewService(productId, userId, review);
      res.status(200).json({
        status: 200,
        success: true,
        message: "review updated",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "unexpected Error while updating review",
    });
  }
};
