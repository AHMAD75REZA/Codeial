// const { populate } = require('../models/post');
const Post = require('../models/post');



module.exports.home = async function (req, res) {
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
    console.log("inside home controller");
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        .exec(function (err, posts) {

            return res.render('home', {
                title: "(parameter) posts: any[]",
                posts: posts
            });
        });



}
    // try{
    //     let posts = await Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: "comments",
    //         populate: {
    //             path: 'user'
    //         }
    //     });
    //     return res.render('home',{
    //         title: "inside homecontroller",
    //         posts:posts
    //     });
    // }
    // catch(err){
    //     return res.status(200).json({
    //         message: "inside catch"
    //     });
    //}
    // return res.status(200).json({
    //     message: "inside homecontroller"
    // });



//module.exports.actionName = function(req, res){}