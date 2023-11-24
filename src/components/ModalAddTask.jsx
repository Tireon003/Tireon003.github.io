import { useContext, useState } from 'react';
import styles from '../styles/ModalAddTask.module.css'
import { ModalStatus, TaskList } from '../context';


export default function ModalAddTask() {

    const [isModal, setIsModal] = useContext(ModalStatus);
    const [taskList, setTaskList] = useContext(TaskList);
    const [titleValue, setTitleValue] = useState("");
    const [bodyValue, setBodyValue] = useState("");

    const getTitleValue = (e) => {
        setTitleValue(e.target.value)
    }

    const getBodyValue = (e) => {
        setBodyValue(e.target.value)
    }

    const getRandId = () => {
        let randId = 0;
        while (1) {
            console.log("Randomizing")
            randId = Math.floor(Math.random() * 100000);
            let i = 0;
            for (i; i < taskList.length; i++) {
                if (randId === taskList[i].id) {break}
            }
            if (i === taskList.length) {return randId}
        }
    }

    const AddTask = () => {
        if (titleValue.trim() !== "") {
            setTaskList([
            ...taskList,
            {
                id: getRandId(),
                title: titleValue,
                body: bodyValue,
                status: false
            }
            ]);
            setTitleValue("");
            setBodyValue("");
            setIsModal(false);
        }
    }

    const closeModal = () => {
        setIsModal(false)
    }

    return (
        <div className={isModal ? styles.ModalBackFill : styles.Unvisible} onClick={closeModal}>
            <form className={styles.ModalForm} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.ModalTitleLabel}>Create a new task</h2>
                <div className={styles.CreateTaskBody}>
                    <p className={styles.ModalInputDescription}>Enter your task name here:</p>
                    <input
                        className={styles.ModalFormInput}
                        placeholder='Example: Cook a dinner'
                        value={titleValue}
                        onChange={(e) => getTitleValue(e)}
                    />
                    <p className={styles.ModalInputDescription}>Enter your task description here:</p>
                    <input
                        className={styles.ModalFormInput}
                        placeholder="Example: I need to cook a dinner for my..."
                        value={bodyValue}
                        onChange={(e) => getBodyValue(e)}
                    />
                </div>
                <div className={styles.ModalFooter}>
                    <button
                        className={styles.ModalButtonAdd}
                        onClick={AddTask}
                        type='button'
                    >Add task</button>
                    <span className={styles.ModalTitleWarning}>The field "Title" is required!</span>
                </div>
                
            </form>
        </div>
    );
}