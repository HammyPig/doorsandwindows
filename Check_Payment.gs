function checkPayments() {
  for (i=1; i<250; i++) {
    Logger.log(Book.getRange(i, 6).getValue());
  }
}