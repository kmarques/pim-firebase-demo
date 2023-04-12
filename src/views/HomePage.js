import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../config/firebaseConfig";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [tasks, setTasks] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "tasks"),
      (snapshot) => {
        const tasks = [];
        snapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasks);
      }
    );
    return () => unsubscribe();
  }, []);
  const handleNew = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const completed = !!formData.get("completed");
    const date = new Date();
    addDoc(collection(firestore, "tasks"), {
      name,
      completed,
      date,
      image,
    });
  };
  const handleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => setImage(event.target.result));
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <h1>HomePage</h1>
      {tasks === null && <div>Loading...</div>}
      <form onSubmit={handleNew}>
        <input name="name" />
        <input name="completed" type="checkbox" />
        <input name="image" type="file" onChange={handleImage} />
        <input type="submit" value="New" />
      </form>
      {tasks !== null && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <Link to={`/tasks/${task.id}`}>
                {task.date.toDate().toLocaleString()} {task.name} (
                {task.completed.toString()})
              </Link>
              {task.image && <img src={task.image} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
