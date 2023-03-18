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







const Post = require('../models/post');
//const user = require('../models/user');

module.exports.create = function (req, res) {
    console.log(req.body);
    Post.create({

        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('error in creating a post in controller');
            return;
        }
        return res.redirect('back');
    });

}





