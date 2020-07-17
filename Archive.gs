/*
//function hellohello() {
  //for (i = 61; i < 91; i++) {
  //var height = Stock.getRange(i, 5).getValue();
  //var width = Stock.getRange(i, 6).getValue();
  //var colour = Stock.getRange(i, 7).getValue();
  //var handling = Stock.getRange(i, 8).getValue();
  //Stock.getRange(i, 3).setValue("Aluminium Sliding Door " + height + " H x " + width + " W\nGlass Type: 5mm Toughened Door Panel\nColour: " + colour + ", Handling: " + handling);
  //}
//}
  //for (i = 61; i < 91; i++) {
  //var height = Stock.getRange(i, 5).getValue();
  //var width = Stock.getRange(i, 6).getValue();
  //var colour = Stock.getRange(i, 7).getValue();
  //var handling = Stock.getRange(i, 8).getValue();
  //Stock.getRange(i, 3).setValue("Aluminium Sliding Door " + height + " H x " + width + " W\nGlass Type: 5mm Toughened Door Panel\nColour: " + colour + ", Handling: " + handling); 
  //Aluminium Sliding Window 600 H x 610 W
  //Glass Type: 3mm Clear Float Glass
  //Colour: Black, Handling: XO (LH Sash)

  //var invoiceSummary = Book.getRange("M10").getValue();
  //invoiceSummary= invoiceSummary.split(",");
  //Logger.log(invoiceSummary);
  //for (i = 0; i < invoiceSummary.length; i += 2) {  
    //trolley.push(invoiceSummary[i]);
    //quantities.push(invoiceSummary[i+1]);
  //}
  //Logger.log(trolley);
  //Logger.log(quantities);

  //for (i = 0; i < invoiceSummary; i += 2) {
    //Logger.log(invoiceSummary[i]);
  
  //quantities.push(Order.getRange("B" + String(i + 5)).getValue());
  
  //for (ii = 0; ii < allStock.length; ii++) {
    
    //if (String(trolley[i]) === String(allStock[ii])) {
      
      //products.push(Stock.getRange("D"+String(ii + 2)).getValue());
      //descriptions.push(Stock.getRange("C"+String(ii + 2)).getValue());
      //prices.push(Stock.getRange("J"+String(ii + 2)).getValue());
      //break;
    //}
  //}
//}
  
  // for (i = 70; i > 1; i--) {
  // var values = Stock.getRange(i, 2, 1, 10).getValues();
  // Stock.insertRowsAfter(i, 2);
  // Stock.getRange(i + 1, 2, 1, 10).setValues(values);
  // Stock.getRange(i + 2, 2, 1, 10).setValues(values);
  // }
  //for (i = 2; i < 209; i += 3) {
    //Stock.getRange(i, 7).setValue("Black");
    //Stock.getRange(i+1, 7).setValue("Pearl White");
    //Stock.getRange(i+2, 7).setValue("Ultra Silver Gloss");
  //}
  //for (i = 116; i < 204; i += 3) {
    //var label = Stock.getRange(i, 1).getValue();
    //Stock.getRange(i, 1).setValue(label + "-b");
    //Stock.getRange(i+1, 1).setValue(label + "-w");
    //Stock.getRange(i+2, 1).setValue(label + "-s");
  //}
  
  //for (i = 2; i < 56; i++) {
    //var height = Stock.getRange(i, 4).getValue();
    //var width = Stock.getRange(i, 5).getValue();
    //Stock.getRange(i, 2).setValue("Aluminium Sliding Window " + height + " H x " + width + " W\nGlass Type: 3mm Clear Float Glass\nColour: " + Stock.getRange(i, 6).getValue() + ", Handling: " + Stock.getRange(i, 7).getValue()); 
    //Aluminium Sliding Window 600 H x 610 W
    //Glass Type: 3mm Clear Float Glass
    //Colour: Black, Handling: XO (LH Sash)
  //}
//}

//for (i=2; i<61; i++) {
  //  str = Book.getRange(i, 16).getValue();
    //str = str.replace(/\s/g, '');
    //Book.getRange(i, 16).setValue(str);
  //}

//for (row = 2; row<=83; row++) {
  //  var order = Book.getRange(row, 17).getValue().split(",");
   // var quantities = []
 //   for (i=1; i<=(order.length/2); i+=2) {
 //     quantities.push(order[i]);
//    }
//    
//    Logger.log(quantities);
//    
//    if (quantities.some(isNaN)) {
//      Logger.log(order);
//    }
//  }

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
  
  function input() {
  var startRow = 61;
  var endRow = 90;
  var interval = 1;
  
  for (i = startRow; i <= endRow; i+=interval) {
  var height = Stock.getRange(i, 5).getValue();
  var width = Stock.getRange(i, 6).getValue();
  var colour = Stock.getRange(i, 7).getValue();
  var handling = Stock.getRange(i, 8).getValue();
  Stock.getRange(i, 3).setValue("Aluminium Sliding Door " + height + " H x " + width + " W\nGlass Type: 5mm Toughened Door Panel\nColour: " + colour + ", Handling: " + handling);
  }
}
*/