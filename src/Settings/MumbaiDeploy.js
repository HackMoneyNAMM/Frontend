export const address = "0xF2bA9A86fFe5040C57d95CC16a94ac813b6c5Af3"
export const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "name": "newPoolEvent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
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
    }
]
