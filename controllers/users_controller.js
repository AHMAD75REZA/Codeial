const User = require('../models/user');

module.exports.profile = function (req, res) {
    // res.end('<h1> User profile </h1>');
    // if (req.cookies.user_id) {
    //     User.findById(req.cookies.user_id, function (err, user) {
    //         if (user) {

    //             return res.render('user_profile', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         }
    //         return res.redirect('/users/sign-in');
    //     });
    // } else {
    //     return res.redirect('/users/sign-in')
    // }

    return res.render('user_profile', {
        title: "User Profile",
        // user: user
    });
}


// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "codeial | sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "codeial | sign In"
    })
}

//get the sign up data

module.exports.create = function (req, res) {
    // console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        //return res.redirect('back');
        return res.status(200).json({
            message: "password do not match"
        })
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in signing up');

            return res.status(200).json({
                message: "error in finding user",
                ERROR: err
            })
        }


        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');

                    return res.status(200).json({
                        message: "unable to create user"
                    })
                }

                return res.redirect('/users/sign-in');
                // return res.status(200).json({
                //     message: "user created successfully"
                // })
            })
        } else {
            // return res.redirect('back');
            return res.status(200).json({
                message: "user already exist"
            })
        }

    });
}
// module.exports.create = function (req, res) {
//     console.log("request from sign up");
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }

//     User.findOne({ email: req.body.email }, function (err, user) {

//         if (err) { console.log('error in finding user in sign up'); return }

//         if (!user) {
//             User.create(req.body, function (err, user) {
//                 if (err) { console.log('error in creating user while signing up'); return }

//                 return res.redirect('/users/Sign-in')
//             })
//         } else {
//             return res.redirect('back');
//         }

//     });

// }

// module.exports.create = function (req, res) {
//     //TODO
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }
//     User.findOne({ email: req.body.email }).then(user => {
//         // if (err) {
//         //     console.log('error in finding user in signing Up', err);
//         //     return;
//         // }
//         if (!user) {
//             User.create(req.body).then(user => {
//                 // if (err) {
//                 //     console.log('error in creating user while signing Up', err);
//                 //     return;
//                 // }
//                 req.flash('success', 'SignUp Successfully')
//                 return res.redirect('/users/sign-in');
//             });
//         }
//         else {
//             return res.redirect('back');
//         }
//     });

// }
// Sign in and create a session for the user
module.exports.createSession = function (req, res) {
    //STEPS TO AUTHENTICATES
    return res.redirect('/');
    //find the user
    // User.findOne({ email: req.body.email }, function (err, user) {
    //     if (err) { console.log('error in finding user in sign IN'); return }


    //     //handle user found
    //     if (user) {
    //         // handle password which does not match

    //         if (user.password != req.body.password) {
    //             return res.redirect('back');
    //         }

    //         //handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');
    //     } else {
    //         //handle user not found
    //         return res.redirect('back');
    //     }



    // })
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });


} 
