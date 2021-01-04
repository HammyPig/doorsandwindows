/*
Returns order information into invoice object
*/
function getOrder() {
  // Get invoice information
  var invoiceInfo = {
    invoiceNumber: ORDER.getRange(O_INPUTOFFSET, O_INVOICENUMBER).getValue(),
    clientName: ORDER.getRange(O_INPUTOFFSET, O_CLIENTNAME).getValue(),
    address: ORDER.getRange(O_INPUTOFFSET, O_ADDRESS).getValue(),
    phone: ORDER.getRange(O_INPUTOFFSET, O_PHONE).getValue(),
    email: ORDER.getRange(O_INPUTOFFSET, O_EMAIL).getValue(),
    paymentType: ORDER.getRange(O_INPUTOFFSET, O_PAYMENTTYPE).getValue(),
    salesPerson: ORDER.getRange(O_INPUTOFFSET, O_SALESPERSON).getValue(),
    deliveryType: ORDER.getRange(O_INPUTOFFSET, O_DELIVERYTYPE).getValue(),
    scheduledFor: ORDER.getRange(O_INPUTOFFSET, O_SCHEDULEDFOR).getValue(),
    amountPaid: ORDER.getRange(O_INPUTOFFSET, O_AMOUNTPAID).getValue(),
    discount: ORDER.getRange(O_INPUTOFFSET, O_DISCOUNT).getValue(),
    referral: ORDER.getRange(O_INPUTOFFSET, O_REFERRAL).getValue(),
    notes: ORDER.getRange(O_NOTES).getValue(),
    orderType: "Stock",
    
    cart: String(ORDER.getRange("A5:A").getValues().filter(String)).split(","), // Get product codes as array [wf-0606-s, wf-0912-s]
    products: [],
    descriptions: [],
    quantities: [],
    prices: [],
    deliveryCost: 0,
    invoiceTotal: 0
  }

  // Check for existing custom product information
  var customInfo = [];
  if (invoiceInfo.cart.includes("custom")) {
    customInfo = getCustomInfo(invoiceInfo.invoiceNumber);
  }
  
  var rows = [];
  var customIndex = 0;
  
  // Get product info
  for (var i = 0; i < invoiceInfo.cart.length; i++) {
        
    // Find product
    var product = invoiceInfo.cart[i].trim();
    var row = locateProduct(product);
    rows.push(row);
    
    // Get product information
    if (product == "custom" && customIndex < customInfo.length) {
      var product = "Custom Order";
      var description = customInfo[customIndex];
      var price = customInfo[customIndex + 1];
      customIndex += 2;
    } else {
      var product = STOCK.getRange(row, S_CODE).getValue();
      var description = STOCK.getRange(row, S_DESCRIPTION).getValue();
      var price = STOCK.getRange(row, S_PRICE).getValue();
    }
    
    var quantity = ORDER.getRange(i + O_PRODUCTOFFSET, O_QUANTITY).getValue();
    
    // Add product information
    invoiceInfo.invoiceTotal += quantity * price;
    invoiceInfo.products.push(product);
    invoiceInfo.descriptions.push(description);
    invoiceInfo.prices.push(price);
    invoiceInfo.quantities.push(quantity);
  }
  
  // Check stock levels are adequate
  invoiceInfo.orderType = checkStockAvailable(rows, invoiceInfo.quantities);
  
  // Delivery Expenses
  switch (invoiceInfo.deliveryType) {
    case "0-10 km":
      invoiceInfo.deliveryCost = 99;
      break;
    case "10-30 km":
      invoiceInfo.deliveryCost = 149;
      break;
    case "30-60 km":
      invoiceInfo.deliveryCost = 199;
      break;
    case "Sunshine Coast":
      invoiceInfo.deliveryCost = 249;
      break;
    case "North Gympie":
      invoiceInfo.deliveryCost = 349;
      break;
    default:
      if (!isNaN(invoiceInfo.deliveryType)) {
        invoiceInfo.deliveryCost = invoiceInfo.deliveryType;
      } else {
        UI.alert("Error: Delivery type is not recognised and/or is not a number");
        throw "Error: Delivery type is not recognised and/or is not a number";
      }
  }
  
  invoiceInfo.invoiceTotal += invoiceInfo.deliveryCost;
  
  // 1.5% surcharge
  if (invoiceInfo.paymentType == "Card") {
    invoiceInfo.invoiceTotal *= (1 + CARD_SURCHARGE);
  }
  
  return invoiceInfo;
}