const apiCrm = require('../api/apiCrm');
const {normalizeString} = require('../utils/normalizeString');

const PATH = '/type-samples';

const createSampleType = (data) => {
    return apiCrm({
        url: PATH,
        method: 'POST',
        data: data
    })
}

const getTypeSamples = () => {
    return apiCrm({
        url: `${PATH}?pagination[limit]=-1`,
        method: 'GET'
    });
}

async function getTypeSamplesData() {
    const samples = await getTypeSamples();
    return samples.data.data;
}

async function getSampleTypeHashMap() {
    const samples = await getTypeSamplesData();
    const samplesHashMap = {};
    samples.forEach((sample) => {
        let normalizedSampleDescription = normalizeString(sample.attributes.description);
        let normalizedSamleTube = normalizeString(sample.attributes.tube);
        samplesHashMap[`${normalizedSampleDescription}${normalizedSamleTube}`] = sample.id;
    })
    return JSON.stringify(samplesHashMap);
}

async function getSampleTypeId(catalogInput) {
    catalogInput = normalizeString(catalogInput);
    const samplesHashMap = JSON.parse(await getSampleTypeHashMap());
    return samplesHashMap[catalogInput];
}

module.exports = {
    createSampleType,
    getTypeSamples,
    getTypeSamplesData,
    getSampleTypeHashMap,
    getSampleTypeId
}