import mongoose from 'mongoose'

const commentsSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    postsId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'post'
    }
})

const comment=mongoose.model('comment', commentsSchema)

export default comment