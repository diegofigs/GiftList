const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);

async function main() {
  const myArgs = process.argv.slice(2);
  const [name] = myArgs;
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index); 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
