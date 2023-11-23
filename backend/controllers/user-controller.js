const AppError = require('./../utils/error_handler/app-error');

const UserService = require('./../services/user-service');

const getAllUsers = async (req,res,next) => {

    try{
        const users = await UserService.getAll();
        return res.status(200).json({
            status: 'success',
            data: users
        });
    }catch(err){
        next(new AppError(err.message,500))
    }
}

const getUser = async (req, res, next) => {
    const {id} = req.params.id;
    try{
        const user = await UserService.findOne(id);
        if(!user){
            return res.status(404).json({
                status: 'fail',
                data: null
            });
        }
        return res.status(200).json({
            status: 'success',
            data: user
        });
    }catch(err){
        next(new AppError(err.message,500))
    }
}
module.exports = {
    getAllUsers,
    getUser
}