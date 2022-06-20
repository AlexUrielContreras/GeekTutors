const db = require("../config/connection")
const {User, Article} =require("../models")

const articleData=require("./articleData.json")
const userData= require("./userData.json")
db.once("open", async()=>{
    //Delete all previous data
    await User.deleteMany()
    await Article.deleteMany()
    //bulk create and populate all models
    const users=await User.insertMany(userData)
    const articles = await Article.insertMany(articleData)

    for (let x=0;x<users.length;x++){
        users[x].articles[0]=articles[x]._id
        articles[x].tutorId=users[x]._id
        await users[x].save()
        await articles[x].save()
    }
    console.log("finished seeding. all data: ");
    console.log("users:",users);
    console.log("articles:",articles);
    process.exit(0)
})