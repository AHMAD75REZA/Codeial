// const { populate } = require('../models/post');
// const Post = require('../models/post');
// const User = require('../models/user');


// module.exports.home = async function (req, res) {
// return res.end('<h1> Express is up for codeial!</h1>');
// console.log(req.cookies);
// res.cookie('user_id', 25);

// Post.find({}, function (err, posts) {

//     // return res.render('home', {
//     //     title: "(parameter) posts: any[]",
//     //     posts: posts
//     // });
// });

// populate the user of each post
//     console.log("inside home controller");
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })

//         .exec(function (err, posts) {

//             User.find({}, function(err, users){
//                 return res.render('home', {
//                     title: "(parameter) posts: any[]",
//                     posts: posts,
//                     all_users: users
//                 });
//             });
//          });

// }


const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function (req, res) {

    try {
        // populate the user of each post
        let posts = await Post.find({}).sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }

}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
