const mongoose = require("mongoose");
const schemaType = require("../../types");

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: schemaType.TypeObjectId,
      required: true,
    },
    id:{
      type: schemaType.TypeString,
      required: true,
    },
    category: {
      type: schemaType.TypeString,
      required: true,
    },
    category_name: {
      type: schemaType.TypeString,
      required: true,
    },
    position: {
      type: schemaType.TypeString,
      requried: true,
    },
    image: {
      type: schemaType.TypeString,
      requried: true,
    }
  }
);

module.exports = categorySchema;
