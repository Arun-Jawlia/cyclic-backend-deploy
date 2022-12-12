const express = require('express');
const { TodoModel } = require('../models/Todo.model');

const TodosRouter = express.Router()

TodosRouter.get('/', async(req,res)=>
{
    const allTodo = await TodoModel.find()
    res.send(allTodo)
})



// Post 
TodosRouter.post('/create',async(req,res)=>
{
    const payload = req.body
    try{
        const newTodo = new TodoModel(payload)
        console.log(newTodo)
        await newTodo.save()
        res.send({"msg":"Todo add successfully"})


    }
    catch(err)
    {
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})


TodosRouter.get('/filter',async(req,res)=>
{
    const query = req.query.params
    const todo = await TodoModel.findMany({query})
    res.send(todo)
})





TodosRouter.patch('/update/:todoId',async(req,res)=>{
    const todoId = req.params.todoId
    const userID = req.body.userID
    const payload = req.body
    const todo = await TodoModel.findOne({_id:todoId})
    if(userID!==todo.userID)
    {
        res.send('Not Authorised')
    }else{
        await TodoModel.findByIdAndUpdate({_id:todoId},payload)
        res.send({"msg":"Todo updated successfully"})
    }
})


TodosRouter.delete('/delete/:todoID', async function(req,res){
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todo = await TodoModel.findOne({_id:todoID})
    if(userID !==todo.userID)
    {
        res.send('Not Authorised')
    }else{
        await TodoModel.findByIdAndDelete({_id:todoID})
        res.send({"msg":"Todo updated successfully"})
    }
})








module.exports = {TodosRouter}