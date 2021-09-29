'use strict';

import { createHeader, createMain, createCard } from './templates.js';
import { getStorageData, setStorageData } from './storageApi.js';
import { Todo } from './Todo.js';

//APP
document.addEventListener('DOMContentLoaded', app);
function app() {
  const root = document.getElementById('root');
  root.className = 'mx-auto pb-1 rounded-b-2xl w-full bg-gradient-to-b from-gray-100 to-blue-100 md:mt-6 md:w-11/12 md:border-4 border-purple-200 md:rounded-2xl lg:w-9/12 xl:w-6/12 2xl:w-2/6';
  const header = createHeader();
  const main = createMain();
  header.addEventListener('click', onHeaderClick);
  header.addEventListener('input', renderFoundTodos);
  root.append(header, main);
  renderTodos(main);
  completedTodos()
}

//Event handlers

//header click handler
function onHeaderClick(event) {
  const target = event.target;
  const [, btnAdd, btnDeleteLast, btnDeleteAll, allTodos, completedTodos] =
    target.parentElement.children;
  if (target === btnAdd) {
    onClickAddBtn(target);
  } else if (target === btnDeleteAll) {
    update([]);
  } else if (target === btnDeleteLast) {
    const todos = getStorageData();
    todos.pop();
    update(todos);
  } else if (target === completedTodos) {
    renderCompletedTodos();
  } else if (target === allTodos) {
    renderTodos();
  }
}

//on click add button
function onClickAddBtn(target) {
  const inputField = target.previousElementSibling;
  if (inputField.value === "") {
    inputField.classList.add("border-red-400");
  } else {
    inputField.classList.remove("border-red-400");
    const todo = new Todo(inputField.value);
    const todos = getStorageData();
    todos.push(todo);
    setStorageData(todos);
    renderTodos();
    inputField.value = "";
  }
}

//card click handler
function onCardClick(event) {
  if (event.target.type === 'checkbox') {
    const todoId = this.id;
    const todos = getStorageData().map(function (item) {
      if (item.id === todoId) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    update(todos)
  } else if (event.target.id === 'button-close') {
    const todoId = this.id;
    const deleteTodo = getStorageData().filter(function (item) {
      return item.id !== todoId;
    });
    update(deleteTodo)
  }
}

//Render

//render all todos
function renderTodos() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  getStorageData().forEach(function (todo) {
    const card = createCard(todo);
    card.addEventListener('click', onCardClick)
    main.append(card);
    const root = document.getElementById('root');
    root.append(main);
  });
  countCard();
}

//render completed todos
function renderCompletedTodos() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const completedTodos = getStorageData().filter(function (item) {
    return item.isChecked === true;
  });
  for (let index = 0; index < completedTodos.length; index++) {
    const card = createCard(completedTodos[index]);
    card.addEventListener('click', onCardClick);
    main.append(card);
    const root = document.getElementById('root');
    root.append(main);
  }
}

//render found todos 
function renderFoundTodos(event) {
  if (event.target.id === 'input-search-field') {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const searchData = event.target.value;
    const selectionDataSearch = getStorageData().filter(function (item) {
      const { _, text } = item;
      if (text.indexOf(searchData) >= 0) return item;
    });
    for (let index = 0; index < selectionDataSearch.length; index++) {
      const card = createCard(selectionDataSearch[index]);
      card.addEventListener('click', onCardClick);
      main.append(card);
      const root = document.getElementById('root');
      root.append(main);
    }
  }
}

//Todos counters

//сount all todos
function countCard() {
  document.getElementById('count-card').innerHTML = `Show all: ${getStorageData().length}`;
}

//сount completed todos
function completedTodos(){
 const selectionCompleted = getStorageData().filter((item) => {
      const {isChecked} = item;
      if (isChecked === true) return item;
  })
  document.getElementById('count-completed-card').innerHTML = `Show completed: ${selectionCompleted.length}`;
}

//Updating task display
function update(data) {
  setStorageData(data);
  renderTodos();
  completedTodos();
}













 