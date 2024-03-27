const SectionService = require("./services/SectionService");
const getSections = SectionService.getSections;
const SampleTypeService = require("./services/SampleTypeService");
const getTypeSamples = SampleTypeService.getTypeSamples;

//Function to get sections data
async function getSectionsData() {
  const sections = await getSections();
  return sections.data.data;
}
//Function to create a hash map with sectionName as key and sectionId as value
async function getSectionsHashMap() {
  const sections = await getSectionsData();
  const sectionsHashMap = {};
  sections.forEach((section) => {
    let normalizedSectionName = section.attributes.sectionName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    sectionsHashMap[normalizedSectionName] = section.id;
  });
  return JSON.stringify(sectionsHashMap);
}
// getSectionsHashMap().then((sectionsHashMap) => {
//   console.log(sectionsHashMap);
// });
//function that compares a received sectionName and returns the sectionId
async function getSectionId(sectionName) {
  // Normalize the string to be lowercased and remove accents or weird characters
  sectionName = sectionName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

  const sectionsHashMap = JSON.parse(await getSectionsHashMap());
  return sectionsHashMap[sectionName];
}
//Function to get sampleTypes data
async function getSampleTypesData() {
  const sampleTypes = await getTypeSamples();
  return sampleTypes.data.data
}
async function getSampleTypeHashMap() {
  const samples = await getSampleTypesData();
  const samplesHashMap = {};
  samples.forEach((sample) => {
    let normalizedSampleDescription = sample.attributes.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    let normalizedSampleTube = sample.attributes.tube.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    samplesHashMap[`${normalizedSampleDescription}-${normalizedSampleTube}`] = sample.id;
  });
  return JSON.stringify(samplesHashMap);
}

getSampleTypeHashMap().then((samplesHashMap) => {
  console.log(samplesHashMap);
});