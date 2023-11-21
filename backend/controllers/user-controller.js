const AppError = require('./../utils/error_handler/app-error');

const UserService = require('./../services/user-service');

const getAllUsers = async (req,res,next) => {
    try{
        const users = await UserService.getAllUsers();
        return res.status(200).json({
            status: 'success',
            data: users
        });
    }catch(err){
        next(new AppError(err.message,500))
    }
}
module.exports = {
    getAllUsers
}