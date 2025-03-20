
// 1 is the max_id #
let toDoContainer = [{id: 1, name:"do dishes", date:"3-19-2025"}, {id: 2, name:"eat food", date:"3-19-2025"}, {id: 3, name:"go to school", date:"3-19-2025"}];

localStorage.setItem("to-do", JSON.stringify(toDoContainer));



function addElementsFromStorage(){
    

}


function inputSubmit(){
    let inputValue = document.querySelector(".enter-to-do");
    const date = new Date();
    let tbodyElement = document.querySelector(".table-body");
    let trElement = document.createElement("tr");
    let toDoList = JSON.parse(localStorage.getItem("to-do"))
    grabHighestId = toDoList[toDoList.length - 1]["id"]
    trElement.className = `row-${grabHighestId}`;
    let tdNameElement = document.createElement("td");
    let tdDateElement = document.createElement("td");

    tdDateElement.innerText = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    tdNameElement.innerText = inputValue.value;
    trElement.appendChild(tdDateElement);
    trElement.appendChild(tdNameElement);
    
    tbodyElement.appendChild(trElement);
}
