function resetInvoice() {
  // Reset Purchase List Length
  var lastRow = 28;
  
  if (Invoice.getLastRow() > lastRow) {
    Invoice.deleteRows(17, Invoice.getLastRow() - lastRow);
  }
  
  // Reset Purchase List Contents
  Invoice.getRange(16, 1).setValue("");
  Invoice.getRange(16, 2).setValue("");
  Invoice.getRange(16, 5).setValue("");
  Invoice.getRange(16, 6).setValue("");
  Invoice.getRange(16, 7).setValue("");
  
  // Reset Invoice Information
  Invoice.getRange("B10").setValue("");
  Invoice.getRange("B11").setValue("");
  Invoice.getRange("B12").setValue("");
  Invoice.getRange("B13").setValue("");
  Invoice.getRange("F9").setValue("");
  Invoice.getRange("F10").setValue("");
  Invoice.getRange("F11").setValue("");
  Invoice.getRange("F12").setValue("");
  Invoice.getRange("F13").setValue("");
  Invoice.getRange("G17").setValue("");
  Invoice.getRange("G18").setValue("");
  Invoice.getRange("G19").setValue("");
  Invoice.getRange("G20").setValue("");
  Invoice.getRange("G21").setValue("");
  Invoice.getRange("G22").setValue("");
  Invoice.getRange("G23").setValue("");
  Invoice.getRange("G24").setValue("");
}