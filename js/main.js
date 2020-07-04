showtask(); //showtask is called in starting also so that on refreshing the page the values will not be vanished
let addtaskinput = document.getElementById("addtaskinput"); //accessing the input element by using get element id
let addtaskbtn = document.getElementById("addtaskbtn"); //accessing the button element by using get element id

//adding event listener to the accessed button 
addtaskbtn.addEventListener("click", function() {
    addtaskinputval = addtaskinput.value; //getting the value of input element
    if (addtaskinputval.trim() != 0) { //trim is done so that it will not take the empty values
        let webtask = localStorage.getItem("localtask"); //getitem will return the value of key localtask if something is already present there otherwise will return null
        //to check whether the local storage contains something or not
        if (webtask == null) { //if nothing is present in the local storage
            taskObj = []; // then a blank array will be created named taskObj
        } else { //if something is already present in localstorage
            taskObj = JSON.parse(webtask); //to convert the string present in local storage to object so that methods can be applied
        }
        //adding the value of input textbox to the array taskObj 
        taskObj.push({ 'task_name': addtaskinputval, 'completeStatus': false });
        // console.log(taskObj, 'Ashendra');
        localStorage.setItem("localtask", JSON.stringify(taskObj)); //adding the value to the localstorage and also converting the object back to the string
        addtaskinput.value = ''; //to empty the text box after modifying of task
    }
    showtask(); //calling the function showtask so that values will also be displayed on the screen in form of table
})

//to display the value of the localstorage into the table
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }
    let html = ''; //blank string
    let addedtasklist = document.getElementById("addedtasklist"); //accessing the table by using its id
    //creating table using for each loop
    taskObj.forEach((item, index) => {

        if (item.completeStatus == true) {
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        } else {
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        //blank string is populated by the structure of the table
        //index is added dynamically
        html += `<tr>
                    <th scope="row">${index+1}</th> 
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" class="btn btn-sm btn-info">Edit</button></td>
                   
                    <td><button type="button" onclick="deleteitem(${index})" class="btn btn-sm btn-danger"></i>Delete</button></td>
                </tr>`;
    });
    // table is made equal to the string containing the buttons and the value of added task
    addedtasklist.innerHTML = html;
}

// edit function so that on clicking the edit button the content from the table goes to the textbox
function edittask(index) {
    let saveindex = document.getElementById("saveindex"); //saving the index in the hidden format around the save task button
    let addtaskbtn = document.getElementById("addtaskbtn"); //accessing the element add task using get element by using its id
    let savetaskbtn = document.getElementById("savetaskbtn"); //accessing the element save task using get element by using its id
    saveindex.value = index; //value of save index will be taken and index is taken from html table when one clicks on edit
    let webtask = localStorage.getItem("localtask"); //taking the value from local storage
    let taskObj = JSON.parse(webtask); //parsing the string to the object
    //value corresponding to the index will go to the textbox
    addtaskinput.value = taskObj[index]['task_name'];
    addtaskbtn.style.display = "none"; //on clicking the edit button the add task button should not be displayed
    savetaskbtn.style.display = "block";
}

// savetask
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function() { //on clicking the save task button the function should run
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    for (keys in taskObj[saveindex]) {
        if (keys == 'task_name') {
            taskObj[saveindex].task_name = addtaskinput.value; //to add the updated value to the object
        }
    }
    // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
    //  taskObj[saveindex][task_name] = addtaskinput.value;
    savetaskbtn.style.display = "none"; //after saving the updated task the save task button will again be changed to the add task button
    addtaskbtn.style.display = "block"; //the add task will again be displayed
    localStorage.setItem("localtask", JSON.stringify(taskObj)); //to add the updated value to the local storage
    addtaskinput.value = ''; //the value of text box will again be empty after editing a task
    showtask(); //to display the updated content in the table (screen) also
})

// deleteitem function for removing an already existing task
function deleteitem(index) { //pasing index taken from delete button from tr
    let webtask = localStorage.getItem("localtask"); //getting the data as before
    let taskObj = JSON.parse(webtask); //getting data from local storage to the task object and parsing it
    //splice method is used to remove one item at an index from the array task object
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj)); //setting the localstorage after removal of a task
    showtask(); //after removal modifying the content of table by deleting it from the table also
}


// deleteall
let deleteallbtn = document.getElementById("deleteallbtn"); //accessing the delete all button by using the id in get element id
deleteallbtn.addEventListener("click", function() { //adding event listener to the delete all button to perform actions on clicking it
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if (webtask == null) { //if data is present
        taskObj = [];
    } else { //if data is not present
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display = "none"; //after clicking the delete all button save task button will not be appeared
    addtaskbtn.style.display = "block"; //after clicking the delete all button add task button will be appeared
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})