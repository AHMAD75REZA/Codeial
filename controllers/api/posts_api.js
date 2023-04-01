
const Post = require('../../models/post');
const Comment = require('../../models/comments');

module.exports.index = async function (req, res) {

    let posts = await Post.find({}).sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: "List of posts send by ahmad",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {

    try {
    
        let post = await Post.findByIdAndDelete(req.params.id);

        // if (post.user == req.user.id) {
        // post.remove();

        await Comment.deleteMany({ post: req.params.id });


        return res.json(200, {
            message: "posts and associated comments deleted successfully"
        });

        // req.flash('success', 'post and associated comments deleted!');

        return res.redirect('back');
        // } else {
        //     req.flash('error', 'You can not delete this post');
        //     return res.redirect('back');
        // }

    } catch (err) {
        console.log('*****', err);
        return res.json(500, {
            message: "internal server Error"
        });
    }

}

