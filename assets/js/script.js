'use strict';

const addTaskBtn = document.querySelector(".addtaskbutton");
const newInput = document.querySelector("input[type=text]");
const myList = document.querySelector(".mylist");

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let newItems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
      <div class="newitem ${task.completed ? 'checked' : ''}">
          <div class="description">${task.description}</div>
             <div class="buttons">
               <input onclick = "completeTask(${index})" type="checkbox" class="checkbutton" ${task.completed ? 'checked' : ''}>
               <button onclick = "deleteTask(${index})" class="deletebutton"></button>
             </div>
          </div>
  `
}

const myTaskList = () => {
  myList.innerHTML = "";
  if(tasks.length > 0) {
    tasks.forEach((item, index) => {
      myList.innerHTML += createTemplate(item, index); 
    });
    newItems = document.querySelectorAll('.newitem');
  } 
}

myTaskList();


const addLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
  tasks[index].completed = !tasks[index].completed;
  if(tasks[index].completed) {
    newItems[index].classList.add('checked');
  } else {
    newItems[index].classList.remove('checked');
  }
  addLocal();
  myTaskList();
}

addTaskBtn.addEventListener('click', () => {
tasks.push(new Task(newInput.value));
addLocal();
myTaskList();
newInput.value = '';
})

const deleteTask = index => {
  tasks.splice(index, 1);
  addLocal();
  myTaskList();
}