const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
var passport = require('passport');
require('../../config/passport')(passport);
const Job = require('../models/Job');
const User = require('../models/User');

//GETs all of the jobs from the database and passes it in a variable to
router.get('/', function(req, res){
    Job.find({},(err, jobs)=>{
        if (err) {
            res.status(404).json({
                message: 'Could not find any jobs'
            });
        } else {
            res.status(201).json({
                jobs: jobs
            });
        }
    });
});
//GETs a job by it's title
router.get('/:title', function(req, res){
    Job.find({title: req.params.title})
    .then(result=>{
        res.render('SearchJob',{
            job: result
        })
    })
    .catch(err=>{
        res.status(404);
        res.render('NotFound');
    })
});

router.get('/:id', function(req, res){
    Job.findById(req.params.id, function(err, job){
        User.findById(job.client, function(err,client){
            res.render('JobDetail',{
                job: job,
                client: client.name
            });
        });
    })
})

//Creates a new instance of a job that belongs to a user
router.post('/', function(req, res){
    let job = new Job({
        title: req.body.title,
        client: req.user.name,
        datePosted: req.body.datePosted,
        description: req.body.description,
        skillsNeeded: req.body.skillsNeeded
    });
    job
    .save()
    .then((result) => {
        res.status(201).json({
            message: 'Job successfully posted',
            job: result
        });
        console.log(result)
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:id', function(req, res){
    let query = {id: req.params.id};

    Job.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send
    })
})

//Access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'You must be logged in');
        res.redirect('/login');
    }
}

module.exports = router;