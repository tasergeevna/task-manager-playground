const addTaskButton = document.querySelector("#add-task-btn");
const taskInput = document.querySelector("#input_text");
const descriptionInput = document.querySelector("#textarea2");
const container = document.querySelector(".lists-container");

const listOpen = document.querySelector("#open");
const listInProgress = document.querySelector("#in-progress");
const listDone = document.querySelector("#done");

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
        "status": "OPEN",
        "_id": "leHUJAqwwIeN4qAR",
        "createdAt": "2021-10-28T08:45:41.792Z",
        "updatedAt": "2021-10-28T08:45:41.792Z"
    }
];

// Page rendering

const rendering = (mainArray) => {
    listOpen.innerHTML = "";
    listInProgress.innerHTML = "";
    listDone.innerHTML = "";
    
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
        taskId.textContent = mainArray[i]["_id"];
        isoCreated.textContent = mainArray[i]["createdAt"];
        isoUpdated.textContent = mainArray[i]["updatedAt"];

        /*
        taskItem.addEventListener("dragstart", dragstart);
        taskItem.addEventListener("dragend", dragend);
        */
        // deleteTaskButton.addEventListener("click", deleteTask);
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
}

    

    /*listContainer.addEventListener("dragover", dragover);
    listContainer.setAttribute("data-key", key);
    listContainer.addEventListener("dragenter", dragenter);
    listContainer.addEventListener("dragleave", dragleave);
    listContainer.addEventListener("drop", dragdrop);
    listHeadline.textContent = key;
    if (key === "General") {
        listHeadline.textContent = "General";
        listContainer.classList.add("general-container");
        container.appendChild(listContainer);
        list.classList.add("done-list");
        listContainer.prepend(listHeadline, list);
        listContainer.removeChild(listDelete);
        listClearButton.addEventListener("click", clearGeneralList);
        showDoneButton.addEventListener("click", showDoneTasks);
        if (Object.keys(mainObject).length > 2) {
            ordinaryLists = document.createElement("div");
            ordinaryLists.classList.add("ordinary-lists");
            container.appendChild(ordinaryLists);
        }
    } else {
            ordinaryLists.appendChild(listContainer);
            listHeadline.classList.add("headline-ordinary");
            listContainer.prepend(listHeadline, list, listDelete); 
            listContainer.removeChild(listClearButton);
            listContainer.removeChild(showDoneButton);
            listDelete.addEventListener("click", deleteList);
    }
    
}


*/


// Buttons listeners

function showCard(event) {
    event.preventDefault();
    let root = event.target.parentNode.parentNode.parentNode.lastChild;
    root.classList.toggle("display-none");
    if (!root.classList.contains("display-none")) {
        event.target.textContent = "hide";
    } else {event.target.textContent = "more";
    }
}

// добавить эффект коллапсибл! 

function deleteTask(event) {
    event.preventDefault();
    let root = event.target.parentNode.parentNode.parentNode;
    mainArray.splice(root.dataset.index, 1);
    rendering(mainArray);
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

rendering(mainArray);