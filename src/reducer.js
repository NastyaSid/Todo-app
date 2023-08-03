import { ACTIVE_FILTER_CHANGE, ALL, TASK_ADD, TASK_CHECKED, TASK_DELETE, TASK_EDIT, TASK_SAVE } from "./consts"

const initialstate = {
  tasks: [
    { value: 'Task 1', id: '1', isDone: false, isEditing: false },
    { value: 'Task 2', id: '2', isDone: false, isEditing: false },
    { value: 'Task 3', id: '3', isDone: false, isEditing: false },
  ],
  activeFilter: ALL
}

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case TASK_ADD:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case TASK_DELETE:
      const currentTasks = state.tasks.filter(task => action.payload !== task.id)
      return {
        ...state,
        tasks: currentTasks
      }
    case TASK_CHECKED:
      const checkedTask = state.tasks.map((task) => {
        if (action.payload === task.id) {
          return {...task, isDone: !task.isDone}
        }
        return task;
      })
      return {
        ...state,
        tasks: checkedTask
      }
    case TASK_EDIT:
      const editingTask = state.tasks.map((task) => {
        if (action.payload === task.id) {
          return {...task, isEditing: !task.isEditing}
        }
        return task;
      })
      return {
        ...state,
        tasks: editingTask
      }
    case TASK_SAVE:
      return {
        ...state,
        tasks: action.payload
      }
    case ACTIVE_FILTER_CHANGE:
      return {
        ...state,
        activeFilter: action.payload
      }
    default:
      return state
  }
}

export default reducer;