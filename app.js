const express = require("express");
const app = express();
const port = 4000;
const userData = require("./data/data.json");
const graphql  = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt,GraphQLString, GraphQLList} = graphql
const {graphqlHTTP} = require("express-graphql");

// some
// graphql types
const userType = new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id:{type: GraphQLInt},
        first_name:{type: GraphQLString},
        last_name:{type: GraphQLString},
        email:{type: GraphQLString},
        gender:{type: GraphQLString},
        ip_address:{type: GraphQLString}
    })
})

// for query
const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        getAllUser:{
            type: new GraphQLList(userType),
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){
                return userData

            }
        }
    }
})

// for mutation
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser:{
            type:userType,
            args:{
                first_name:{type:GraphQLString},
                last_name:{type:GraphQLString},
                email:{type:GraphQLString},
                gender:{type:GraphQLString},
                ip_address:{type:GraphQLString},
            },
            resolve(parent,args){
                userData.push({id: userData.length + 1, first_name: args.first_name, last_name:args.last_name, email:args.email,gender:args.gender , ip_address:args.ip_address})
                return args
            }
        }
    }
})

// you can mutation by using this query 

// mutation {
//     createUser(
//       first_name: "suleman", 
//       last_name: "ahmed", 
//       email: "mani@Manimani.com", 
//       gender: "malemale", 
//       ip_address: "23232323232") 
//     {
//       first_name
//     }
//   }
  

// schema
const schema = new GraphQLSchema({query:rootQuery,mutation:Mutation})


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(port,()=>{
    console.log("server runing on" , port)
})
