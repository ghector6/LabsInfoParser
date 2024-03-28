const {getMethodId} = require("./services/MethodService");
const {getSectionId} = require("./services/SectionService");
const {getSampleTypeId} = require("./services/SampleTypeService");

// getMethodId("Ion Selectivo").then((methodId) => {
//   console.log(methodId);
// });
// getSectionId("Quimica clinica").then((sectionId) => {
//   console.log(sectionId);
// });
// getSampleTypeId("Suero - Tubo tapón rojo").then((sampleTypeId) => {
//   console.log(sampleTypeId);
// });

let data = {
  data: [
    {
      code: "QC0000001",
      title: "GLUCOSA ",
      clave: "",
      description:
        "La glucosa es el analito más frecuentemente solicitado en todas las pruebas de química clínica. Útil en el diagnóstico de los trastornos del metabolismo de los hidratos de carbono; tales como diabetes mellitus, hipoglicemia neonatal, hipoglicemia idiopática, carcinoma de los islotes pancreáticos, etc. Se encuentra disminuida en diferentes escenarios clínicos como pancreatitis, hiperinsulinismo, ayuno, mala absorción, entre otras.",
      " section": "Quimica Clinica",
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
      "normalityValueType   ": "Texto libre",
      Decimal: "2",
      processingDays: "0",
      processingHours: "3",
      processingMinutes: "0",
      Etiqueta: "Glu",
      "Tipo de muestra": "Suero-Tubo tapón rojo",
      "¿Agrupar?": "Si",
      Sexo: "",
      Unidad: "",
      "Edad minima": "",
      "Edad Maxima": "",
      "Referencia minima": "",
      "Referencia Maxima": "",
      normalityValueText: "701.00 - 100.00",
      labInstructions:
        "Centrifugar 30 minutos despues de haber recolectado la muestra y dentro de las 2 horas de la extracción",
      patientInstructions: "Ayuno de 8 a 12 horas",
      "Tipo de muestra_1": "Suero",
      sampleVolume: "1ml",
      "Tipo de contenedor": "Tubo tapon rojo",
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


//Function that creates a payload to create a test in the CRM but check first if method exists and if so, assigns the method id to the test

const createTest = async () => {
    let test = data.data[0];
    let methodId = await getMethodId(test.method);
}
