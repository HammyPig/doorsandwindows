function getCustomInfo(invoiceNumber) {
  var row = locateInvoice(invoiceNumber);
  var customInfo = [];
  
  if (row != -1) {
    var customInfo = BOOK.getRange(row, B_CUSTOMINFO).getValue();
    
    if (customInfo == "") {
      return [];
    }
    
    customInfo = customInfo.split(",");
    for (var i = 0; i < customInfo.length; i += 2) {
      customInfo[i] = customInfo[i].replace(/\|/g, ",");
    }
  }
  
  return customInfo;
}

function testGetCustomInfo() {
  Logger.log(getCustomInfo(2985));
  Logger.log(getCustomInfo(2871));
  Logger.log(getCustomInfo(2879));
  Logger.log(getCustomInfo(2868));
  
  Logger.log(getCustomInfo(0001));
  Logger.log(getCustomInfo(9999));
  Logger.log(getCustomInfo("hello"));
}