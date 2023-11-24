import { useContext } from 'react';
import styles from '../styles/ToolsPanel.module.css';
import { ModalStatus, TaskList } from '../context';

export default function ToolsPanel({inputValue, changeInputValue}) {

    const [taskList, setTaskList] = useContext(TaskList);

    const [isModal, setIsModal] = useContext(ModalStatus);

    const addTask = () => {
        setIsModal(true)
    }
    
    

    return (
        <>
            <div className={styles.ToolsPanel}>
            <input
                placeholder='Search task...'
                onChange={(e) => {changeInputValue(e)}}
                value={inputValue}
                className={styles.ToolsSearchInput}
            />
            <button onClick={() => addTask()}>New task</button>
            </div>
        </>
    );

}