/*
Resets filled in values to blank
on invoice page
*/
function resetInvoice() {
  // Reset Purchase List Length
  var defaultLastRow = 28;
  var actualLastRow = INVOICE.getLastRow();
  
  if (actualLastRow > defaultLastRow) {
    INVOICE.deleteRows(I_FIRSTPRODUCT, actualLastRow - defaultLastRow);
  }
  
  // Reset Purchase List Contents
  INVOICE.getRange(I_FIRSTPRODUCT, 1).setValue("");
  INVOICE.getRange(I_FIRSTPRODUCT, 2).setValue("");
  INVOICE.getRange(I_FIRSTPRODUCT, 5).setValue("");
  INVOICE.getRange(I_FIRSTPRODUCT, 6).setValue("");
  INVOICE.getRange(I_FIRSTPRODUCT, 7).setValue("");
  
  // Reset Invoice Information
  INVOICE.getRange("B10").setValue("");
  INVOICE.getRange("B11").setValue("");
  INVOICE.getRange("B12").setValue("");
  INVOICE.getRange("B13").setValue("");
  INVOICE.getRange("F9").setValue("");
  INVOICE.getRange("F10").setValue("");
  INVOICE.getRange("F11").setValue("");
  INVOICE.getRange("F12").setValue("");
  INVOICE.getRange("F13").setValue("");
  
  INVOICE.getRange("G17").setValue("");
  INVOICE.getRange("G18").setValue("");
  INVOICE.getRange("G19").setValue("");
  INVOICE.getRange("G20").setValue("");
  INVOICE.getRange("G21").setValue("");
  INVOICE.getRange("G22").setValue("");
  INVOICE.getRange("G23").setValue("");
  INVOICE.getRange("G24").setValue("");
  INVOICE.getRange("G25").setValue("");
}