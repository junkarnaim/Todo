
function addTask() {
    const todoItems = document.getElementById("todo-items");
    const inputBox = document.getElementById("input-box");
  
    const todoText = inputBox.value.trim();
    if (todoText) { 
      const element = `
        <div class="row">
          <div class="col-8">
            <div class="alert alert-primary">${todoText}</div>
          </div>
          <div class="col-4"><button class="btn btn-danger" onclick="deleteRow(this)">Delete</button></div>
        </div>
      `;
      todoItems.innerHTML += element;
      inputBox.value = ""; 
      saveToLocalStorage(todoText);
    }
  }
 
  function saveToLocalStorage(todoItem) {
    const existingData = localStorage.getItem("todoItems");
    const jsonData = existingData ? JSON.parse(existingData) : [];
    jsonData.push(todoItem);
    localStorage.setItem("todoItems", JSON.stringify(jsonData));
  }
  
  window.onload = () => {
    loadPreviousTodoItems();
  };
  
  function loadPreviousTodoItems() {
    const todoItems = document.getElementById("todo-items");
    const data = localStorage.getItem("todoItems");
    const jsonData = data ? JSON.parse(data) : [];
  
    jsonData.forEach(item => {
      todoItems.innerHTML += `
        <div class="row">
          <div class="col-8">
            <div class="alert alert-primary">${item}</div>
          </div>
          <div class="col-4"><button class="btn btn-danger" onclick="deleteRow(this)">Delete</button></div>
        </div>
      `;
    });
  }
  
  function deleteRow(button) {
    const todoItem = button.closest(".row").querySelector(".alert").textContent;
    const jsonData = JSON.parse(localStorage.getItem("todoItems")).filter(item => item !== todoItem);
    localStorage.setItem("todoItems", JSON.stringify(jsonData));
    button.closest(".row").remove();
  }
  