const {getMethodId} = require("./services/MethodService");
const {getSectionId} = require("./services/SectionService");
const {getSampleTypeId} = require("./services/SampleTypeService");

getMethodId("Ion Selectivo").then((methodId) => {
  console.log(methodId);
});
getSectionId("Quimica clinica").then((sectionId) => {
  console.log(sectionId);
});
getSampleTypeId("Suero - Tubo tapón rojo").then((sampleTypeId) => {
  console.log(sampleTypeId);
});

