// //const Comment = require('../models/comments);
// const Comment = require('../models/comments');
// const Post = require('../models/post');


// module.exports.create = function (req, res) {
//     Post.findById(req.body.post, function (err, post) {

//         if (post) {
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function (err, comment) {
//                 //handle error
//                 comment.save();
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');

//             });
//         }
//     });
// }
// module.exports.detroy = function (req, res) {
//     Comment.findById(req.params.id, function (err, comment) {
//         if (comment.user == req.user.id) {

//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
//                 return res.redirect('back');
//             })
//         } else {
//             return res.redirect('back');
//         }
//     });
// }


const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log('error in creating a queue');
                    return;
                }
                console.log('job enqueued', job.id);
            });
            if (req.xhr) {


                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');

            // res.redirect('/');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }

}


module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            //CHANGE:: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'comment'});

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }

}

