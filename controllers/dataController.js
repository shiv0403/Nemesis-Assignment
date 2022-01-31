const Data = require("../models/Data");

const data_get = async (req, res) => {
  try {
    const data = await Data.find({});
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to fetch data");
  }
};

const data_post = async (req, res) => {
  const { username, email, mobile, address } = req.body;
  try {
    const userData = await Data.create({ username, email, mobile, address });
    res.status(201).send(userData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to post data");
  }
};

const data_delete = async (req, res) => {
  const { dataId } = req.body;
  try {
    const dataDeleted = await Data.deleteOne({ _id: dataId });
    res.status(200).send("Data Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to delete data");
  }
};

module.exports = { data_get, data_post, data_delete };
