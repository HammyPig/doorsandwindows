function saveSheet() { 
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var invoiceNumber = sheet.getRange("Invoice!F11:F11").getValues(); 
  var destFolder = DriveApp.getFolderById("10q449tW2W8ODKirkfyFcKEBraSNtkPJP"); 
  var newSpreadsheet = DriveApp.getFileById(sheet.getId()).makeCopy(invoiceNumber, destFolder); 
  
  var ssID = newSpreadsheet.getId();
  var sheetActive = SpreadsheetApp.openById(ssID);
  var unwantedSheets = ["Order", "Stock", "Financial Book", "Delivery Schedule"];
  
  for (i=0; i<unwantedSheets.length; i++) {
    sheetActive.getSheetByName(unwantedSheets[i]).activate();
    sheetActive.deleteActiveSheet();
  }
  
  formattedInvoiceNumber = '=HYPERLINK("https://docs.google.com/spreadsheets/d/' + ssID + '"'
  
}