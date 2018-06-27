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
router.delete('/users/1/markers/:marker_id',function(req,res){
     Marker.remove({"_id": mongoose.Types.ObjectId(req.params.marker_id)}, function(err) {
        if (err) {
            res.json({"essage":"error"});
         }
         res.json({"id":req.params.marker_id});

    });
});

router.put('/users/1/markers/:marker_id',function(req,res){
    Marker.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.params.marker_id) }, { visited: req.body.visited }, function(err, marker) {
        if (err) throw err;
res.send(marker);

    });
});

export default  router;
