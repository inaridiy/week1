module.exports.parseGroth16Calldata = (calldata) => {
  const args = [];
  let depth = 0;
  let lastIndex = 0;
  for (const [i, c] of Object.entries(calldata)) {
    if (+i === calldata.length - 1) args.push(JSON.parse(calldata.slice(lastIndex)));
    if (c === "[") depth++;
    else if (c === "]") depth--;
    else if (c === "," && depth === 0) {
      args.push(JSON.parse(calldata.slice(lastIndex, +i)));
      lastIndex = +i + 1;
    }
  }

  return args;
};

module.exports.parsePlonkCalldata = (calldata) => {
  const index = calldata.indexOf("][");
  const args1 = calldata.slice(0, index + 1);
  const args2 = calldata.slice(index + 1);
  return [JSON.parse(args1), JSON.parse(args2)];
};
