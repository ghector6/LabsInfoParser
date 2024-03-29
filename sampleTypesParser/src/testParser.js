const { createTest } = require("./services/TestService");
const { getMethodId } = require("./services/MethodService");
const { getSectionId } = require("./services/SectionService");
const { getSampleTypeId } = require("./services/SampleTypeService");
const { createTag } = require("./services/TagService");
const { getExternalLabId } = require("./services/externalLabsService");
const { createHumanRank } = require("./services/HumanRankService");
const fileData = require("./data/catalogoTestQC-Condensado.json")



//Function that creates a payload  in order to create a test in the CRM but check first if method, section, typeSample, externalLabs, and create the tags, and human ranks then send the created tagId, and human_rankId in the payload

const createTestData = async (data) => {
  let methodId= null
  try {
    methodId = await getMethodId(data.method);
  } catch (err) {
    console.log(err, "EMthod err");
  }
  const sectionId = await getSectionId(data.section); 
  const sampleTypeId = await getSampleTypeId(data.typeSample);
  // const externalLabId = await getExternalLabId(data.externalLabs);
  let tagPayload = {
    name: data.tag,
    typeSample: sampleTypeId,
    group: data.tagGroup === "Si" ? true : false,
  };
  let tagID = null
  try {
    const tagResponse = await createTag(tagPayload);
    tagID = tagResponse.data.data.id
  } catch (err) {
    console.log(err);
    console.log("erro al crear tag")
    return
  }
  let ranks_ids = null
  //Human Rank payload will be created only if human rank fields are not empty
  let ranksPromises = []
  if (data.ranks) {
    ranksPromises = data.ranks.map (async (rank) => {
      try {
        const res = await createHumanRank(rank)
        return res.data.data.id
      } catch (err) {
        console.log("error al crear human rank", rank)
        // console.error(JSON.stringify(err, null, 2))
        return null
      }
    })
    ranks_ids = await Promise.all(ranksPromises)
  }
  //ranks_id will be an array of ids or null if there was an error creating the human rank

  const payload = {
    ...data,
    method: methodId,
    section: sectionId,
    typeSample: sampleTypeId,
    individualSale: data.individualSale === "Si" ? true : false,
    gender: data.gender,
    // externalLabs: externalLabId,
    humanRanks: ranks_ids,
    tags: [tagID],
    processingDays: data.processingDays ? parseInt(data.processingDays) : null,
    processingHours: data.processingHours ? parseInt(data.processingHours) : null,
    processingMinutes: data.processingMinutes ? parseInt(data.processingMinutes) : null,
  }
  delete payload["rankGender"]
  delete payload["rankUnity"]
  delete payload["rankMinAge"]
  delete payload["rankMaxAge"]
  delete payload["minRef"]
  delete payload["maxRef"]
  delete payload["tagSampleType"]
  delete payload["typeGroup"]
  delete payload["tag"]
  delete payload["tagGroup"]
  delete payload["ranks"]
  try {
    response = await createTest(payload)
    console.log(response.status)
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
  }
}


const keys = Object.keys(fileData)
const slicedData = keys
slicedData.forEach(async (value, index) => {
  await createTestData(fileData[value])
})