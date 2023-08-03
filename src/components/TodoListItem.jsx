import React, { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import edit from '../images/edit.svg';
import bin from '../images/bin.svg';
import cancel from '../images/cancel.svg';
import save from '../images/save.svg';
import { taskChecked, taskDelete, taskEdit, taskSave } from "../action";

export default function TodoListItem({ value, id, isDone, isEditing }) {
  const inputElement = useRef();

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const onToggle = (id) => {
    dispatch(taskChecked(id))
  }

  const manageInput = () => {
    inputElement.current.value = value;
    inputElement.current.focus();
  }

  const handleEdit = (id) => {
    dispatch(taskEdit(id));

    setTimeout(manageInput, 0);
  }

  const handleSave = (id, e) => {
    const changedTask = tasks.map((task) => {
      if (task.id === id) {
        const elem = e.currentTarget.closest('.todo-list__item');
        return { ...task, value: elem.querySelector('.edit-input').value, isEditing: false }
      }
      return task;
    })
    dispatch(taskSave(changedTask));
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave(id, e);
    }
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
            <button className='btn edit-btn' onClick={() => handleEdit(id)}><img src={edit} alt="edit" /></button>
            <button className='btn' onClick={() => dispatch(taskDelete(id))}><img src={bin} alt="delete" /></button>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="edit-mode">
          <input ref={inputElement} onKeyDown={handleKeyDown}  className="edit-input" type='text' />
          <div className='todo-list__buttons'>
            <button className='btn cancel-btn' onClick={() => dispatch(taskEdit(id))}><img src={cancel} alt="cancel" /></button>
            <button className='btn' onClick={(e) => handleSave(id, e)}><img src={save} alt="save" /></button>
          </div>
        </div>
      )}
    </li>
  );
}