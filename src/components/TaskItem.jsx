import React, { useContext } from "react";
import { TaskList } from "../context";
import styles from '../styles/TaskItem.module.css';

export default function TaskItem({index}) {

    const [taskList, setTaskList] = useContext(TaskList);

    const deleteTask = (index) => {
        setTaskList(taskList.filter(item => taskList.indexOf(item) !== index))
    }

    const toggleCheckbox = (index) => {
        const newStatus = !taskList[index].status
        setTaskList(taskList.map(item => taskList.indexOf(item) === index ? { ...item, status: newStatus} : item))
    }

    return (
        <div>
            <div className={styles.TaskItem}>
            <div className={styles.ItemData}>
                <h3>{taskList[index].title}</h3>
                <p>{taskList[index].body}</p>
            </div>
            <div className={styles.ItemTools}>
                <input
                    type='checkbox'
                    checked={taskList[index].status}
                    onChange={() => toggleCheckbox(index)}
                    />
                <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
            </div>
        </div>
    );
}