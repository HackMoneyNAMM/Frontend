export const mumbaiAddress = "0x8caf6ac933e70af0d76af7960338ed123e875b5e"
export const factoryABI = [
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "poolDeploy",
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
        "internalType": "string[]",
        "name": "tokenNames",
        "type": "string[]"
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