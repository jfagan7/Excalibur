const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');
const checkAuth = require('../../public/javascripts/controllers/authController');

//GETs all of the jobs from the database and passes it in a variable to
router.get('/', function(req, res){
    Job.find({},(err, jobs)=>{
        if (err) {
            res.status(404).json({
                message: 'Could not find any jobs'
            });
        } else {
            jobs.forEach(job => {
                Job.findById(job._id)
                .populate('client')
                .exec((err, list)=>{
                    if(err){
                        console.log(err);
                    } else {
                        console.log(list);
                    }
                })
            });
            res.render('jobs',{
                jobs: jobs
            })

        }
    });
});
//GETs a job by it's title
router.get('/:title', function(req, res){
    Job.find({title: req.params.title})
    .populate('client')
    .exec((err, result)=>{
        if (err) {
            res.render('error');
        } else {
            res.render('SearchJob',{
            job: result
        })
        }

    })

});

router.get('/:id', function(req, res){
    Job.findById(req.params.id, function(err, job){
        if (err) {
            console.log(err);
        } else {
            res.render('job_detail',{
                job: job
            })

        }
    })
})

//Creates a new instance of a job that belongs to a user
router.post('/post-job', function(req, res){
    User.findOne({name: req.body.name}, function(err, user){
        if (err) {
            console.log(err)
        } else {
            let job = new Job({
                title: req.body.title,
                name: req.body.name,
                client: user._id,
                description: req.body.description,
                skillNeeded: req.body.skillNeeded
            });
            job
            .save()
            .then((result) => {
                Job.findOne({title: req.body.title})
                .populate('client')
                .exec((err, post)=>{
                    if(err){
                        console.log(err)
                    } else {
                        res.status(201).json({
                        message: 'Job successfully posted',
                        job: post
                    });
                    }
                })

                console.log(result)
            }).catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
        }
    })


});

router.get('/:id', function(req, res){
    Job.findById(req.params.id, function(err, job){
        if (err) {
            res.send(err);
        } else {

            res.render('job_detail',{
                job: job
            });
        }
    })
})

module.exports = router;