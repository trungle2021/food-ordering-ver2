const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');
const RefreshTokenService = require('./refresh-token-service');
const RefreshToken = require('./refresh-token-model');

const saveRefreshToken = catchAsyncHandler(async (req, res, next) => {
  const refreshToken = await new RefreshToken(req.body).validate();
  const newRefreshToken = await RefreshTokenService.saveRefreshToken(refreshToken);
  return res.status(200).json({
    status: 'success',
    data: newRefreshToken,
  });
});

module.exports = {
  saveRefreshToken,
  deleteRefreshToken,
};
