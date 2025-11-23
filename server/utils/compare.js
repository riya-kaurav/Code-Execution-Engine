// server/utils/compare.js
function normalize(s) {
  if (s === undefined || s === null) return "";
  return String(s).replace(/\r/g, "").trim().replace(/\s+/g, " ");
}

/**
 * Compare expected and actual outputs. Tries numeric compare as well.
 * Returns boolean.
 */
function compareOutputs(expected, actual) {
  const e = normalize(expected);
  const a = normalize(actual);

  // try numeric comparison
  const eNum = Number(e);
  const aNum = Number(a);
  if (!Number.isNaN(eNum) && !Number.isNaN(aNum)) {
    return eNum === aNum;
  }
  return e === a;
}

module.exports = { normalize, compareOutputs };
