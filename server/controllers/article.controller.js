const {Article} = require('../models/article.model');

module.exports.createArticle = (req, res) => {
    console.log(req.file.fileName)
    const imgName = req.body.imgName;
    const article = new Article({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        imgUrl: `http://localhost:8000/uploads/${imgName}`,
        userId: req.body.userId
    });

    article.save().then(newArticle =>
            res.json(newArticle))
        .catch((error)=>{
            console.log(error)
            res.status(400).json(error)
        })
}
module.exports.getArticlesByUser = (req, res) => {
   
    Article.find({ userId: req.params.id })
    .then(articles => res.json(articles))
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
      
}
module.exports.getArticleByCategory = (req, res) => {
    Article.find({ category: req.params.category })
    .then(articles => res.json(articles))
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}

module.exports.getAllArticles = (req, res) => {
    Article.find({}).limit( 10 ).sort({name:1})
        .then(articles => res.json(articles))
        .catch((error)=>{
            console.log(error)
            res.status(400).json(error)
        })
}

module.exports.getAnArticle = (req, res) => {
    Article.findOne({_id:req.params.id})
        .then(article => res.json(article))
        .catch((error)=>{
            console.log(error)
            res.status(400).json(error)
        })
}
module.exports.updateArticle= (req, res)=>{
    Article.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then((updatedArticle)=>{res.json(updatedArticle)
    }).catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}
module.exports.deleteArticle = (req, res)=>{
    Article.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.json(result)
    }).catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}