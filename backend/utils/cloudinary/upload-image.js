const AppError = require('../../utils/error/app-error');
const cloudinary = require('./config');

const uploadImage = async (filePath) => {
  if (!filePath) {
    throw new AppError('File is required', 400);
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    return uploadResult;
  } catch (error) {
    throw new AppError('Error when uploading file', 500);
  }
};

module.exports = {
  uploadImage,
};
