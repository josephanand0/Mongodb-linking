 var http =require('http')
 var mongoClient = require('mongodb').mongoClient
 var express = require('express')
 var app = express()
 app.use(express.json())
 mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
     if(err)
     {
         console.log("Error in connection"+err)
     }
     else{
         console.log("Connection established Successfully")
         db = client.db('empdb')
     }
 })
 app.get('/emps',(req,res)=>{
     db.collection('emp').find().toArray((err,items)=>
     {
         console.log(items)
         res.write(JSON.stringify(items))
         res.end()
     })
 })
 app.post('/addemp/:id',(req,res)=>{
     db.collection('emp').insertOne(req.body)
     res.end('inserted')
 })
 app.put('/updateemp/:id',(req,res)=>{
     var id=req.params.id;
     db.collection('emp').update({_id:id},{$set:{name:req.body.name}})
 })
 app.delete('/deleteemp/:id',(req,res)=>{
     var id=req.params.id;
     db.collection('emp').remove({_id:id})
 })
 app.listen(2000,()=>{
    console.log("Server started....")
 })