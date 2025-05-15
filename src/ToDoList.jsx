import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';    // for unique id

export default function ToDoList() {
    let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");  // clear input field after adding task
    }

    let updateToDoValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    let markAllDone = () => {
        setTodos((prevTodos) => prevTodos.map((todo) => ({
            ...todo,
            isDone: true,
        })));
    }

    let markAsDone = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: true,
                };
            }
            return todo;
        }));
    }

    return (
        <div>
            <input
                placeholder="Add Your task"
                value={newTodo}
                onChange={updateToDoValue}
                style={{ padding: '5px', marginBottom: '10px' }}
            />
            <button
                onClick={addNewTask}
                style={{
                    backgroundColor: '#ff69b4', // Hot pink
                    color: 'white',
                    padding: '5px 10px',
                    marginLeft: '10px'
                }}
            >
                Add Task
            </button>

            <hr />

            <h4>Tasks to Do</h4>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                            style={{
                                textDecorationLine: todo.isDone ? "line-through" : "none",
                                color: todo.isDone ? 'gray' : '#4b0082', // Color for completed or not completed
                                fontWeight: 'bold', // Make the task text bold
                            }}
                        >
                            {todo.task}
                        </span>
                        <div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{
                                    backgroundColor: '#dc3545', // red for delete
                                    color: 'white',
                                    marginRight: '10px',
                                    padding: '5px 10px',
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => markAsDone(todo.id)}
                                style={{
                                    backgroundColor: '#28a745', // green for mark done
                                    color: 'white',
                                    padding: '5px 10px',
                                }}
                            >
                                Mark as Done
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={markAllDone}
                style={{
                    backgroundColor: '#007bff', // blue for mark all done
                    color: 'white',
                    padding: '5px 10px',
                    marginTop: '10px',
                }}
            >
                Mark All as Done
            </button>
        </div>
    );
}
