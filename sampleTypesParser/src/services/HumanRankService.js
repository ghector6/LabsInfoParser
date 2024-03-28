const apiCrm = require("../api/apiCrm");

const PATH = "/human-ranks";

const createHumanRank = (data) => {
  return apiCrm({
    url: PATH,
    method: "POST",
    data: {data: data},
  });
}

module.exports = {
  createHumanRank,
};