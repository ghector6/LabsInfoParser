const apiCrm = require("../api/apiCrm");

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
module.exports = {
  createSection,
  getSections,
}
