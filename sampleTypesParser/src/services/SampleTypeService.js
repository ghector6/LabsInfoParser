const apiCrm = require('../api/apiCrm');

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

module.exports = {
    createSampleType,
    getTypeSamples
}