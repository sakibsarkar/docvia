import catchAsyncError from "../../utils/catchAsync";
import sendResponse from "../../utils/send.response";
import appStatisticsService from "./appStatistics.service";

const appOverview = catchAsyncError(async (req, res) => {
  const appId = req.params.appId;
  const user = req.user!;

  const result = await appStatisticsService.appOverview(appId, user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "App overview fetched successfully",
  });
});

const visitorStatistics = catchAsyncError(async (req, res) => {
  const appId = req.params.appId;
  const user = req.user!;

  const result = await appStatisticsService.visitorStatistics(appId, user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "App visitor statistics fetched successfully",
  });
});
const chatStatistics = catchAsyncError(async (req, res) => {
  const appId = req.params.appId;
  const user = req.user!;

  const result = await appStatisticsService.chatStatistics(appId, user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "App chat statistics fetched successfully",
  });
});

const appStatisticsController = { appOverview, visitorStatistics, chatStatistics };

export default appStatisticsController;
