//creating a list of grocery items, each item contains a name and if it's corred out
const groceries = [["Eggs", false], ["Bread", false], ["Mayo", false], ["Ketchup", false], ["Bacon", false]];

//selecting the unordered list in the HTML document
let htmlGroceryList = document.querySelector(`ul`);

//This function needs to change to display all the items on the screen
function displayItems () {
    htmlGroceryList.innerHTML = "";

    groceries.forEach(function(element) {
        let listItem = document.createElement(`li`); //creating a list item within the document

        //adding the name of item to as a list element
        let listText = document.createElement(`div`)
        listText.classList.add("listText"); //adding a universal class for all the text elements int his list
        listText.classList.add("normalText")
        //console.log(element[1]);
        if (!element[1]) {
                listText.classList.add("normalText")
            } else {
                listText.classList.add("strikedText")
        }

        //adding value to the list element
        listText.innerHTML = element[0];
        listItem.appendChild(listText);

        //console.log(listText.textContent); //here just for testing

        //creating a span element which will be assigned to each li element in the following forEach function
        let span = document.createElement(`span`);
  
        //adding X for deletion
        span.innerHTML = `\u00D7`;
        span.classList.add("delete"); //as this element will be used to delete an item, each gets its own delete class
        listItem.appendChild(span);

        htmlGroceryList.appendChild(listItem); //append list item (child) to the list on the page
     });

    //Function to add deletion functionallity to each list item
    function deleteItem(){
        //should look for all the spans with .delete class 
        let deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(function(button, index) { //this index is used to remove the iteam from the list
            button.addEventListener("click", function() {

                console.log(groceries[index][0] + " deleted!");
                groceries.splice(index, 1);

                displayItems ();
            } )
        })
        };
    //as per task request, the last line of this function should call the deleteitem function
    deleteItem();
};

//initialising the list
displayItems();

//Function that will be called to change the style of an element that gor crossed out
function changeStyle (index) {
    //the boolean variable for the groceries list item gets inverted, meaning if it was unticked, it got ticked
    groceries[index][1] = !groceries[index][1];

    //selecting all the text list elements
    listItem = document.querySelectorAll(".listText")[index];

    //replacing classes
    if (listItem.classList.contains("normalText")) {
        listItem.classList.replace("normalText", "strikedText")
    } else { listItem.classList.replace("strikedText", "normalText")};
};

//As per task requirements, here is a function that takes in two list item numbers and changes their style
function setDefaultChecked (A, B){

    changeStyle(A)
    changeStyle(B); 
};

//Running the function on indicated list elements (these are indexes, so it starts with 0, NOT 1)
setDefaultChecked(1, 4);

//adding user input functionality
//Getting the button and input value from the HTML
const addItemButton = document.getElementById("submitButton");
const addItemInput = document.getElementById("itemInput");

//a function to add an element 
function addItem() {
    let inputValue = [addItemInput.value , false]; //adding the value and that it's not crossed out
    inputValue[0] = inputValue[0].trim();
    if (inputValue[0] == "") {
        alert("Write something in the box to add it to the list");
     } else { 
        //clearing the text box
        addItemInput.value = "";
    
        //adding the new item into the groceries array
        groceries.unshift(inputValue);
        //console.log(groceries); //here just for troubleshooting

        //calling the function to display the updated list
        displayItems();
     }
};

//adding a functionality to enter text by pressing enter key instead of a button
addItemButton.addEventListener("click", addItem);
addItemInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {addItem()};
});

//the task requires to add a button which would display the list again
const reloadListButton = document.getElementById("addButton");
reloadListButton.addEventListener("click", () => console.log("The list was reloaded"), addItem);

//adding a functionallity to cross and item out by click (or other way around)
htmlGroceryList.addEventListener("click", function (event) {
    if(event.target.classList.contains("listText")) {
        console.log("An item was marked")
        //getting the clicked text
        let clickedText = (event.target.innerText);
        
        //I want to easily navigate the just names of the list, so I created a new local variable for just the names
        let groceriesNamesOnly = groceries.map(array => array[0]);
        let clickedIndex = (groceriesNamesOnly.indexOf(clickedText)); //give me the index in the array

        changeStyle(clickedIndex);
    };
});