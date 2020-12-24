function getOrder() {
  products = [];
  descriptions = [];
  quantities = [];
  prices = [];
  deliveryCost = '';
  
  // Invoice Information
  invoiceNumber = Order.getRange("A2").getValue();
  clientName = Order.getRange("B2").getValue();
  clientAddress = Order.getRange("C2").getValue();
  clientMobile = Order.getRange("D2").getValue();
  clientEmail = Order.getRange("E2").getValue();
  paymentMethod = Order.getRange("F2").getValue();
  salesPerson = Order.getRange("G2").getValue();
  deliveryType = Order.getRange("H2").getValue();
  scheduledFor = Order.getRange("I2").getValue();
  amountPaid = Order.getRange("J2").getValue();
  discountApplied = Order.getRange("K2").getValue();
  referral = Order.getRange("L2").getValue();

  // Get products ordered
  trolley = Order.getRange("A5:A").getValues().filter(String).toString().split(",");
  
  // If a custom is included
  if (trolley.indexOf("custom") + 1) {
    var customInfo = ''
    var row = locateInvoice(invoiceNumber)
    
    if (row != 1) {
      var customInfo = Book.getRange(row, 20).getValue()
      
      if (customInfo != '') {
        customInfo = customInfo.split(",");
      }
    }
  }
  
  var customRow = 0;
  // Check all products
  for (var i = 0; i < trolley.length; i++) {
    quantities.push(Order.getRange("B" + String(i + 5)).getValue());
    
    var product = trolley[i].trim()
    var row = allStock.indexOf(product)
    
    if (row == -1) {
      errorMessage = `Error: Entered product: '${trolley[i]}' not found...`
      UI.alert(errorMessage)
      throw errorMessage
    }
    
    if (product == "custom" && customInfo != '' && customRow < customInfo.length) {
      products.push("Custom Order");
      descriptions.push(customInfo[customRow].replace(/\|/g, ","));
      prices.push(customInfo[customRow + 1]);
      customRow += 2;
    } else {
      products.push(Stock.getRange("C"+String(row + 2)).getValue());
      descriptions.push(Stock.getRange("B"+String(row + 2)).getValue());
      prices.push(Stock.getRange(row + 2, 10).getValue());
    }
  }
  
  // Delivery Expenses
  switch (deliveryType) {
    case "0-10 km":
      deliveryCost = 99;
      break;
    case "10-30 km":
      deliveryCost = 149;
      break;
    case "30-60 km":
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
  for (var i = 0; i < trolley.length; i++) {
    invoiceTotal += prices[i]*quantities[i];
  }
  
  if (!isNaN(deliveryCost)) {
    invoiceTotal += deliveryCost;
  }
  
  checkStock();
}