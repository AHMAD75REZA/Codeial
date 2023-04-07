const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');

queue.process('emails', function (job, done) {
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
});