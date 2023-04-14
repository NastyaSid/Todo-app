import React from "react";

export default function TodoListItem({ value, id, isDone, tasks, setTasks, onDelete, onToggle }) {

  const changeStyles = (e) => {
    const elem = e.currentTarget.closest('.todo-list__item');
    elem.querySelector('.edit-mode').classList.toggle('active');
    elem.querySelector('.reading-mode').classList.toggle('hidden');
  }

  const handleEdit = (id, e) => {
    tasks.map((task) => {
      if (task.id === id) {
        changeStyles(e);
        const elem = e.currentTarget.closest('.todo-list__item');
        const inputField = elem.querySelector('.edit-input');
        inputField.value = task.value;
      }
      return task;
    })
  }

  const handleSave = (id, e) => {
    const changedTask = tasks.map((task) => {
      if (task.id === id) {
        changeStyles(e);
        const elem = e.currentTarget.closest('.todo-list__item');
        return {...task, value: elem.querySelector('.edit-input').value}
      }
      return task;
    })
    setTasks(changedTask);
  }

  return (
    <li className='todo-list__item'>
      <div className="reading-mode">
        <div className='todo-list__name'>
          <input id={id} type="checkbox" checked={isDone} className='custom-checkbox' onChange={() => onToggle(id)}/>
          <label htmlFor={id}>{value}</label>
        </div>
        <div className='todo-list__buttons'>
          <button className='btn edit-btn' onClick={(e) => handleEdit(id, e)}>Edit</button>
          <button className='btn' onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
      <div className="edit-mode">
        <input className="edit-input" type='text' />
        <div className='todo-list__buttons'>
          <button className='btn cancel-btn' onClick={(e) => handleEdit(id, e)}>Cancel</button>
          <button className='btn' onClick={(e) => handleSave(id, e)}>Save</button>
        </div>
      </div>
    </li>
  );
}