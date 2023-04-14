import { useEffect, useMemo, useState } from 'react';
import './App.scss';
import TodoListItem from './components/TodoListItem';

const defaultTasks = [
  { value: 'Task 1', id: '1', isDone: false },
  { value: 'Task 2', id: '2', isDone: false },
  { value: 'Task 3', id: '3', isDone: false },
]

const ALL = 'all';
const COMPLETED = true;
const UNCOMPLETED = false;

function App() {

  const [tasks, setTasks] = useState(defaultTasks);
  const [currentFilter, setCurrentFilter] = useState(ALL);

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  const addTask = (value) => {
    const newTask = {value, id: Date.now(), isDone: false}
    setTasks([...tasks, newTask])
  }

  const handleSubmit = () => {
    const inputField = document.querySelector('.input-field');
    const inputValue = inputField.value;

    console.log(inputValue);

    addTask(inputValue);
    inputField.value = '';
  }

  const onDelete = (id) => {
    const currentTasks = tasks.filter(task => id !== task.id)
    setTasks(currentTasks);
  }

  const onToggle = (id) => {
    const checkedTask = tasks.map((task) => {
      if (id === task.id) {
        return {...task, isDone: !task.isDone}
      }
      return task;
    })
    setTasks(checkedTask);
  }

  const filterByStatus = () => {
    if (currentFilter === ALL) { return tasks };
    return tasks.filter(task => task.isDone === currentFilter);
  }

  const filteredTasks = useMemo(filterByStatus, [currentFilter, tasks]);
  const subheader = `${filteredTasks.length} tasks remaining`;

  // const handleEdit = (id) => {
  //   tasks.map((task) => {
  //     if (id === task.id) {
  //       const inputField = document.querySelector('.edit-input');
  //       inputField.value = task.value;
  //       document.querySelector('.edit-mode').classList.toggle('active');
  //       document.querySelector('.reading-mode').classList.toggle('hidden');
  //     }
  //     return task;
  //   })
  // }

  // const handleSave = (id) => {
  //   const changedTask = tasks.map((task) => {
  //     if (task.id === id) {
  //       document.querySelector('.edit-mode').classList.remove('active');
  //       document.querySelector('.reading-mode').classList.remove('hidden');
  //       return {...task, value: document.querySelector('.edit-input').value}
  //     }
  //     console.log(task)
  //     return task;
  //   })
  //   setTasks(changedTask);
  // }

  return (
    <div className="todoapp-container">
      <div className='input-section'>
        <h1 className="header">What needs to be done?</h1>
        <input className="input-field" type='text' />
        <button className='add-button btn' onClick={handleSubmit}>Add</button>
      </div>

      <div className='list-section'>
        <div className="filter-btns">
          <button type="button" className="btn toggle-btn" onClick={() => setCurrentFilter(ALL)}>All</button>
          <button type="button" className="btn toggle-btn" onClick={() => setCurrentFilter(UNCOMPLETED)}>Active</button>
          <button type="button" className="btn toggle-btn" onClick={() => setCurrentFilter(COMPLETED)}>Completed</button>
        </div>
        <h2 className='subheader'>{subheader}</h2>
        <ul className='todo-list'>
          {filteredTasks.map(({value, id, isDone}) => {
            return <TodoListItem value={value} id={id} key={id} isDone={isDone} tasks={tasks} setTasks={setTasks} onDelete={onDelete} onToggle={onToggle} />
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;