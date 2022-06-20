const {Schema,model}=require("mongoose")

const articleSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String
    },
    body:{
        type:String,
        required:true
    },
    tutorId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})
const Article=model("Article",articleSchema)

module.exports=Article
