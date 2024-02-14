const apiCrm = require('../api/apiCrm');

const PATH = '/type-samples';

const createSampleType = (data) => {
    return apiCrm({
        url: PATH,
        method: 'POST',
        data: data
    })
}

module.exports = createSampleType;