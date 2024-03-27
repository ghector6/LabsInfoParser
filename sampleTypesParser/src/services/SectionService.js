const apiCrm = require("../api/apiCrm");
const {normalizeString} = require("../utils/normalizeString");
const PATH = "/sections";

const createSection = (data) => {
  return apiCrm({
    url: PATH,
    method: "POST",
    data: data,
  });
};

const getSections = () => {
  return apiCrm({
    url: `${PATH}?populate=*`,
    method: "GET",
  }); 
}

async function getSectionsData() {
  const sections = await getSections();
  return sections.data.data;
}
async function getSectionsHashMap() {
  const sections = await getSectionsData();
  const sectionsHashMap = {};
  sections.forEach((section) => {
    let normalizedSectionName = normalizeString(section.attributes.sectionName); 
    sectionsHashMap[normalizedSectionName] = section.id;
  });
  return JSON.stringify(sectionsHashMap);
}

async function getSectionId(sectionName) {
  sectionName = normalizeString(sectionName);
  const sectionsHashMap = JSON.parse(await getSectionsHashMap());
  return sectionsHashMap[sectionName];
}
module.exports = {
  createSection,
  getSections,
  getSectionsData,
  getSectionsHashMap,
  getSectionId
}
