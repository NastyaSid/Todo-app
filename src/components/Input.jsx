import { useState } from "react";
import { useDispatch } from 'react-redux';
import { taskAdd } from "../action";
import { v4 as uuidv4 } from 'uuid';

export default function Input() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newTask = { value: inputValue, id: uuidv4(), isDone: false, isEditing: false }
    dispatch(taskAdd(newTask))

    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return(
    <div className='input-section'>
        <h1 className="header">Todo list</h1>
        <div className='wrapper'>
          <input className="input-field" type='text' placeholder="Write your todo..." value={inputValue} onKeyDown={handleKeyDown} onChange={(e) => {setInputValue(e.target.value);}}/>
          <button className='add-button btn' onClick={handleSubmit} disabled={inputValue.trim() ? false : true}>Add</button>
        </div>
    </div>
  )
}