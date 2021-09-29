//Creating items in DOM

function createElement(tag, className, id, text = '') { 
  const element = document.createElement(tag); 
  const textElement = document.createTextNode(text); 
  element.className = className; 
  element.id = id 
  element.append(textElement);
  return element; 
}


function createHeader() {
  const header = createElement('header', 'header flex flex-wrap justify-center pt-4'); 
  const inputField = createElement('input', 'mx-4 mb-4 p-2 w-full border-2 border-gray-400 rounded-2xl outline-none shadow-lg', 'input-field'); 
  inputField.setAttribute('placeholder', 'Enter to do'); 
  const searchField = createElement('input', 'mx-auto mb-4 p-2 w-9/12 border-2 border-gray-400 rounded-2xl outline-none shadow-lg', 'input-search-field');
  searchField.setAttribute('placeholder', 'Search to do'); 
  const buttonDeleteAll = createElement('button','button__delete-all mb-4 p-2 font-bold bg-red-500 hover:bg-red-400 rounded-md', 'btn-delete', 'Delete All'); 
  const buttonDeleteLast = createElement('button','button__delete-last mr-4 mb-4 p-2 font-bold bg-yellow-500 hover:bg-yellow-400 rounded-md', 'btn-delete-last', 'Delete Last'); 
  const buttonAdd = createElement('button', 'button__add mr-4 mb-4 p-2 font-bold bg-green-500 hover:bg-green-400 rounded-md', 'btn_add', 'Add'); 
  const buttonAllCard = createElement('button', 'count__card-all ml-4 mb-4 p-2 font-bold bg-blue-400 hover:bg-blue-300 rounded-md', 'count-card') 
  const buttonCompletedTask = createElement('button', 'count__card-completed ml-4 mb-4 p-2 font-bold bg-purple-400 hover:bg-purple-300 rounded-md', 'count-completed-card') 
  header.append(inputField, buttonAdd, buttonDeleteLast, buttonDeleteAll, buttonAllCard, buttonCompletedTask, searchField); 
  return header;
}

function createMain() {
  const main = createElement('main', 'main'); 
  return main;
}

function createCard(todo) {
  const card = createElement('card', 'card relative flex mx-auto mb-4 pt-6 pb-4 px-2 w-11/12 bg-indigo-200 border-4 border-indigo-300 rounded-xl'); 
  card.id = todo.id;
  const descriptionCard = createElement('p', 'description flex-1 p-2 bg-gray-300 border-4 border-gray-500 rounded-xl', '', todo.text);
  const buttonClose = createElement('button', 'button__close absolute top-1 right-1 w-6 h-6 text-white bg-red-600 rounded-full', 'button-close', 'X'); 
  const date = createElement('p', 'date p-2 w-1/4 font-bold text-xs', '', todo.date); 
  const checkBox = createElement('input', 'checkbox mr-2 mt-4', 'checkbox'); 
  checkBox.setAttribute('type', 'checkbox'); 
  checkBox.checked = todo.isChecked;
  if (todo.isChecked) {
    descriptionCard.classList.toggle('line-through');
    descriptionCard.classList.toggle('bg-green-400');
  }
  card.append(checkBox, descriptionCard, date, buttonClose); 
  return card;
}

export { createElement, createHeader, createMain, createCard };