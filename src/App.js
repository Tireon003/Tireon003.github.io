import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ModalStatus, TaskList } from './context';
import TaskItem from './components/TaskItem';
import ToolsPanel from './components/ToolsPanel';
import ModalAddTask from './components/ModalAddTask';

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [taskList, setTaskList] = useState(() => {
    const savedList = localStorage.getItem('list');
    return savedList ? JSON.parse(savedList) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(taskList));
  }, [taskList]);

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  }

  const sortedIndexes = useMemo(() => {
    if (inputValue.trim().length < 1) {
      return [...taskList].map(item => taskList.indexOf(item));
    } else {
      let arr = []
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
          arr.push(i)
        }
      }
      return arr;
    }
  }, [taskList, inputValue])

  return (
    <TaskList.Provider value={[taskList, setTaskList]}>
      <div className="App">
        <ModalStatus.Provider value={[isModalVisible, setIsModalVisible]}>
          <ModalAddTask />
          <div className='AppBody'>
            <h1>To Do List!</h1>
            <ToolsPanel inputValue={inputValue} changeInputValue={changeInputValue}/>
            <div>
              { sortedIndexes.length ?
              sortedIndexes.map(i => <TaskItem
                key={i}
                index={i}
                />) :
                <h2 style={{textAlign: 'center'}}>List is empty.</h2>}
            </div>
          </div>
          
        </ModalStatus.Provider>
      </div>
    </TaskList.Provider>
  );
}

export default App;
