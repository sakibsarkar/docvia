import catchAsyncError from "../../utils/catchAsync";
import sendResponse from "../../utils/send.response";
import subscriptionService from "./subscription.service";

const createSubscription = catchAsyncError(async (req, res) => {
  const userId = req.user!.id;
  const planId = req.body.planId;
  const session = await subscriptionService.createSubscription(userId, planId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: {
      url: session.url,
    },
    message: "Checkout session link",
  });
});
const getUsersCurrentSubscriptionDetails = catchAsyncError(async (req, res) => {
  const user = req.user!;
  const result = await subscriptionService.getUsersCurrentSubscriptionDetails(user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Subscription details fetched successfully",
  });
});

const getSubscriptionManagePortalUrl = catchAsyncError(async (req, res) => {
  const user = req.user!;
  const result = await subscriptionService.getSubscriptionManagePortalUrl(user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: { url: result },
    message: "Subscription manage portal url fetched successfully",
  });
});

const getAllActivePlans = catchAsyncError(async (req, res) => {
  const result = await subscriptionService.getAllActivePlans();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "All active plans fetched successfully",
  });
});

const subscriptionPaymentConfirm = catchAsyncError(async (req, res) => {
  const token = req.query.sub_token as string;
  const file = await subscriptionService.subscriptionPaymentConfirm(token);
  res.send(file);
});

const subscriptionPaymentCancel = catchAsyncError(async (req, res) => {
  const token = req.query.sub_token as string;
  const file = await subscriptionService.subscriptionPaymentCancel(token);
  res.send(file);
});

const subscriptionController = {
  createSubscription,
  subscriptionPaymentConfirm,
  subscriptionPaymentCancel,
  getUsersCurrentSubscriptionDetails,
  getSubscriptionManagePortalUrl,
  getAllActivePlans,
};

export default subscriptionController;
