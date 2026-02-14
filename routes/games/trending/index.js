const { topsix } = require("../../../helpers");

const trending = async (req, res) => {
  try {
    const data = await topsix("games");
    return res.status(200).send({ status: 200, data });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = trending;  