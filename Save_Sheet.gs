function saveSheet() { 
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var invoiceNumber = sheet.getRange("Invoice!F11:F11").getValues(); 
  var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
  var invoiceLookup = invoiceHistory.indexOf(String(invoiceNumber)) + 2;

  if (invoiceLookup == 1) {
    UI.alert("Error: Invoice number does not exist. Please double check the invoice number shown on the document...");  
  } else {
    var destFolder = DriveApp.getFolderById("10q449tW2W8ODKirkfyFcKEBraSNtkPJP"); 
    var newSpreadsheet = DriveApp.getFileById(sheet.getId()).makeCopy(invoiceNumber, destFolder); 
    
    var ssID = newSpreadsheet.getId();
    var sheetActive = SpreadsheetApp.openById(ssID);
    var unwantedSheets = ["Order", "Stock", "Financial Book", "Delivery Schedule", "Gumtree Ads"];
    
    for (i=0; i<unwantedSheets.length; i++) {
      sheetActive.getSheetByName(unwantedSheets[i]).activate();
      sheetActive.deleteActiveSheet();
    }
    
    var formattedInvoiceNumber = '=HYPERLINK("https://docs.google.com/spreadsheets/d/' + ssID + '", "' + invoiceNumber + '")';
    
    Book.getRange(invoiceLookup, 1).setValue(formattedInvoiceNumber);
  }
}