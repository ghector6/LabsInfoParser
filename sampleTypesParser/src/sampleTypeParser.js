//const csvData = `
//01,ALIENTO,TARJETA,SI,NO,
//02,BIOPSIA,FRASCO,SI,NO,
//03,ESPUTO,POMADERA,SI,NO,
//`;
const fs = require('fs');

const filePath = '/Users/ghector6/MakingDevsProjects/VitaliaUtils/sampleTypesParser/src/utils/catalogoDeMuestra.csv';
//const csvData = fs.readFileSync(filePath, 'utf8');
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  const test = data.trim().split('\n');
  test.map( row => {
    const data = row.split(',');
    const postRequest = {
      "data": {
        "clave": data[0],
        "status": "created",
        "description": data[1],
        "tube": data[2],
        "printCode": true
      }
    };
    console.log(postRequest);
  });
});

//const test = data.trim().split('\n');
//test.map( row => {
//  const data = row.split(',');
//  const postRequest = {
//    "data": {
//      "clave": data[0],
//      "status": "created",
//      "description": data[1],
//      "tube": data[2],
//      "printCode": true
//    }
//  };
//  console.log(postRequest);
//});
//
