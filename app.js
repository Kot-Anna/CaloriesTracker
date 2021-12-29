// Storage Controller

//Item Controller

//iffy - runs right after starting the app
const ItemCtrl = (function(){
  // Constructor for the Item 
  const Item = function(id, itemname, calories){
    this.id = id;
    this.itemname= itemname;
    this.calories = calories;
  };

  //Data Structure / State
  const data = {
    items: [
      {id:0, name: "Ham and Leek Casserolle", calories: 763},
      {id:1, name: "Fresh Vegetable Salad with Vinegrette", calories: 267},
      {id:2, name: "Bubble Team with Brown Sugar", calories: 550}
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public methods
  return {
    getItems: function(){
      return data.items;
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
    itemList: '#item-list'
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
    }

  }

})();

//App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){

  // Public methods
  return {
    init: function(){

      //Fetch meals added by the user
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items);
    }
  }
  
})(ItemCtrl, UICtrl);

//Inititalize App

AppCtrl.init();