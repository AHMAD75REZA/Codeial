//const Comment = require('../models/comments);
const Comment = require('../models/comments');
const Post = require('../models/post');


module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                //handle error
                comment.save();
                post.comments.push(comment);
                post.save();
                res.redirect('/');

            });
        }
    });
}
module.exports.detroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    });
}


// module.exports.create = async function (req, res) {
//     let post = await Post.findById(req.body.post);
//     if (post) {
//       let comment = await new Comment({
//         content: req.body.content,
//         post: req.body.post,
//         user: req.user._id,
//        });
//       if (comment) {
//        await comment.save();
//         post.comments.push(comment);
//         post.save();
//         res.redirect("/");
//       }
//     }
//   }