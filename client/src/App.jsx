import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [todo, setTodo] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    axios.get("https://localhost/getTodo").then(todo => setTodo(todo.data)).catch(err => console.log(err))
  }, [])

  const handlePost = (e) => {
    if (e.key == "Enter") {
      axios.post("https://localhost/postTodo", { task: task }).then(result => location.reload()).catch(err => console.log(err))
    }
  }

  const deletePost = (id) => {
    axios.delete("https://localhost/deleteTodo/" + id,).then(result => location.reload()).catch(err => console.log(err))
  }

  const updatePost = (id) => {
    axios.put("https://localhost/updateTodo/" + id,).then(result => location.reload()).catch(err => console.log(err))
  }

  return (
    <main className="app">
      <div className="todo__add">
        <input type="text" placeholder='ADD YOU TASK...' onChange={e => setTask(e.target.value)} onKeyUp={handlePost} />
        {/* <button onClick={handlePost}>ADD</button> */}
      </div>
      {todo.length ? <div className="todo__task">
        {todo.map(task => {
          return (
            <div key={task._id} className="todo__item">
              <div className="todo__left" onClick={() => updatePost(task._id)}>
                <span style={{ background: task.done ? "green" : "" }}></span>
                <p style={{ textDecoration: task.done ? "line-through" : "", color: task.done ? "grey" : "" }}>{task.task}</p>
              </div>
              <button onClick={() => deletePost(task._id)}>Delete</button>
            </div>
          )
        })}
      </div> : ""}
    </main>
  )
}

export default App
