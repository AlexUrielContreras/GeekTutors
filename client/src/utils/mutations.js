const { gql } = require('@apollo/client')

export const ADD_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName:$lastName, email:$email, password: $password) {
            token
            user {
                _id
                firstName
                lastName       
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token 
            user {
                _id
                firstName
            }
        }
    }
`

export const ENROLL_STUDENT = gql`
    mutation enrollStudent($token:String!,$tutorId:ID!){
        enrollStudent(token:$token,tutorId:$tutorId){
        _id
        firstName
        lastName
            selectedTutor{
            firstName
            lastName
            _id
        } 
        }
    }
`

export const UNENROLL_STUDENT = gql`
    mutation unenrollStudent($token:String!,$tutorId:ID!){
        unenrollStudent(token:$token,tutorId:$tutorId){
        _id
        firstName
        lastName
            selectedTutor{
            firstName
            lastName
            _id
        } 
        }
    }
`