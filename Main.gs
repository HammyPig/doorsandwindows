init();

function doAll() {
  if (isNaN(Order.getRange("A2").getValue())) {
    UI.alert("Warning: Invoice number is invalid... Process cancelled.");
  } else {
    createInvoice();
    doBooking();
  }
}

function onOpen() {
  init();
  
  Order.getRange("A2").setValue("Latest: " + String(latestInvoice));
  
  // Setup Menu
  var menu = UI.createMenu("Scripts");
  //menu.addItem("Do All", "doAll");
  menu.addItem("Save Custom Information", "specialOrder");
  menu.addItem("Save Document Copy", "saveSheet");
  menu.addSeparator();
  menu.addItem("Invoice Paid", "updatePaid");
  menu.addItem("Invoice Complete", "updateStockB");
  menu.addSeparator();
  menu.addItem("Clear Order", "clearOrder");
  menu.addToUi();
}

function help() {
  for (i=3; i<63; i++) {
  var thing = Stock.getRange(i, 3).getValue();
  Stock.getRange(i,3).setValue(thing.replace("4", "3"));
  }
}

function helpyhelpy() {
  for (i = 3; i<=111; i++) {
    Stock.getRange(i, 14).setValue("=M" + String(i) + "/M2");
  }
}

function checkStats() {
  for (row = 101; row<=160; row++) {
    var order = Book.getRange(row, 17).getValue().split(",");
    
    var trolley = []
    for (i = 0; i<(order.length); i+=2) {
      trolley.push(order[i]);
    }
    
    var quantities = []
    for (i = 1; i<(order.length); i+=2) {
      quantities.push(Number(order[i]));
    }
    
    for (i = 0; i < trolley.length; i++) {
      for (ii = 0; ii < allStock.length; ii++) {
        
        if (String(trolley[i]) === String(allStock[ii])) {
          var existingCount = Stock.getRange("M" + String(ii+2)).getValue();
          Stock.getRange("M" + String(ii+2)).setValue(Number(existingCount) + Number(quantities[i]));
          
          break;
        }
      }
    }
  }
}