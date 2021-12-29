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
    addBtn: '.add-btn',
    inputItemName: '#item-name',
    inputCalories: '#item-calories',
    totalCalories: '.total-calories'
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

    clearInput: function(){
      document.querySelector(UISelectors.inputItemName).value = ""
      document.querySelector(UISelectors.inputCalories).value = ""
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display= 'none';
    },

    showTotalCalories: function(total){
      document.querySelector(UISelectors.totalCalories).textContent = total;
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

  // Public methods
  return {
    init: function(){

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