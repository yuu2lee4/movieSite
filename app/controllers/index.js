var Movie = require('../models/movie')
var Category = require('../models/category')

//index page
exports.index = function(req,res){

    Category
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function(err ,categories){
            if(err){
                console.log(err)
            }
            
            res.render('index',{
                title:'imooc 首页',
                categories: categories
            })
        })
}

//search page
exports.search = function(req,res){
    var catId = req.query.cat
    var q = req.query.q
    var page = req.query.p * 1 || 0
    var count = 2
    var index = page * count 

    if(catId){
        Category
            .findOne({_id: catId})
            .populate({
                path: 'movies', 
                selecct: 'title poster',
                options: {limit: count, skip: index}
            })
            .exec(function(err ,category){
                if(err){
                    console.log(err)
                }
                Movie.count({ category: catId}, function(err ,total){
                    if(err){
                        console.log(err)
                    }
                    
                    res.render('results',{
                        title:'imooc 结果列表页面',
                        keyword: category.name,
                        currentPage: page+1,
                        query: 'cat=' + catId,
                        totalPage: Math.ceil(total / count),
                        movies: category.movies
                    })
                })
            })
    }else{
        Movie
            .find({title: new RegExp('.*'+q+'.*','i')})
            .limit(count)
            .skip(index)
            .exec(function(err ,movies){
                if(err){
                    console.log(err)
                }
                Movie.count({ title: new RegExp('.*'+q+'.*','i') }, function(err ,total){
                    if(err){
                        console.log(err)
                    }
                    
                    res.render('results',{
                        title:'imooc 结果列表页面',
                        keyword: q,
                        currentPage: page+1,
                        query: 'q=' + q,
                        totalPage: Math.ceil(total / count),
                        movies: movies
                    })
                })
            })
    }

    
}