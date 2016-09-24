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

### Concepts

#### Multiple Care Plans

Must support multiple care plans at once.

#### Care Plan Evolution

Must resolve changes to care plans in a transparent manner.
For example: New actions and schedule changes should appear immediatly, but changes should be identifiable over time.

#### Overlapping Care Plan Actions

Must resolve and provide transparency regarding similar actions from multiple care plans.
For example: Take 2 baby Asprin in 3 care plans. Patient should not be taking 6.

#### Flexible UX for Care Plan Actions 

Must support Multiple UIs for Single Data Schema.
For example: Water intake as decimal entry, slider or discret choice.

#### Relative Permissions

Read and Write access to Actions should be tied to unix style groups.

#### Full Control over Rendering

Actions should be groupable and orderable regardless of their origin.

#### Future and Past

Users should be able to see forward and backward in time.

#### Intention

Users should be able to save a result they intend to complete at some future time.

#### Availability

Actions should be flexably writable and readable.
For Example: Drink a glass of water [ anytime today, between 2 and 3, before 12, after 4]...
When can users see an action? When can they complete an action?







