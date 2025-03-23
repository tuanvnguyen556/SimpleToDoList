
// 1 is the max_id #
let toDoContainer = [{id: 1, name:"do dishes", date:"3-19-2025"}, {id: 2, name:"eat food", date:"3-19-2025"}, {id: 3, name:"go to school", date:"3-19-2025"}];

function storeLocalToContainer(){
    let tbodyElement = document.querySelector(".table-body");
    for (let i = 0; i < toDoContainer.length; i++){
        let trElement = document.createElement("tr");
        trElement.className = toDoContainer[i]["id"];
        let tdDateElement = document.createElement("td");
        let tdNameElement = document.createElement("td");
        let tdButtonEditElement = document.createElement("td");
        let tdButtonRemoveElement = document.createElement("td");
        let ButtonEditElement = document.createElement("button");
        let ButtonRemoveElement = document.createElement("button");
        ButtonEditElement.className = `button-edit-${toDoContainer[i]["id"]}`;
        ButtonRemoveElement.className = `button-remove-${toDoContainer[i]["id"]}`;
        ButtonEditElement.innerText = "Edit";
        ButtonRemoveElement.innerText = "Remove";
        tdButtonEditElement.appendChild(ButtonEditElement);
        tdButtonRemoveElement.appendChild(ButtonRemoveElement);
        tdDateElement.innerText = toDoContainer[i]["date"];
        tdNameElement.innerText = toDoContainer[i]["name"];
        tdNameElement.className = `name-${toDoContainer[i]["id"]}`;
        trElement.appendChild(tdDateElement);
        trElement.appendChild(tdNameElement);
        trElement.appendChild(tdButtonEditElement);
        trElement.appendChild(tdButtonRemoveElement);
        tbodyElement.appendChild(trElement);
    }
}

function listenEditEvent(){
    
    for (let i = 0; i < toDoContainer.length; i++){
        console.log(toDoContainer);
        let editObjectElement = document.querySelector(`.button-edit-${toDoContainer[i]["id"]}`);
        editObjectElement.addEventListener('click', () => {
            
            let nameObjectElement = document.querySelector(`.name-${toDoContainer[i]["id"]}`);
            if (nameObjectElement.firstChild instanceof HTMLInputElement){
                let InputElement = document.querySelector(`.input-${toDoContainer[i]["id"]}`);
                nameObjectElement.innerHTML = InputElement.value;
                toDoContainer[i]["name"] = InputElement.value;
                editObjectElement.innerText = 'Edit';
                InputElement.value = "";
                localStorage.setItem("to-do", JSON.stringify(toDoContainer))``;
                
            } else{
                nameObjectElement.innerHTML = `<input class="input-${toDoContainer[i]["id"]}">`;
                editObjectElement.innerText = 'Save';
            }
           

            
            
        })
    }
}

function inputSubmit(){
    let toDoContainer = JSON.parse(localStorage.getItem("to-do")) || [];

    const max_id = toDoContainer.length > 0 
    ? Math.max(...toDoContainer.map(item => Number(item.id))) + 1 
    : 1;

    let inputValue = document.querySelector(".enter-to-do");
    const date = new Date();
    let tbodyElement = document.querySelector(".table-body");
    let trElement = document.createElement("tr");

    trElement.className = `row-${max_id}`;
    let tdNameElement = document.createElement("td");
    tdNameElement.className = `name-${max_id}`;
    let tdDateElement = document.createElement("td");
    let stringDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    tdDateElement.innerText = stringDate;

    tdNameElement.innerText = inputValue.value;
    let tdButtonEditElement = document.createElement("td");
    let tdButtonRemoveElement = document.createElement("td");
    let ButtonEditElement = document.createElement("button");
    let ButtonRemoveElement = document.createElement("button");
    ButtonEditElement.className = `button-edit-${max_id}`;
    ButtonRemoveElement.className = `button-remove-${max_id}`;
    ButtonEditElement.innerText = "Edit";
    ButtonRemoveElement.innerText = "Remove";
    tdButtonEditElement.appendChild(ButtonEditElement);
    tdButtonRemoveElement.appendChild(ButtonRemoveElement);
    trElement.appendChild(tdDateElement);
    trElement.appendChild(tdNameElement);
    trElement.appendChild(tdButtonEditElement);
    trElement.appendChild(tdButtonRemoveElement);
    tbodyElement.appendChild(trElement);

    // Add this element to toDoContainer
    toDoContainer.push({ id: max_id, name: inputValue.value, date: stringDate });

    console.log("updated to", toDoContainer);
    localStorage.setItem("to-do", JSON.stringify(toDoContainer));
    inputSubmit.value = "";
    location.reload();
}

if (localStorage.getItem("to-do") == null){
    localStorage.setItem("to-do", JSON.stringify(toDoContainer));
} else{
    console.log(localStorage.getItem("to-do"));
    toDoContainer = JSON.parse(localStorage.getItem("to-do"));
}

storeLocalToContainer();
listenEditEvent();
