var Comment = require('../models/comment')

// Comment
exports.save = function(req,res){
    var _comment = req.body.comment
    var moviedId = _comment.movie

    if(_comment.cid){
        Comment.findById(_comment.cid, function(err, comment){
            console.log(comment)
            var replay = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }

            comment.reply.push(replay)

            comment.save(function(err, comment){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/' + moviedId)
            })
        })
    }else{
        var comment = new Comment(_comment)

        comment.save(function(err, comment){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/' + moviedId)
        })

    }
}