import express from 'express';
import mongoose from 'mongoose';
import config from '../config';
import Marker from './models/Markers';
mongoose.connect(config.mangoUrl);

const router = express.Router();

router.get('/users/1/markers', function(req, res){
    Marker.find(function(err, response){
        res.json(response);
        res.end();
    });
});
router.post('/users/1/markers',function(req,res) {
    var newMarker = new Marker({
        name: req.body.name,
        position: req.body.position,
        user_id: 1,
        visited: 0
    });

    newMarker.save(function (err, newTest) {
        if (err) {
            res.json({message: "Database error", type: "error"});
            res.end();
        } else {
            res.json(newMarker);
            res.end();
        }
    })
});

export default  router;
