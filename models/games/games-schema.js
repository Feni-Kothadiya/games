const mongoose = require("mongoose");
const schemaType = require("../../types");

const gamesSchema = new mongoose.Schema(
  {
    _id: {
      type: schemaType.TypeObjectId,
      required: true,
    },
    id:{
      type: schemaType.TypeString,
      required: true,
    },
    size:{
      type: schemaType.TypeNumber,
      required: true,
    },
    metaname: {
      type: schemaType.TypeString,
      required: true,
    },
    category: {
      type: schemaType.TypeString,
      required: true,
    },
    title: {
      type: schemaType.TypeString,
      required: true,
    },
    pagelink: {
      type: schemaType.TypeString,
      required: true,
    },
    gamelink: {
      type: schemaType.TypeString,
      required: true,
    },
    thumb: {
      type: schemaType.TypeString,
      requried: true,
    },
    banner: {
      type: schemaType.TypeString,
      requried: true,
    },
    name: {
      type: schemaType.TypeString,
      requried: true,
    },
    desc: {
      type: schemaType.TypeString,
      requried: true,
    },
  }
);

module.exports = gamesSchema;
