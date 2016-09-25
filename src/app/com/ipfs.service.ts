

// var connectToIpfsGateway = function (host, port) {
//     return window.ipfs = window.IpfsApi(host, port);
// }

// var promptIpfsSetup = function () {

//     var has_ipfs_installed, has_configured_access_controll_allow_origin;
//     has_ipfs_installed = confirm("IPFS is required. Cancel to Install. Ok to Configure.")

//     if (has_ipfs_installed) {

//         prompt("Configure Access Control", 'ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://docs.firedax.com\"]"');

//         var ipfs_host_port = prompt('Enter your IPFS node HOST:PORT', "127.0.0.1:5001");

//         connectToIpfsGateway(ipfs_host_port.split(":")[0], ipfs_host_port.split(":")[1])

//     } else {
//         window.location.href = 'https://ipfs.io/docs/install';
//     }
// }

// function img_create(src, alt, title) {
//     var img = new Image();
//     img.src = src;
//     if (alt != null) img.alt = alt;
//     if (title != null) img.title = title;
//     return img;
// }

// window.getImage = function () {

//     window.ipfs.cat('QmRcm8yiCYmQ1jDxhUVtsjvps4XjtjSTziVSdQsszuiRfw')
//         .then(function (cat) {
//             console.log('cat: ', cat.url)
//             document.getElementById("test-image").innerHTML += '<img style="width: 75%; padding-left: 30px;" src="' + cat.url + '">';
//         })
//         .catch(function (err) {
//             console.log('Fail: ', err)
//         })
// }

// setTimeout(function () {

//     var ipfs = connectToIpfsGateway('127.0.0.1', '5001')

//     ipfs.id()
//         .then(function (id) {
//             console.log('my id is: ', id)

//             window.getImage();
//         })
//         .catch(function (err) {
//             console.log('Fail: ', err)
//             promptIpfsSetup();
//         })

// }, 1 * 1000);



import {IRootScopeService} from '../index.run';
import {SecurityService} from './security.service';

export class IpfsService {

    public ipfs: any;
    public isOnline: boolean;

    /** @ngInject */
    constructor(
        private $timeout: angular.ITimeoutService,
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: any,
        private $rootScope: IRootScopeService
    ) {

        var w: any = window;

        var host = '127.0.0.1';
        var port = '5001';

        this.ipfs = w.IpfsApi(host, port);

        this.isOnline = false;

        this.ipfs.id()
            .then((id) => {
                this.$log.debug('my id is: ', id)

                this.isOnline = true;
            })
            .catch((err) => {
                console.log('Fail: ', err)
                // promptIpfsSetup();
            })

    }



}