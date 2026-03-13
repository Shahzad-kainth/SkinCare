const mongoose=require('mongoose');
const stateSchema=new mongoose.Schema({
    blogsCount:{
        type:Number,
        default:0,
    }
})

const State=mongoose.model('state',stateSchema);

module.exports=State;

