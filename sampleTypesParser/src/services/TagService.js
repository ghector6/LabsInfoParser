const apiCrm = require('../api/apiCrm');

const PATH = '/tags';

const createTag = (data) => {
    return apiCrm({
        url: PATH,
        method: 'POST',
        data: {data: data}
    })
}

module.exports = {
  createTag
}