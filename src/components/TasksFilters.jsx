import { useDispatch } from 'react-redux';
import { activeFilterChange } from "../action";
import { ACTIVE, ALL, COMPLETED } from "../consts";

export default function TasksFilters() {
  const dispatch = useDispatch();

  return(
    <div className="filter-btns">
      <button type="button" className="btn toggle-btn" onClick={() => dispatch(activeFilterChange(ALL))}>All</button>
      <button type="button" className="btn toggle-btn" onClick={() => dispatch(activeFilterChange(ACTIVE))}>Active</button>
      <button type="button" className="btn toggle-btn" onClick={() => dispatch(activeFilterChange(COMPLETED))}>Completed</button>
    </div>
  )
}