const fs = require("fs");
const createSection = require("./services/SectionService");
const filePath =
  "/Users/ghector6/MakingDevsProjects/VitaliaUtils/sampleTypesParser/src/utils/catalogoDeSecciones.csv";
function parseSection(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err, "Error reading file");
      return;
    }
    const test = data.trim().split("\n");
    test.map(processRow);
  });
}

async function processRow(row) {
  const data = row.split(",");
  const postRequest = {
    "data": {
      "sectionName": data[0],
      "prefix": "",
      "status": "created",
    },
  };
  try {
    await createSection(postRequest);
  } catch (error) {
    console.error(error, "Error creating section");
  }
}

parseSection(filePath);
