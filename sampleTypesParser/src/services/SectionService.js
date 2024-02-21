const apiCrm = require("../api/apiCrm");

const PATH = "/sections";

const createSection = (data) => {
  return apiCrm({
    url: PATH,
    method: "POST",
    data: data,
  });
};
module.exports = createSection;
