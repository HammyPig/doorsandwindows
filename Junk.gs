function junk() {
/*
  for (var i = 209; i < 269; i++) {
    var height = STOCK.getRange(i, 4).getValue();
    var width = Number(STOCK.getRange(i, 5).getValue()) * 2 + 10;
    var colour = STOCK.getRange(i, 6).getValue();
    STOCK.getRange(i, 2).setValue(`7mm Diamond Grill Safety Screen made for:\nAluminium Sliding Window ${height} H x ${width} W\nColour: ${colour}`);
  }
  
  for (var i = 270; i < 330; i++) {
    var height = STOCK.getRange(i, 4).getValue();
    var width = Number(STOCK.getRange(i, 5).getValue()) * 2 + 10;
    var colour = STOCK.getRange(i, 6).getValue();
    STOCK.getRange(i, 2).setValue(`Window Fly Screen made for:\nAluminium Sliding Window ${height} H x ${width} W\nColour: ${colour}`);
  }
  
  for (var i = 331; i < 355; i++) {
    var width = Number(STOCK.getRange(i, 5).getValue()) * 2 + 10;
    var colour = STOCK.getRange(i, 6).getValue();
    var config = STOCK.getRange(i, 7).getValue();
    STOCK.getRange(i, 2).setValue(`7mm Diamond Grill Safety Screen made for:\nAluminium Sliding Door 2095 H x ${width} W\nLock Type: Single Lock\nColour: ${colour}, Handling: ${config}`);
  }
  for (var i = 381; i < 405; i++) {
    var width = Number(STOCK.getRange(i, 5).getValue()) * 2 + 10;
    var colour = STOCK.getRange(i, 6).getValue();
    var config = STOCK.getRange(i, 7).getValue();
    STOCK.getRange(i, 2).setValue(`7mm Diamond Grill Safety Screen made for:\nAluminium Sliding Door 2095 H x ${width} W\nLock Type: Triple Lock (Australian Compliant)\nColour: ${colour}, Handling: ${config}`);
  }  

  for (var i = 406; i < 430; i++) {
    var width = Number(STOCK.getRange(i, 5).getValue()) * 2 + 10;
    var colour = STOCK.getRange(i, 6).getValue();
    var config = STOCK.getRange(i, 7).getValue();
    STOCK.getRange(i, 2).setValue(`Invisi-Gard Screen made for:\nAluminium Sliding Door 2095 H x ${width} W\nLock Type: Interlock, Top & Bottom Rollers\nand Triple Lock, Colour: ${colour}, Handling: ${config}\n(No Warranty Included)`);
  }
  
  for (var i = 431; i < 491; i++) {
    
    /*
    var replace = STOCK.getRange(i, 1).getValue().split("");
    replace[1] = 'i';
    replace = replace.join("");
    STOCK.getRange(i, 1).setValue(replace);
    *
    
    var height = STOCK.getRange(i, 4).getValue();
    var width = Number(STOCK.getRange(i, 5).getValue()) * 2 + 10;
    var colour = STOCK.getRange(i, 6).getValue();
    STOCK.getRange(i, 2).setValue(`Invisi-Gard Screen made for:\nAluminium Sliding Window ${height} H x ${width} W\nLock Type: Interlock, Top & Bottom Rollers\nand Triple Lock, Colour: ${colour}\n(No Warranty Included)`);
  }  
 */
 /*
  function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  var size = 80;
  for (var i = 493; i < 513; i++) {
     var height = STOCK.getRange(i, 4).getValue();
     var width = STOCK.getRange(i, 5).getValue();
     var desc = `${size}mm Window Reveal Installed for:\nAluminium Sliding Window ${height} H x ${width} W`
     
     width -= 10;
     
     height /= 100;
     width /= 100;
     
     height = padLeadingZeros(height, 2)
     width = padLeadingZeros(width, 2)
     
     STOCK.getRange(i, 1).setValue(`wri80-${height}${width}`);
     STOCK.getRange(i, 2).setValue(desc);
  }
  
  for (var i = 513; i < 533; i++) {
     var height = STOCK.getRange(i, 4).getValue();
     var width = STOCK.getRange(i, 5).getValue();
     var desc = `${size}mm Window Reveal Flat Pack for:\nAluminium Sliding Window ${height} H x ${width} W`
     
     width -= 10;
     
     height /= 100;
     width /= 100;
     
     height = padLeadingZeros(height, 2)
     width = padLeadingZeros(width, 2)
     
     STOCK.getRange(i, 1).setValue(`wrf80-${height}${width}`);
     STOCK.getRange(i, 2).setValue(desc);
  }
   
   /*
   for (var i = 0; i < 20; i++) {
     STOCK.deleteRows(i + 494, 2);
   }
   */
   
   for (var i = 534; i < 573; i++ ){
     var code = STOCK.getRange(i, 1).getValue();
     code
     STOCK.getRange(i, 1).setValue(code);
     
   }
}