"use strict";

const _pick = require("lodash/pick");
const getInfoData = ({field = [], object = {}}) => {
  return _pick(object, field);
}

module.exports = {
  getInfoData
}