const { AuthenticationError } = require('apollo-server-express');
const { User, Tutor, Article } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    GetCurrentUser:async(parent,{token})=>{
      try {
        const user= authMiddleware(token)
        if(user){
          return await User.findById(user._id).populate("articles").populate({
            path:"selectedTutor",
            populate:"articles"
          })
        }else if(token=="GUEST"){
          return await User.find({firstName:token})
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },  
    GetAllUsers:async(parent,{token})=>{
      try {
        const user=true
        if(user){
          return await User.find().populate("selectedTutor").populate("articles")
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetAllTutors:async(parent)=>{
      try {
        return await User.find({isTutor:true}).populate("articles")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetAllArticles:async(parent,{token})=>{
      try {
        const user = true
        if (user){
          return await Article.find().populate("tutorId")
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetArticleById:async(parent,{token,id})=>{
      try {
        const user = authMiddleware(token)
        if(user){
          return await Article.findById(id).populate("tutorId")
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetArticlesByUserId:async(parent,{token,Id})=>{
        try {
          const user = true
          if(user){
            return await Article.find({tutorId:Id})
          }
          throw new AuthenticationError("invalid token")
        } catch (error) {
          console.log(error);
          return error
        }
    }
  },
  Mutation: {
    createUser: async (parent, {firstName,lastName,email,password}) => {
      const user = await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      });
      const token = signToken(user);

      return { token, user };
    },
    enrollStudent: async (parent, {token,tutorId}) => {
      try {
        const user=authMiddleware(token)
        if (user) {
        return await User.findByIdAndUpdate(user._id, {selectedTutor:tutorId}, { new: true }).populate("selectedTutor");
        }
      throw new AuthenticationError('Not logged in');
      } catch (error) {
        console.log(error);
        return error
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    createArticle: async(parent,{token,name,body,image})=>{
      try {
        const user = authMiddleware(token)
        if(user && user.isTutor){
          const newArticle = await Article.create({name:name,body:body,image:image,tutorId:user.id})
          const newUser=await User.findByIdAndUpdate(user.id,{$push:{articles:newArticle}})
          return newArticle
        }
        throw new AuthenticationError("invalid user")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    unenrollStudent: async(parent,{token,tutorId})=>{
      try {
        const user = authMiddleware(token)
        if (user){
          return await User.findByIdAndUpdate(user._id,{$set:{selectedTutor:null}})
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    }
  }
};

module.exports = resolvers;
