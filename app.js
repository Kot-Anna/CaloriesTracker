// Storage Controller

//Item Controller

//iffy - runs right after starting the app
const ItemCtrl = (function(){
  // Constructor for the Item 
  const Item = function(id, itemname, calories){
    this.id = id;
    this.name= itemname;
    this.calories = calories;
  };

  //Data Structure / State
  const data = {
    items: [
      // {id:0, name: "Ham and Leek Casserolle", calories: 763},
      // {id:1, name: "Fresh Vegetable Salad with Vinegrette", calories: 267},
      // {id:2, name: "Bubble Team with Brown Sugar", calories: 550}
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public methods
  return {
    getItems: function(){
      return data.items;
    },

    addItem: function(name, calories) {
      let ID;
      //create id
      if(data.items.length > 0) {
        ID = data.items[data.items.length-1].id + 1
      }else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create new item

      newItem = new Item(ID, name, calories);

      //add new item to the items array
      data.items.push(newItem)

      return newItem;
    },

    getItemById: function(id){
      let found = null;
      //loop through items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        };
      });
      return found; 
    },

    //update item
    updatedItem: function(name, calories) {
      //Calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach((item)=>{
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    
    //set current item

    setCurrentItem: function(item){
      data.currentItem = item;
    },

    // get current item

    getCurrentItem: function(){
      return data.currentItem;
    },

    //loop through item list and sum up the calories
    getTotalCalories: function(){
      let total = 0;
      data.items.forEach(function(item){
        total += item.calories;
      });

      //Set totl calories value
      data.totalCalories = total;

      //return the total
      return data.totalCalories;
    },

    logData: function(){
      return data;
    }
  }

})();

// UI Controller
const UICtrl = (function(){

  //An object storing all ui selectors
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    inputItemName: '#item-name',
    inputCalories: '#item-calories',
    totalCalories: '.total-calories',

  }
  
  //Public methods
  return {
    populateItemList: function(items){
      let html = "";

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="X" class="secondary-content"> <i class="edit-item fas fa-edit"></i></a>
      </li>`;
      });

      //Insert list items into ui

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.inputItemName).value,
        calories: document.querySelector(UISelectors.inputCalories).value
      }
    },

    addListItem: function(item){
      //Unhide the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement('li');
      //Add class
      li.className = "collection-item";
      //Add id
      li.id = `item-${item.id}`;
      //Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="X" class="secondary-content"> <i class="edit-item fas fa-edit"></i></a>`;

      //Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },

    updateListItem: function(item){

      //Fetching all the li from dom
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach((listItem)=>{
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="X" class="secondary-content"> <i class="edit-item fas fa-edit"></i></a>` ;
        };
      });

    },

    clearInput: function(){
      document.querySelector(UISelectors.inputItemName).value = ""
      document.querySelector(UISelectors.inputCalories).value = ""
    },

    addItemToForm: function(){
      document.querySelector(UISelectors.inputItemName).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.inputCalories).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display= 'none';
    },

    showTotalCalories: function(total){
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },

    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display= 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display= 'none';
      document.querySelector(UISelectors.backBtn).style.display= 'none';
      document.querySelector(UISelectors.updateBtn).style.display= 'none';
    },

    showEditState: function(){
      document.querySelector(UISelectors.addBtn).style.display= 'none';
      document.querySelector(UISelectors.deleteBtn).style.display= 'inline';
      document.querySelector(UISelectors.backBtn).style.display= 'inline';
      document.querySelector(UISelectors.updateBtn).style.display= 'inline';
    },
    getSelectors: function(){
      return UISelectors;
    }

  }

})();

//App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){

  //Load event listeners
  const loadEvents = function(){

    //Get UI selectors using uictrl get function
    const UISelectors = UICtrl.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    // disable submit on enter button

    document.addEventListener("keypress", (e)=>{
      if(e.code === 13 || e.key === "Enter"){
        e.preventDefault();
        return false
      }
    })

    //edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

  };

  //Add Item to the list
  const itemAddSubmit = function(e){
    //Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // check for empty input
    if(input.name !== "" && input.calories !== ""){
      //add item to the list
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      //add item to the UI
      UICtrl.addListItem(newItem);

      // get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total to the UI
      UICtrl.showTotalCalories(totalCalories);

      //Clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //Upon confirming the update of the item
  const itemEditClick = function(e){
    if(e.target.classList.contains("edit-item")) {
      //get id of a list item clicked
      const listId = e.target.parentNode.parentNode.id;

      //break item id (item-0) into an array [item, 0]
      const listIdArray = listId.split("-");

      //set id to a number
      const id = parseInt(listIdArray[1]);

      //get item by the id
      const itemToEdit = ItemCtrl.getItemById(id);

      //set current item to the clicked one
      ItemCtrl.setCurrentItem(itemToEdit);

      //add item to form
      UICtrl.addItemToForm();
    };
    e.preventDefault();
  };

  //Updating edited item
  const itemUpdateSubmit = function(e){

    //Get item input
    const input = UICtrl.getItemInput();

    //update item
    const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);

    //update UI
    UICtrl.updateListItem(updatedItem);
    // get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total to the UI
    UICtrl.showTotalCalories(totalCalories);
    //Clear edit
    UICtrl.clearEditState();


    e.preventDefault();
  };


  // Public methods
  return {
    init: function(){
      //clear edit state
      UICtrl.clearEditState();

      //Fetch meals added by the user
      const items = ItemCtrl.getItems();

      // Check if there is any items, hide list if none
      if(items.length === 0) {
        UICtrl.hideList()
      } else {
        //Populate list with items
        UICtrl.populateItemList(items);
      }

      // get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total to the UI
      UICtrl.showTotalCalories(totalCalories);

      //Load Event Listeners
      loadEvents();
    }
  }
  
})(ItemCtrl, UICtrl);

//Inititalize App

AppCtrl.init();