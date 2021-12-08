const addTaskButton = document.querySelector("#add-task-btn");
const clearTaskInputBtn = document.querySelector("#clear-input");
const clearDescInputBtn = document.querySelector("#clear-textarea");
const taskInput = document.querySelector("#input_text");
const descriptionInput = document.querySelector("#textarea2");
const container = document.querySelector(".lists-container");
const ALERT_SHOW_TIME = 5000;

const listOpen = document.querySelector("#open");
const listInProgress = document.querySelector("#in-progress");
const listDone = document.querySelector("#done");
const lists = document.querySelectorAll(".collection");
const clearListButtons = document.querySelectorAll(".clear-button");

const SERVER_URL = "https://task-management-app-back.herokuapp.com/tasks";

let mainArray = [];

// Page rendering

let j;

const rendering = (mainArray) => {
    listOpen.innerHTML = "";
    listInProgress.innerHTML = "";
    listDone.innerHTML = "";
    taskInput.value = "";
    descriptionInput.value = "";
    
    for (let i = 0; i < mainArray.length; i++) {
        const {taskItem, 
                taskContainer, 
                title, 
                btnsContainer, 
                moreButton, 
                deleteTaskButton, 
                card, 
                description, 
                taskId} = taskRendering();
        taskItem.setAttribute("data-index", i);
        title.textContent = mainArray[i]["title"];
        description.textContent = mainArray[i]["description"];
        taskId.textContent = `ID: ${mainArray[i]["id"]}`;
        
        taskItem.addEventListener("dragstart", dragstart);
        taskItem.addEventListener("dragend", dragend);

        deleteTaskButton.setAttribute("data-id", mainArray[i]["id"]);
        deleteTaskButton.addEventListener("click", deleteData);
        moreButton.addEventListener("click", showCard);

        taskItem.append(taskContainer, card);
        taskContainer.append(title, btnsContainer);
        btnsContainer.append(moreButton, deleteTaskButton);
        card.append(description, taskId);
       
       if ("createdAt" in mainArray[i]) {
            let createContainer = card.createElement("div");
            createContainer.classList.add("date");
            let createPrefix = createContainer.createElement("span");
            createPrefix.classList.add("bold");
            createPrefix.textContent = "Created at: ";
            let isoCreated = createContainer.createElement("span");
            isoCreated.textContent = mainArray[i]["createdAt"];
        }
        if ("updatedAt" in mainArray[i]) {
            let createContainer = card.createElement("div");
            createContainer.classList.add("date");
            let updatePrefix = createContainer.createElement("span");
            updatePrefix.classList.add("bold");
            updatePrefix.textContent = "Updated at: ";
            let isoUpdated = createContainer.createElement("span");
            isoUpdated.textContent = mainArray[i]["updatedAt"];
        }

        card.classList.add("display-none");

        if (mainArray[i]["status"] === "OPEN") {
            listOpen.append(taskItem);
        } else if (mainArray[i]["status"] === "IN_PROGRESS") {
            listInProgress.append(taskItem);
        } else {listDone.append(taskItem);
        } 
    }
    for (let list of lists) {
        if (list.children.length === 0) {
            list.classList.add("none-shadow");
        }
        list.addEventListener("dragover", dragover);
        list.addEventListener("dragenter", dragenter);
        list.addEventListener("dragleave", dragleave);
        list.addEventListener("drop", dragdrop);
    }
}

// Server interaction

const getData = () => {
    fetch(SERVER_URL)
      .then((response) => {
        if (response.ok) {
           return response.json();
        }
        showAlert("Failed to get tasks. Please try again");
        throw Error();
      })
      .then((res) => {
        mainArray = res;
        rendering(res)
      })
};


const sendData = (body) => {
    fetch(
        SERVER_URL,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
      },
    ).then((response) => {
      if (response.ok) {
        getData();
      } else {
        showAlert("Failed to post tasks. Please try again");
      }
    })
};

const deleteData = (event) => {
    let id = event.target.getAttribute("data-id");
    fetch(
        SERVER_URL + "/" + id,
      {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      },
    ).then((response) => {
      if (response.ok) {
        getData();
      } else {
        showAlert("Failed to delete task. Please try again");
      }
    })
};


const updateData = (task, status) => {
    fetch(`${SERVER_URL}/${task.id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...task, "status": status })
      },
    ).then((response) => {
      if (response.ok) {
        getData();
      } else {
        showAlert("Failed to edit task. Please try again");
      }
    })
};

// Buttons listeners and functions

addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (taskInput.value == "" || descriptionInput.value == "") {
        const {modalCard, modalText, modalCloseBtn} = modalRendering();
        body.appendChild(modalCard);
        modalCard.append(modalText, modalCloseBtn);
        modalCloseBtn.addEventListener("click", (event) => {
            event.preventDefault();
            body.removeChild(modalCard);
        })
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                    if (body.contains(modalCard)) {
                    event.preventDefault();
                    body.removeChild(modalCard);
                }
            }
        });
    } else {
        mainArray.push({"title": taskInput.value, "description": descriptionInput.value, "status": "OPEN"})
        sendData({"title": taskInput.value, "description": descriptionInput.value, "status": "OPEN"});
        taskInput.value = ""; 
        descriptionInput.value = "";
    }
})

taskInput.addEventListener("input", (event) => {
    event.preventDefault();
    clearTaskInputBtn.classList.remove("display-none");
})

clearTaskInputBtn.addEventListener("click", (event) => {
    event.preventDefault();
    taskInput.value = "";
    clearTaskInputBtn.classList.add("display-none");
})

descriptionInput.addEventListener("input", (event) => {
    event.preventDefault();
    clearDescInputBtn.classList.remove("display-none");
})


clearDescInputBtn.addEventListener("click", (event) => {
    event.preventDefault();
    descriptionInput.value = "";
    clearDescInputBtn.classList.add("display-none");
})

function showCard(event) {
    event.preventDefault();
    let root = event.target.parentNode.parentNode.parentNode.lastChild;
   
    root.classList.toggle("display-none");
    if (!root.classList.contains("display-none")) {
        event.target.textContent = "hide";
        event.target.parentNode.parentNode.classList.add("item-border");
    } else {event.target.textContent = "more";
    event.target.parentNode.parentNode.classList.remove("item-border");
    }
}


for (let button of clearListButtons) {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        let status = event.target.parentNode.firstElementChild.textContent;
        
        for (let i = 0; i < mainArray.length; i ++) {
            if (mainArray[i]["status"] === status || (mainArray[i]["status"] === "IN_PROGRESS" && "IN PROGRESS" === status)) {
                mainArray.splice(i, 1);
            }
        }
        event.target.parentNode.children[1].innerHTML = ""; 
        event.target.parentNode.children[1].classList.add("none-shadow");
        rendering(mainArray); 
    })
}

// Drag`n`drop 

function dragstart(event) {
    event.target.classList.add("hold");
    setTimeout(() => {
        event.target.classList.add("display-none");
    }, 0);
    j = {
        taskItem: event.target,
        taskTitle: event.target.firstElementChild.firstElementChild,
        taskDecription:  event.target.lastElementChild.firstElementChild,
        index: event.target.getAttribute("data-index")
    }
}

function dragend(event) {
    event.target.classList.remove("hold");
    event.target.classList.remove("display-none");
}

function dragover(event) {
    event.preventDefault();
}

function dragenter(event) {
    event.currentTarget.classList.add("hovered");
}

function dragleave(event) {
    event.currentTarget.classList.remove("hovered");
}

function dragdrop(event) {
    event.currentTarget.classList.remove("hovered");
    if (event.currentTarget.parentNode.firstElementChild.textContent === "IN PROGRESS") {
        mainArray[j.index]["status"] = "IN_PROGRESS";
        updateData(mainArray[j.index], "IN_PROGRESS");
    } else if (event.currentTarget.parentNode.firstElementChild.textContent === "DONE") {
        mainArray[j.index]["status"] = "DONE";
        updateData(mainArray[j.index], "DONE");
    } else {
        mainArray[j.index]["status"] = "OPEN"
        rendering(mainArray);
    }
    j = null;
}


// Extracting from template

const taskRendering = () => {
    const taskTemp = document.querySelector("#task-temp");
    const taskClone = taskTemp.content.cloneNode(true);
    const taskItem = taskClone.querySelector("#task-item");
    const taskContainer = taskClone.querySelector(".task-item");
    const title = taskClone.querySelector("#title");
    const btnsContainer = taskClone.querySelector("#btns-container");
    const moreButton = taskClone.querySelector("#more-button");
    const deleteTaskButton = taskClone.querySelector("#delete-button");

    const card = taskClone.querySelector("#info-card");
    const description = taskClone.querySelector("#description");
    const taskId = taskClone.querySelector("#_id");
   
    return {taskItem, 
            taskContainer, 
            title, 
            btnsContainer, 
            moreButton, 
            deleteTaskButton, 
            card, 
            description, 
            taskId
            }
}

taskInput.addEventListener("change", updateTask);

descriptionInput.addEventListener("change", updateDesc);

function updateTask(event) {
    taskInput.textContent = event.target.value;
}

function updateDesc(event) {
    descriptionInput.textContent = event.target.value;
}

const modalRendering = () => {
    const modalTemp = document.querySelector("#modal-temp");
    const modalClone = modalTemp.content.cloneNode(true);

    const modalCard = modalClone.querySelector("#modal-card");
    const modalText = modalClone.querySelector("#modal-text");
    const modalCloseBtn = modalClone.querySelector("#modal-close-btn");

    return {modalCard, modalText, modalCloseBtn}
}

// Messages and modals

const showAlert = (message) => {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
    alertContainer.textContent = message;
    document.body.append(alertContainer);
  
    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  };

// Effects

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
});

getData();
