import { useState } from "react";
import { useDispatch } from 'react-redux';
import { taskAdd } from "../action";

export default function Input() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {

    // Dont use date.now for creating IDs
    // google it
    // const newTask = inputValue;
    const newTask = { value: inputValue, id: Date.now(), isDone: false, isEditing: false }
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