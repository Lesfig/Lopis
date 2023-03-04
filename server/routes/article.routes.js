const ArticleController = require('../controllers/article.controller')
const { authenticate } = require('../config/jwt.config')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = (app) =>{
    app.get('/api/articles', authenticate, ArticleController.getAllArticles )
    app.get('/api/article/:id', ArticleController.getAnArticle)  
    app.post('/api/article/new', authenticate, upload.single('image'), ArticleController.createArticle)
    app.put('/api/article/edit/:id', authenticate, ArticleController.updateArticle) 
    app.delete('/api/article/delete/:id', authenticate, ArticleController.deleteArticle)
    app.get('/api/articles/:category', authenticate, ArticleController.getArticleByCategory )
    app.get('/api/articles_user/:id', authenticate, ArticleController.getArticlesByUser)
}