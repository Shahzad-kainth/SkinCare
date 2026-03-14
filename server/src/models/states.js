const mongoose=require('mongoose');
const stateSchema=new mongoose.Schema({
    blogsCount:{
        type:Number,
        default:0,
    },
    totalLikesCount:{
        type:Number,
        default:0,
    },
    totalCommentsCount:{
        type:Number,
        default:0,
    },
    totalUsers:{
        type:Number,
        default:0,
    },
    totalBookmarksCount:{
        type:Number,
        default:0,
    }
})

const State=mongoose.model('state',stateSchema);

module.exports=State;

