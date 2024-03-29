const { createTest } = require("./services/TestService");
const stringSimilarity = require("string-similarity");
const { getMethodId } = require("./services/MethodService");
const { getSectionId } = require("./services/SectionService");
const { getSampleTypeId } = require("./services/SampleTypeService");
const { createTag } = require("./services/TagService");
const { getExternalLabId } = require("./services/externalLabsService");
const { createHumanRank } = require("./services/HumanRankService");
const fileData = require("./data/catalogoTestQC-Condensado.json");

const normalizeCode = (code) => {
  let digits = code.replace(/QC/g, "");
  let intNUm = parseInt(digits);
  let newCode = intNUm.toString().padStart(7, "0");
  return `QC${newCode}`;
}

const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const testCharge = async (data) => {
  let methodId = null;
  try {
    methodId = await getMethodId(data.method);
  } catch (err) {
    console.log(err, "EMthod err");
  }
  const sectionId = await getSectionId(data.section);
  const sampleTypeId = await getSampleTypeId(data.typeSample);
  let tagPayload = {
    name: data.tag,
    typeSample: sampleTypeId,
    group: data.tagGroup === "Si" ? true : false,
  };
  let tagID = null;
  try {
    const tagResponse = await createTag(tagPayload);
    tagID = tagResponse.data.data.id;
  } catch (err) {
    console.log(err);
    console.log("erro al crear tag");
    return;
  }
  let ranks_ids = null;
  let ranksPromises = [];
  if (data.ranks) {
    ranksPromises = data.ranks.map(async (rank) => {
      try {
        const res = await createHumanRank(rank);
        return res.data.data.id;
      } catch (err) {
        console.log("error al crear human rank", rank);
        return null;
      }
    });
    ranks_ids = await Promise.all(ranksPromises);
  }

  const payload = {
    ...data,
    code: data.code ? normalizeCode(data.code) : "",
    method: methodId,
    description: data.description ? data.description : "",
    section: sectionId,
    printMethod: data.printMethod ? capitalizeString(data.printMethod) : "",
    typeSample: sampleTypeId,
    rejectionCriteria: data.rejectionCriteria ? data.rejectionCriteria.split("\n") : [],
    clave: "",
    individualSale: data.individualSale === "Si" ? true : false,
    gender: data.gender,
    productSat: data.productSat ? "Servicios de laboratorios de análisis de sangre" : "",
    humanRanks: ranks_ids,
    tags: [tagID],
    processingDays: data.processingDays ? parseInt(data.processingDays) : 0,
    processingHours: data.processingHours ? parseInt(data.processingHours) : 0,
    processingMinutes: data.processingMinutes ? parseInt(data.processingMinutes) : 0,
    antibiogram: false,
    comissions: 0,
    concentrationUnit: data.concentrationUnit ? data.concentrationUnit : "",
    satUnit: data.satUnit ? data.satUnit.split("-")[0] : "",
    exemptIva: false,
    cost: 0,
    printNote: data.printNote ? data.printNote : "",
    formula: data.formula ? data.formula : "",
    sampleStability: data.sampleStability ? findMostSimilar(data.sampleStability) : [],
    notes: data.notes ? data.notes : "",
    labInstructions: data.labInstructions ? data.labInstructions : "",
    patientInstructions: data.patientInstructions ? data.patientInstructions : "",
    processingDayList: data.processingDayList ? data.processingDayList.split("-") : [],
    patientNotes: data.patientNotes ? data.patientNotes : "",
  };
  delete payload["rankGender"]
  delete payload["rankUnity"]
  delete payload["rankMinAge"]
  delete payload["rankMaxAge"]
  delete payload["minRef"]
  delete payload["maxRef"]
  delete payload["tagSampleType"]
  delete payload["typeGroup"]
  delete payload["tag"]
  delete payload["tagGroup"]
  delete payload["ranks"]
  try {
    response = await createTest(payload)
    console.log(response.status)
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
  }
}

const keys = Object.keys(fileData);
const testSliced = keys;
testSliced.forEach(async (value, index) => {
  await testCharge(fileData[value]);
});

  const sampleStabilityCatalog = [
    "Ambiente (20 a 25°C): 4 Horas",
    "Ambiente (20 a 25°C): 8 Horas",
    "Ambiente (20 a 25°C): 24 Horas",
    "Ambiente (20 a 25°C): 3 Días",
    "Ambiente (20 a 25°C): 1 Semana",
    "Refrigerada (2 a 8°C): 24 Horas",
    "Refrigerada (2 a 8°C): 3 Días",
    "Refrigerada (2 a 8°C): 7 Días",
    "Refrigerada (2 a 8°C): 2 Semanas",
    "Refrigerada (2 a 8°C): 1 Mes",
    "Congelada (-20°C): 6 Horas",
    "Congelada (-20°C): 1 Semana",
    "Congelada (-20°C): 1 Mes",
    "Congelada (-20°C): 2 Meses",
    "Congelada (-20°C): 5 Meses",
    "Congelada (-20°C): 6 Meses",
    "Congelada (-20°C): 1 Año",
    "Muestra separada del paquete globular (globulos rojos)",
  ];

  const findMostSimilar = (string) => {
    let stringArray = string.split("\n");
    return stringArray.map((sampleStabilityArray) => {
      let matches = stringSimilarity.findBestMatch(
        sampleStabilityArray,
        sampleStabilityCatalog
      );
      return matches.bestMatch.target;
    });
  };

// console.log(findMostSimilar("Muestra separada del paquete globular (globulos rojos)\n" +
//   "Ambiente (20 a 25°c):   4 horas\n" +
//   "Refrigerada (2 a  8°C): 24 horas"));
