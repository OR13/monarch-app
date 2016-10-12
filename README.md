# Monarch

### Dependencies

- [MetaMask](https://metamask.io/)
- [IPFS](https://ipfs.io)

### MetaMask Setup

- [Install the chrome extension](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn)

### IPFS Setup

You will need to configure your IPFS node to support CORS for localhost and production.

```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://localhost:3000\", "http://monarch.transmute.industries\"]" 
```


### Build and Deploy 
```
$ npm install && bower install && tsd install
$ gulp serve
$ gulp build
$ gulp gh-deploy
```

### Run All Services Including IPFS

```
$ npm run dev
```

### Just Front End Dev (no IPFS)

```
$ npm run clean-serve 
```


# Monarch UPort

A uPort interface.

## Infura Environment

### Main Ethereum Network
export INFURA_MAINNET=https://mainnet.infura.io/ACCESS_TOKEN

### Test Ethereum Network (Morden)
export INFURA_TESTNET=https://morden.infura.io/ACCESS_TOKEN

### IPFS Gateway
export INFURA_IPFS_GATEWAY=https://ipfs.infura.io

### IPFS RPC
export INFUA_IPFS_RPC=https://ipfs.infura.io:5001