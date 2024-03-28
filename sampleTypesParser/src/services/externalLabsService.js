const apiCrm = require('../api/apiCrm');

const PATH = '/external-labs';

const getExternalLabs = () => {
    return apiCrm({
        url: `${PATH}?pagination[limit]=-1`,
        method: 'GET'
    });
}

module.exports = {
  getExternalLabs
}