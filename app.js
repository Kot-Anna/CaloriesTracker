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
    logData: function(){
      return data;
    }
  }

})();

// UI Controller
const UICtrl = (function(){
  
  //Public methods
  return {

  }

})();

//App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){

  // Public methods
  return {
    init: function(){
      console.log("Initializing...")
    }
  }
  
})(ItemCtrl, UICtrl);

//Inititalize App

AppCtrl.init();