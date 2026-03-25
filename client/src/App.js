import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!task) return;
    await axios.post("http://localhost:5000/tasks", { text: task });
    setTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Task Manager</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} onClick={() => deleteTask(t._id)}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;