export const mumbaiAddress = "0x614b558be047afe95d29102a54065b6d9d554725"
export const factoryABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "poolName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "poolTicker",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "poolAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "tokenAddresses",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "sigma",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eta",
        "type": "uint256"
      }
    ],
    "name": "newPoolEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cntr",
        "type": "uint256"
      }
    ],
    "name": "pong",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "poolName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "poolTicker",
        "type": "string"
      },
      {
        "internalType": "address[]",
        "name": "tokens",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "sigma",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "eta",
        "type": "uint256"
      }
    ],
    "name": "newPool",
    "outputs": [
      {
        "internalType": "address",
        "name": "poolAddr",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ping",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]