export const taskAdd = (task) => {
  return {
      type: 'TASK_ADD',
      payload: task
  }
}

export const taskDelete = (id) => {
  return {
      type: 'TASK_DELETE',
      payload: id
  }
}

export const taskChecked = (id) => {
  return {
      type: 'TASK_CHECKED',
      payload: id
  }
}

export const taskEdit = (id) => {
  return {
    type: 'TASK_EDIT',
    payload: id
  }
}

export const taskSave = (task) => {
  return {
      type: 'TASK_SAVE',
      payload: task
  }
}

export const activeFilterChange = (filter) => {
  return {
      type: 'ACTIVE_FILTER_CHANGE',
      payload: filter
  }
}