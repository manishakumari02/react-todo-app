import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // for unique id

export default function ToDoList() {
    let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");  // clear input field after adding task
    };

    let updateToDoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    let markAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true,
            }))
        );
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: true,
                    };
                }
                return todo;
            })
        );
    };

    return (
        <div style={{ backgroundColor: '#ffe6f0', minHeight: '100vh', padding: '30px' }}>
            <h2 style={{ color: '#e75480', textAlign: 'center' }}>ToDo List</h2>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    placeholder="Add Your Task"
                    value={newTodo}
                    onChange={updateToDoValue}
                    style={{ padding: '8px', width: '250px', borderRadius: '5px', border: '1px solid gray' }}
                />
                <button
                    onClick={addNewTask}
                    style={{
                        backgroundColor: '#ff69b4',
                        color: 'white',
                        padding: '8px 15px',
                        marginLeft: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Add Task
                </button>
            </div>

            <hr />

            <h4 style={{ textAlign: 'center', color: '#4b0082' }}>Tasks to Do</h4>

            <ul style={{ listStyleType: 'none', paddingLeft: '0', maxWidth: '600px', margin: '0 auto' }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            marginBottom: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <span
                            style={{
                                textDecorationLine: todo.isDone ? "line-through" : "none",
                                color: todo.isDone ? 'gray' : '#4b0082',
                                fontWeight: 'bold',
                            }}
                        >
                            {todo.task}
                        </span>
                        <div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    marginRight: '10px',
                                    padding: '5px 10px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => markAsDone(todo.id)}
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    padding: '5px 10px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Mark as Done
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                    onClick={markAllDone}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '8px 15px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Mark All as Done
                </button>
            </div>
        </div>
    );
}
