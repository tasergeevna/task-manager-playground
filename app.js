const addTaskButton = document.querySelector("#add-task-btn");
const taskInput = document.querySelector("#input_text");
const descriptionInput = document.querySelector("#textarea2");
const container = document.querySelector(".lists-container");

const mainObject = {
    "OPEN": [],
    "IN_PROGRESS": [],
    "DONE": []
};



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
    const dateContainer = taskClone.querySelector(".date");
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
            dateContainer, 
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



