const UserController = require('../controllers/user.controller')

module.exports = (app) =>{
    app.post('/api/register', UserController.userRegister )
    app.post('/api/login', UserController.loginUser) 
    app.get('/api/logout', UserController.logOutUser) 
    app.get('/api/user/:id', UserController.getUser) 
    app.put('/api/user/edit/:id', UserController.editUser )
    app.get('/api/user/likes/:id', UserController.userLikes )
    app.put('/api/user/addLike', UserController.addLike )
}