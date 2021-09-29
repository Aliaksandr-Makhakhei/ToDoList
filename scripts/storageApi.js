//Set and get data to LocalStorage
function getStorageData() {
  const taskList = JSON.parse(localStorage.getItem('todos'))
  if(taskList){
    return taskList
  }
  return []
}

function setStorageData(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export {getStorageData, setStorageData}