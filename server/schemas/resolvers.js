const { AuthenticationError } = require('apollo-server-express');
const { User, Subject, Article } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    GetCurrentUser:async(parent,{token})=>{
      try {
        const user= authMiddleware(token)
        if(user){
          return await User.findById(user._id).populate({
            path:"Subject",
            populate:({path:"Article"})
          })
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
            return await User.find().populate({
            path:"enrolledSubject",
            populate:({
              path:"articles"
            })
          })
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetAllSubjects:async(parent,{token})=>{
      try {
        const user= authMiddleware(token)
        if(user){
          return await Subject.find().populate({path:"articles"}).populate({path:"proctor"})
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetSubjectById:async(parent,{token,id})=>{
      try {
        const user = authMiddleware(token)
        if(user){
          return await Subject.findById(id).populate({path:"articles"}).populate({path:"proctor"})
        }
        throw new AuthenticationError("invalid token")
      } catch (error) {
        console.log(error);
        return error
      }
    },
    GetAllArticles:async(parent,{token})=>{
      try {
        const user = authMiddleware(token)
        if (user){
          return await Article.find()
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
          return await Article.findById(id)
        }
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
    enrollStudent: async (parent, {token,subjectId}) => {
      try {
        const user=authMiddleware(token)
        if (user) {
        return await User.findByIdAndUpdate(user.id, {enrolledSubject:subjectId}, { new: true });
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
    }
  }
};

module.exports = resolvers;
