function input() {
  var startRow = 61;
  var endRow = 90;
  var interval = 1;
  
  for (i = startRow; i <= endRow; i+=interval) {
  var height = Stock.getRange(i, 5).getValue();
  var width = Stock.getRange(i, 6).getValue();
  var colour = Stock.getRange(i, 7).getValue();
  var handling = Stock.getRange(i, 8).getValue();
  Stock.getRange(i, 3).setValue("Aluminium Sliding Door " + height + " H x " + width + " W\nGlass Type: 5mm Toughened Door Panel\nColour: " + colour + ", Handling: " + handling);
  }
}