import './App.scss';
import DarkModeToggle from './components/DarkModeToggle';
import Input from './components/Input';
import TasksFilters from './components/TasksFilters';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="todoapp-container">
      <div>
      <DarkModeToggle />
      </div>
      <Input />
      <div className='list-section'>
        <TasksFilters />
        <Tasks />
      </div>
    </div>
  );
}

export default App;