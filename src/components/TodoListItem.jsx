import React, { useRef, useState } from "react";

export default function TodoListItem({ value, id, isDone, tasks, setTasks, onToggle }) {

  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef();

  const manageInput = () => {
    inputElement.current.value = value;
    inputElement.current.focus();
  }

  const onDelete = (id) => {
    const currentTasks = tasks.filter(task => id !== task.id)
    setTasks(currentTasks);
  }

  const handleEdit = () => {
    setIsEditing(true);

    setTimeout(manageInput, 0);
  }

  const handleSave = (id, e) => {
    const changedTask = tasks.map((task) => {
      if (task.id === id) {
        const elem = e.currentTarget.closest('.todo-list__item');
        return { ...task, value: elem.querySelector('.edit-input').value }
      }
      setIsEditing(false)
      return task;
    })
    setTasks(changedTask);
  }

  return (
    <li className='todo-list__item'>
      {!isEditing && (
        <div className="reading-mode">
          <div className='todo-list__name'>
            <input id={id} type="checkbox" checked={isDone} className='custom-checkbox' onChange={() => onToggle(id)} />
            <label htmlFor={id}>{value}</label>
          </div>
          <div className='todo-list__buttons'>
            <button className='btn edit-btn' onClick={handleEdit}>Edit</button>
            <button className='btn' onClick={() => onDelete(id)}>Delete</button>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="edit-mode">
          <input ref={(ref) => inputElement.current = ref } className="edit-input" type='text' />
          <div className='todo-list__buttons'>
            <button className='btn cancel-btn' onClick={() => setIsEditing(false)}>Cancel</button>
            <button className='btn' onClick={(e) => handleSave(id, e)}>Save</button>
          </div>
        </div>
      )}
    </li>
  );
}