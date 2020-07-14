function doAll() {
  var invoice_number = Order.getRange("A2").getValue()
  
  if (isNaN(invoice_number)) {
    UI.alert("Warning: Invoice number is invalid... Process cancelled.");
  } else {
    createInvoice();
    doBooking();
  }
  
  latestInvoice();
}


function latestInvoice() {
  var latest_invoice = Book.getRange(2, F_INVOICENUMBER).getValue();
  Order.getRange("A2").setValue("Latest: " + latest_invoice);
}


function onOpen() {
  latestInvoice();
  
  // Setup Menu
  var menu = UI.createMenu("Scripts");
  //menu.addItem("Do All", "doAll");
  menu.addItem("Save Custom Product Info", "specialOrder");
  menu.addItem("Save Document Copy", "saveSheet");
  menu.addSeparator();
  menu.addItem("Invoice Paid", "updatePaid");
  menu.addItem("Update Stock/Invoice Complete", "updateStockB");
  menu.addSeparator();
  menu.addItem("Clear Order", "clearOrder");
  menu.addToUi();
  
  // Patch notes
  var newPatch = Order.getRange("A2").getValue();
  if (newPatch == "ding ding") {
    var patchNotes = "HELLO even more new stuff:\n- Financial book now features checklist system (and it looks like a loading bar so it looks nice): has \
  the invoice been paid?, have screens been ordered (if need be)?, has a ready notice been sent to the \
  customer once ALL stock has arrived?, and finally has the invoice been fully completed? and into the bin it goes etc. you can change these around if you want just tell me what to replace it with\n \
  \n to work with these new features, new buttons have been added to the script tab, where you can now mark an invoice \
  (the one you just created after pressing create invoice) as paid or fully completed, so you can process orders as you create them without wasting time \
  (this also updates the stock automatically, so you don't need to go to the previous window and do that, but that button still works when you need it), \
  you can also edit the checklist in the financial book manually, but automated is cool \n \
  - invoice numbers arent as angry as they used to be \n - more safety nets \n - some stuff is a bit faster \n - more time stuff in the financial book \n - bug fixes \n - more automated stuff that basically means i do more of your \
  job for you \n - more of more stuff \n more stuff coming soon \n \n old hello new stuff:\n- Financial book now sorts newest invoices from top to bottom\n- \
  Reduced loading times\n- Document saving is now optional and is included in the scripts tab, but \
  you don't really need to save things unless the order is really unique, otherwise just use the search \
  bar to get old invoices up and press create invoice the usual way"
  
  UI.alert(patchNotes);
  }
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