const { getMethodId } = require("./services/MethodService");
const { getSectionId } = require("./services/SectionService");
const { getSampleTypeId } = require("./services/SampleTypeService");
const { createTag } = require("./services/TagService");
const { getExternalLabId } = require("./services/externalLabsService");

let data = {
  data: [
    {
      code: "QC0000001",
      title: "GLUCOSA ",
      clave: "",
      description:
        "La glucosa es el analito más frecuentemente solicitado en todas las pruebas de química clínica. Útil en el diagnóstico de los trastornos del metabolismo de los hidratos de carbono; tales como diabetes mellitus, hipoglicemia neonatal, hipoglicemia idiopática, carcinoma de los islotes pancreáticos, etc. Se encuentra disminuida en diferentes escenarios clínicos como pancreatitis, hiperinsulinismo, ayuno, mala absorción, entre otras.",
      section: "Quimica Clinica",
      typeSample: "Suero - Tubo tapón rojo",
      method: "Espectrofotometría",
      printMethod: "imprimir solo cuando el parametro se venda individual",
      printBold: "Si siempre",
      externalLabs: "",
      antibiogram: "",
      individualSale: "Si",
      exemptIva: "",
      productSat: "servicios de laboratorio de analisis de sangre",
      satUnit: "E48-Unidad de servicio",
      cost: "",
      gender: "Ambos",
      formula: "",
      unity: "mg/dL",
      typeResult: "Numerico",
      normalityValueType: "Texto libre",
      Decimal: "2",
      processingDays: "0",
      processingHours: "3",
      processingMinutes: "0",
      tag: "Glu",
      tagSampleType: "Suero-Tubo tapón rojo",
      tagGroup: "Si",
      rankGender: "",
      rankUnity: "",
      rankMinAge: "",
      rankMaxAge: "",
      minRef: "",
      maxRef: "",
      normalityValueText: "701.00 - 100.00", //array
      labInstructions:
        "Centrifugar 30 minutos despues de haber recolectado la muestra y dentro de las 2 horas de la extracción",
      patientInstructions: "Ayuno de 8 a 12 horas",
      sampleVolume: "1ml",
      sampleStability:
        "Muestra separada del paquete globular (globulos rojos)\nAmbiente (20 a 25°C):  4 horas\nRefrigerada (2 a 8°c) : 24 horas",
      rejectionCriteria:
        "Identificación Inadecuada de la muestra.\nMuestras colectadas en un contenedor inadecuado\nVolumen Insuficiente de la muestra.\nMuestras visiblemente afectadas por un transporte inadecuado hacia el Laboratorio.\nMuestras con hemolisis ++\nMuestras con más de 2 horas de haber sido emitidas y que no se hayan centrifugado.\nMuestras recibidas en tubo contenedor con caducidad vencida.",
      processingDayList: "Lu-Ma-Mi-Ju-Vi-Sa",
      notes: "",
      patientNotes: "",
      printNote: "",
    },
  ],
};

//Function that creates a payload  in order to create a test in the CRM but check first if method, section, typeSample, externalLabs, and create the tags, and human ranks then send the created tagId, and human_rankId in the payload

const createTest = async (data) => {
  let test = data.data[0];
  let methodId = await getMethodId(test.method);
  let sectionId = await getSectionId(test.section);
  let sampleTypeId = await getSampleTypeId(test.typeSample);
  let externalLabId = await getExternalLabId(test.externalLabs);
  const tagPayload = {
    name: test.tag,
    typeSample: await getSampleTypeId(test.tagSampleType),
    group: test.tagGroup === "Si" ? true : false,
  };
  try {
    const tagResponse = await createTag(tagPayload);
    console.log(tagResponse.data.data.id);
  }catch(err){
    console.log(err)
    return null
  }
};

createTest(data);


      

