import { useSelector } from 'react-redux';
import { ACTIVE, ALL, COMPLETED } from "../consts";
import { useMemo } from 'react';
import TodoListItem from './TodoListItem';

export default function Tasks() {
  const tasks = useSelector(state => state.tasks);
  const activeFilter = useSelector(state => state.activeFilter);

  const filterByStatus = () => {
    if (activeFilter === ALL) { return tasks };

    return tasks.filter(task => task.isDone ? activeFilter === COMPLETED : activeFilter === ACTIVE);
  }

  const filteredTasks = useMemo(filterByStatus, [activeFilter, tasks]);
  const subheader = `${filteredTasks.length} tasks remaining`;

  return(
    <>
    <h2 className='subheader'>{subheader}</h2>
    {filteredTasks.map(({value, id, isDone, isEditing}) => {
      return <ul className='todo-list'>
                <TodoListItem value={value} id={id} key={id} isDone={isDone} isEditing={isEditing} />
            </ul>
    })}
    </>
  )
}