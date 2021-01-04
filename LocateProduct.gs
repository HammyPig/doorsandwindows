/*
Will return the row of the product,
if not found, will raise an error
*/
function locateProduct(product) {
  var row = STOCK_LIST.indexOf(product);
  
  if (row == -1) {
    var errorMessage = `Error: Entered product: '${product}' not found...`;
    UI.alert(errorMessage);
    throw errorMessage;
  }
  
  return row + 2;
}
