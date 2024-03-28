const apiCrm = require('../api/apiCrm');
const {normalizeString} = require('../utils/normalizeString');

const PATH = '/external-labs';

const getExternalLabs = () => {
    return apiCrm({
        url: `${PATH}?pagination[limit]=-1`,
        method: 'GET'
    });
}

async function getExternalLabsData() {
    const externalLabs = await getExternalLabs();
    return externalLabs.data.data;
}

async function getExternalLabsHashMap() {
    const externalLabs = await getExternalLabsData();
    const externalLabsHashMap = {};
    externalLabs.forEach((externalLab) => {
      let normalizedExternalLabName = normalizeString(externalLab.attributes.name);
        externalLabsHashMap[normalizedExternalLabName] = externalLab.id;
    });
    return JSON.stringify(externalLabsHashMap);
}

async function getExternalLabId(externalLabName) {
    externalLabName = normalizeString(externalLabName);
    const externalLabsHashMap = JSON.parse(await getExternalLabsHashMap());
    return externalLabsHashMap[externalLabName];
}

module.exports = {
  getExternalLabs,
  getExternalLabId
}