const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require("./models/Users")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://gocha:514113131@cluster0.zi9xhux.mongodb.net/todo?retryWrites=true&w=majority")

app.get('/getTodo', (req, res) => {
    TodoModel.find()
        .then(todo => res.send(todo))
        .catch(err => res.send(err));
})

app.post('/postTodo', (req, res) => {
    const task = req.body.task
    TodoModel.create({
        task: task
    })
        .then(result => res.send(result))
        .catch(err => res.send(err))
})

app.delete('/deleteTodo/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.send(result)).catch(err => res.send(err))
})

app.put('/updateTodo/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findById(id)
        .then(todo => {
            todo.done = !todo.done;
            return todo.save();
        })
        .then(updatedTodo => res.send(updatedTodo))
        .catch(err => res.status(500).send(err));
});

app.listen(3001, () => {
    console.log("server is running");
})