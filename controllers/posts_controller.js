
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        await post.populate('user');
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'post published');
        return res.redirect('back');

    } catch (err) {
        //console.log('Error', err);
        req.flash('error', err)
        return res.redirect('back');
    }

}


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

            // change:: delete the associated likes for the post and all its comments like too
            await Like.deleteMany({likeable: post, onModel: 'post'});
            await Like.deleteMany({_id: {$in: post.comments}});
            

            post.remove();

            await Comment.deleteMany({ post: req.params.id });


            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }

            req.flash('success', 'post and associated comments deleted!');

            return res.redirect('back');
        } else {
            req.flash('error', 'You can not delete this post');
            return res.redirect('back');
        }

    } catch (err) {
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }

}


