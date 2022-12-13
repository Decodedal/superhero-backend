//Dependiencies 
const express = require("express")
const cors = require('cors')
// const { fetch } = require("express");

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

//configuration
require('dotenv').config()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// let arr = [];
// const rand = Math.floor(Math.random() * (600 - 1 + 1) + 1);
// for(let i = rand; i > rand + 10; i++){
//     arr.push(i)
// }

//Root 
app.get('/home',async (req,res)=>{
        try{
            //creates an array of random nums between 1 and 600 inclusive 
            let arr = [Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1),Math.floor(Math.random() * (600 - 1 + 1) + 1)]
            const heros = []
            //runs a fetch call with each random num as a hero id and pushes to our heros arr. 
            await Promise.all(
                arr.map(async (id) =>{
                     const response = await fetch(`https://superheroapi.com/api/${process.env.API_KEY}/${id}/image`)
                     const hero = await response.json()
                     heros.push(hero)
                })
            )
            res.status(200).json(heros)
        }
    catch(err){
        res.status(400).json({
            message:err
        })
    }
})

app.get('/:id', async (req,res)=>{
  try{
    const response = await fetch(`https://superheroapi.com/api/${process.env.API_KEY}/${req.params.id}`)
    const resData = await response.json()
    res.status(200).json(resData)
    }
   catch(err){
    res.status(400).json({
        message:err
    })
   }
})


// app.get('/search/:name', async (req,res)=>{
//     try{
//         const response = fetch(`https://superheroapi.com/api/${process.env.API_KEY}/search/${req.params.name}`)
//         const resData = await (await response).json()
//         res.status(200).json(resData)
//     }
//     catch(err){
//         res.status(400).json({
//             message:err
//         })
//        } 
// })

app.get("/test", (req,res)=>{
    res.send("working")
})

app.get('/',(req,res)=>{
    res.send("home test")
})


//listen
app.listen(4000,()=>{
    console.log(`fighting crime on ${4000}`)
})