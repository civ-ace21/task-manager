import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });

  // Handle form input
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add Task
  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([...tasks, { id: uuidv4(), ...newTask, completed: false }]);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={addTask} className="w-full bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>

      <div className="mt-4 w-full max-w-md">
        {tasks.length === 0 ? <p className="text-gray-500">No tasks yet.</p> : null}
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-2 flex justify-between items-center">
            <div>
              <h2 className={`font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-400">Due: {task.dueDate || "No date"}</p>
            </div>
            <div>
              <button onClick={() => toggleComplete(task.id)} className="mr-2 text-green-500">
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;