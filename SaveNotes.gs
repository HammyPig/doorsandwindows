function saveNotes() {
  var invoiceNumber = ORDER.getRange(O_INPUTOFFSET, O_INVOICENUMBER).getValue();
  var row = locateInvoice(invoiceNumber);
  
  if (row == -1) {
    UI.alert("Warning: The invoice you entered could not be found...");
    return;
  }
  
  var notes = "";
  var existingNotes = BOOK.getRange(row, B_NOTES).getValue();
  
  if (existingNotes != "") {
    var saveCopy = UI.alert("Warning: Notes already exist for this invoice, do you wish to save a copy of the previous notes?", UI.ButtonSet.YES_NO_CANCEL);
    
    if (saveCopy == UI.Button.YES) {
      var notes = "\n\n\n\n\n" + BOOK.getRange(row, B_NOTES).getValue();
    } else if (saveCopy == UI.Button.CANCEL) {
      UI.alert("Process cancelled...");
      throw "Process cancelled...";
    }
  }
  
  notes = ORDER.getRange(O_NOTES).getValue() + notes;
  BOOK.getRange(row, B_NOTES).setValue(notes);
}