import catchAsyncError from "../utils/catchAsync";
import sendResponse from "../utils/send.response";

const temp = catchAsyncError((req, res) => {
  sendResponse(res, {
    message: "Hello world",
    statusCode: 200,
    success: true,
    data: null,
  });
});

const tempController = {
  temp,
};

export default tempController;
