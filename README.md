# Monarch

### Dependencies

- [MetaMask](https://metamask.io/)
- [IPFS](https://ipfs.io)

### MetaMask Setup

- [Install the chrome extension](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn)

### IPFS Setup

You will need to configure your IPFS node to support CORS for localhost and production.

```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://localhost:3000\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://monarch.transmute.industries\"]"
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
$ ./_start.sh
```

### Just Front End Dev (no IPFS)

```
$ npm run clean-serve 
```
