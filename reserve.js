/*

const addTaskButton = document.querySelector("#add-task-btn");
const taskInput = document.querySelector("#input_text");
const descriptionInput = document.querySelector("#textarea2");
const container = document.querySelector(".lists-container");

const listOpen = document.querySelector("#open");
const listInProgress = document.querySelector("#in-progress");
const listDone = document.querySelector("#done");

const mainObject = {
    "OPEN": [],
    "IN_PROGRESS": [],
    "DONE": []
};

// Page rendering

const rendering = (mainObject) => {
    listOpen.innerHTML = "";
    listInProgress.innerHTML = "";
    listDone.innerHTML = "";
    
    for (let key in mainObject) {
        for (let i = 0; i < mainObject[key].length; i++) {
            const {taskItem, taskContainer, title, btnsContainer, moreButton, deleteTaskButton} = taskRendering();
            title.textContent = mainObject[key][i].title;
            /*taskItem.setAttribute("data-key", key);
            taskItem.setAttribute("data-index", i);
            taskItem.addEventListener("dragstart", dragstart);
            taskItem.addEventListener("dragend", dragend);
            */
            deleteTaskButton.addEventListener("click", deleteTask);
            list.appendChild(taskItem);
            taskItem.prepend(taskCheckbox, taskText, deleteTaskButton);
        }



        listContainer.addEventListener("dragover", dragover);
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
    
}

// Buttons listeners





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



*/