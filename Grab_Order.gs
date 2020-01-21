function grabOrder() {
  
  products = [];
  descriptions = [];
  quantities = [];
  prices = [];
  deliveryCost = "FREE";
  
  // Invoice Information
  
  invoiceNumber = Order.getRange("A2").getValue();
  clientName = Order.getRange("B2").getValue();
  clientAddress = Order.getRange("C2").getValue();
  clientMobile = Order.getRange("D2").getValue();
  clientEmail = Order.getRange("E2").getValue();
  paymentMethod = Order.getRange("F2").getValue();
  salesPerson = Order.getRange("G2").getValue();
  deliveryType = Order.getRange("H2").getValue();
  leadTime = Order.getRange("I2").getValue();
  amountPaid = Order.getRange("J2").getValue();
  discountApplied = Order.getRange("K2").getValue();

  // Organise Purchased Product Information
  trolley = Order.getRange("A5:A").getValues().filter(String).toString();
  trolley = trolley.split(",");
  if (trolley.indexOf("custom")+1) {
    var invoiceHistory = String(Book.getRange(2, 1, Book.getLastRow(), 1).getValues()).split(",");
    var row = invoiceHistory.indexOf(String(invoiceNumber)) + 2;
    var customInfo = Book.getRange(row, 20).getValue()
    if (customInfo != "") {
      customInfo = customInfo.split(",");
      var fillSpecial = 1;
    }
  }
  
  var customRow = 0;
  for (i = 0; i < trolley.length; i++) {
  
    quantities.push(Order.getRange("B" + String(i + 5)).getValue());
  
    for (ii = 0; ii < allStock.length; ii++) {
    
      if (String(trolley[i]) === String(allStock[ii])) {
        
        if (trolley[i] == "custom" && fillSpecial && customRow < customInfo.length/2) {
          products.push("Custom Order");
          descriptions.push(customInfo[0 + customRow*2].replace("|", ","));
          prices.push(customInfo[1 + customRow*2]);
          customRow += 1;
        } else {
          products.push(Stock.getRange("D"+String(ii + 2)).getValue());
          descriptions.push(Stock.getRange("C"+String(ii + 2)).getValue());
          prices.push(Stock.getRange(ii+2, 10).getValue());
        }
        break;
      }
    }
  }
  
  // Delivery Expenses
  switch (deliveryType) {
    case "0-10km":
      deliveryCost = 99;
      break;
    case "10-30km":
      deliveryCost = 149;
      break;
    case "30-60km":
      deliveryCost = 199;
      break;
    case "Sunshine Coast":
      deliveryCost = 249;
      break;
    case "North Gympie":
      deliveryCost = 349;
      break;
  }
  
  // Total Calculation
  invoiceTotal = 0;
  for (i = 0; i < trolley.length; i++) {
    invoiceTotal += prices[i]*quantities[i];
  }
  
  if (!isNaN(deliveryCost)) {
    invoiceTotal += deliveryCost;
  }
  invoiceGST = (invoiceTotal)*0.1;

  checkStock();
}