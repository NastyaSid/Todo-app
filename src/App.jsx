import { useMemo, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const newTask = {value: inputValue, id: Date.now(), isDone: false}
    setTasks((tasks) => {
      return [...tasks, newTask]
    })
    setInputValue('')
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

  return (
    <div className="todoapp-container">
      <div className='input-section'>
        <h1 className="header">Todo list</h1>
        <div className='wrapper'>
          <input className="input-field" type='text' placeholder="Write your todo..." value={inputValue} onChange={(e) => {setInputValue(e.target.value);}}/>
          <button className='add-button btn' onClick={handleSubmit} disabled={inputValue.trim() ? false : true}>Add</button>
        </div>
      </div>

      <div className='list-section'>
        <div className="filter-btns">
          <button type="button" className="btn toggle-btn" onClick={() => setCurrentFilter(ALL)}>All</button>
          <button type="button" className="btn toggle-btn" onClick={() => setCurrentFilter(UNCOMPLETED)}>Active</button>
          <button type="button" className="btn toggle-btn" onClick={() => setCurrentFilter(COMPLETED)}>Completed</button>
        </div>
        <h2 className='subheader'>{subheader}</h2>
        {filteredTasks.map(({value, id, isDone}) => {
          return <ul className='todo-list'>
                    <TodoListItem value={value} id={id} key={id} isDone={isDone} tasks={tasks} setTasks={setTasks} onToggle={onToggle} />
                </ul>
        })}
      </div>
    </div>
  );
}

export default App;