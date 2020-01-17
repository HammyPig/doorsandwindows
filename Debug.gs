function verifyStock() {
  for (i = 0; i < allStock.length; i++) {
    var duplicates = 0;
    for (ii = 0; ii < allStock.length; ii++) {
      if (String(allStock[i]) == String(allStock[ii])) {
        duplicates += 1;
      }
    }
    if (duplicates > 1) {
      Logger.log(allStock[i]);
    }
  }
}

function backup() {
  //Backup Information
  var backupInfo = Order.getRange(2, 1, 1, 10).getValues();
  var totalBackups = Order.getRange("J4").getValue();

  //Order.getRange(totalBackups, 16, 1, 10).setValues(backupInfo);
  Order.getRange("J4").setValue(totalBackups + 1);
}