import mongoose from 'mongoose';
var markerSchema = mongoose.Schema({
    name:String,
    position:JSON,
    user_id: Number,
    visited:Number
});
export default mongoose.model('markers',markerSchema);

