const apiCrm = require("../api/apiCrm");
const {normalizeString} = require("../utils/normalizeString");

const PATH = "/methods";

const getMethods = () => {
  return apiCrm({
    url: `${PATH}?pagination[limit]=-1`,
    method: "GET",
  });
}

async function getMethodsData() {
  const methods = await getMethods();
  return methods.data.data;
}

async function getMethodsHashMap() {
  const methods = await getMethodsData();
  const methodsHashMap = {};
  methods.forEach((method) => {
    let normalizedMethodName = normalizeString(method.attributes.name);
    methodsHashMap[normalizedMethodName] = method.id;
  })
  return JSON.stringify(methodsHashMap);
}

async function getMethodId(inputMethod) {
  inputMethod = normalizeString(inputMethod);
  const methodsHashMap = JSON.parse(await getMethodsHashMap());
  return methodsHashMap[inputMethod];
}
module.exports = {
  getMethods,
  getMethodsData,
  getMethodsHashMap,
  getMethodId
}