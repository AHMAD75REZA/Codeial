// const Post = require('../models/post');
// // const User = require('../models/user');

// module.exports.create = function (req, res) {
//     console.log(req.body);
//     Post.create({
//         content: req.body.content,
//         user: req.user
//     }, function (err, post) {
//         if (err) {
//             console.log('error in creating a post in controller');
//             return res.status(500).json({
//                 error: "Internal Server Error"
//             });
//         }

//         Post.populate(post, { path: 'user', select: '_id name email' }, function(err, post) {
//             if (err) {
//                 console.log('error in populating post user info');
//                 return res.status(500).json({
//                     error: "Internal Server Error"
//                 });
//             }

//             return res.status(200).json({
//                 message: "Post created successfully"
//             });
//         });
//     });
// }







// const Post = require('../models/post');
// //const user = require('../models/user');
// const Comment = require('../models/comments');

// module.exports.create = function (req, res) {
//     console.log(req.body);
//     Post.create({

//         content: req.body.content,
//         user: req.user._id
//     }, function (err, post) {
//         if (err) {
//             console.log('error in creating a post in controller');
//             return;
//         }
//         return res.redirect('back');
//     });

// }

// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         // .id means converting the object id into string
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });
//         }
//         else {
//             return res.redirect('back');
//         }
//     });
// }


const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

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
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
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


