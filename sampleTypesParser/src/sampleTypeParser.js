const createSampleType = require('./services/SampleTypeService');
const fs = require('fs');


const filePath = '/Users/ghector6/MakingDevsProjects/VitaliaUtils/sampleTypesParser/src/utils/catalogoDeMuestra.csv';
function parseSampleTypes(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err, 'Error reading file');
      return;
    }
    const test = data.trim().split('\n');
    console.log(test);
    //test.map(processRow);
  });
}

async function processRow(row) {
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
  try {
    await createSampleType(postRequest);
  } catch (error) {
    console.error(error, 'Error creating sample type');
  }


}

parseSampleTypes(filePath);

