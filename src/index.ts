import axios from "axios";

const main = async () => {
  // tx hash, chain/emitter/seq pairs
  const txs = [
    [
      "0xd3c51d806065a3b4837f5f6d17ad736e534f1597d989cb1efb8283275aff70c7",
      "16/000000000000000000000000bc976d4b9d57e57c3ca52e1fd136c45ff7955a96/1249",
    ],
    [
      "0x8a25b8aae3780b645b12dd7d9f76d82f03694e76c85788ece69de0caa7c1033d",
      "10/000000000000000000000000599cea2204b4faecd584ab1f2b6aca137a0afbe8/2064",
    ],
    [
      "0xf6db4e8090c6fdde9adbd2f287a3848d8b8fb0ce0d4c813c46b6632a88040646",
      "16/000000000000000000000000bc976d4b9d57e57c3ca52e1fd136c45ff7955a96/1248",
    ],
  ];

  await Promise.all(
    txs.map(async ([hash, id]) => {
      try {
        const { data } = await axios.get(
          `https://api.testnet.wormholescan.io/api/v1/vaas?txHash=${hash}`
        );
        const sequence = data.data[0].sequence.toString();
        if (sequence !== id.split("/")[2]) {
          console.error(`Sequence mismatch for ${hash}: expected ${id.split("/")[2]}, got ${sequence}`);
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${hash}:`, error);
      }
    })
  );
};

main();
