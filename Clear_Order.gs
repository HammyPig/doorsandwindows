function clearOrder() {
  Order.getRange(2, 1, 1, 11).setValue("");
  Order.getRange(5, 1, Order.getLastRow(), 3).setValue("");
  
  Order.getRange("A2").setValue("Latest: " + String(latestInvoice - 1));
  
  //var cell = SpreadsheetApp.getActive().getRange("A5:A");
  //var rule = SpreadsheetApp.newDataValidation()
    //.requireNumberBetween(1, 100)
    //.setAllowInvalid(false)
    //.setHelpText('Number must be between 1 and 100.')
    //.build();
  //cell.setDataValidation(rule);
}
