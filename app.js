const addTaskButton = document.querySelector("#add-task-btn");
const clearTaskInputBtn = document.querySelector("#clear-input");
const clearDescInputBtn = document.querySelector("#clear-textarea");
const taskInput = document.querySelector("#input_text");
const descriptionInput = document.querySelector("#textarea2");
const container = document.querySelector(".lists-container");

const listOpen = document.querySelector("#open");
const listInProgress = document.querySelector("#in-progress");
const listDone = document.querySelector("#done");
const lists = document.querySelectorAll(".collection");
const clearListButtons = document.querySelectorAll(".clear-button");

const mainArray = [
    {
        "title": "Cook some food",
        "description": "Pork with mushrooms",
        "status": "OPEN",
        "_id": "X2HZ5DwTlRxLu1MF",
        "createdAt": "2021-10-28T08:45:38.826Z",
        "updatedAt": "2021-10-28T08:45:38.826Z"
    },
    {
        "title": "Clean the bath",
        "description": "Floor, Bath, Sink",
        "status": "IN_PROGRESS",
        "_id": "leHUJAqwwIeN4qAR",
        "createdAt": "2021-10-28T08:45:41.792Z",
        "updatedAt": "2021-10-28T08:45:41.792Z"
    },
    {
        "title": "Clean the bath",
        "description": "Floor, Bath, Sink",
        "status": "OPEN",
        "_id": "leHUJAqwwIeN4qAR",
        "createdAt": "2021-10-28T08:45:41.792Z",
        "updatedAt": "2021-10-28T08:45:41.792Z"
    },
    {
        "title": "Clean the bath",
        "description": "Floor, Bath, Sink",
        "status": "IN_PROGRESS",
        "_id": "leHUJAqwwIeN4qAR",
        "createdAt": "2021-10-28T08:45:41.792Z",
        "updatedAt": "2021-10-28T08:45:41.792Z"
    },
    {
        "title": "Clean the bath",
        "description": "Floor, Bath, Sink",
        "status": "DONE",
        "_id": "leHUJAqwwIeN4qAR",
        "createdAt": "2021-10-28T08:45:41.792Z",
        "updatedAt": "2021-10-28T08:45:41.792Z"
    }
];

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
                taskId, 
                createContainer, 
                updateContainer, 
                createPrefix, 
                updatePrefix, 
                isoCreated, 
                isoUpdated} = taskRendering();
        taskItem.setAttribute("data-index", i);
        title.textContent = mainArray[i]["title"];
        description.textContent = mainArray[i]["description"];
        taskId.textContent = `ID: ${mainArray[i]["_id"]}`;
        isoCreated.textContent = mainArray[i]["createdAt"];
        isoUpdated.textContent = mainArray[i]["updatedAt"];

        taskItem.addEventListener("dragstart", dragstart);
        taskItem.addEventListener("dragend", dragend);
       
        deleteTaskButton.addEventListener("click", deleteTask);
        moreButton.addEventListener("click", showCard);

        taskItem.append(taskContainer, card);
        taskContainer.append(title, btnsContainer);
        btnsContainer.append(moreButton, deleteTaskButton);
        card.append(description, taskId, createContainer, updateContainer);
        createContainer.append(createPrefix, isoCreated);
        updateContainer.append(updatePrefix, isoUpdated);
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


// Buttons listeners and functions

addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (taskInput.value == "") {
        alert("Write title!")
    } else {
        mainArray.push({"title": taskInput.value, "description": descriptionInput.value, "status": "OPEN", })
        taskInput.value = ""; 
        descriptionInput.value = "";
        rendering(mainArray);
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

function deleteTask(event) {
    event.preventDefault();
    let root = event.target.parentNode.parentNode.parentNode;
    let index = root.getAttribute("data-index");
    root.parentNode.removeChild(root);
    mainArray.splice(index, 1);
    rendering(mainArray);
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
        rendering(mainArray);
    } else if (event.currentTarget.parentNode.firstElementChild.textContent === "DONE") {
        mainArray[j.index]["status"] = "DONE";
        rendering(mainArray);
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
    const createContainer = taskClone.querySelector("#create-container");
    const updateContainer = taskClone.querySelector("#update-container");
    const createPrefix = taskClone.querySelector("#create-prefix");
    const updatePrefix = taskClone.querySelector("#update-prefix");
    const isoCreated = taskClone.querySelector("#created-at");
    const isoUpdated = taskClone.querySelector("#updated-at");
    return {taskItem, 
            taskContainer, 
            title, 
            btnsContainer, 
            moreButton, 
            deleteTaskButton, 
            card, 
            description, 
            taskId, 
            createContainer, 
            updateContainer, 
            createPrefix, 
            updatePrefix, 
            isoCreated, 
            isoUpdated}
}

taskInput.addEventListener("change", updateTask);

descriptionInput.addEventListener("change", updateDesc);

function updateTask(event) {
    taskInput.textContent = event.target.value;
}

function updateDesc(event) {
    descriptionInput.textContent = event.target.value;
}

// Effects

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.collapsible');
    let instances = M.Collapsible.init(elems);
});


rendering(mainArray);