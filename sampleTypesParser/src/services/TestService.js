const apiCrm = require("../api/apiCrm");

const PATH = "/tests";

const createTest = (data) => {
  return apiCrm({
    url: PATH,
    method: "POST",
    data: {data: {...data, status: "created"}},
  });
} 

module.exports = {
  createTest,
};