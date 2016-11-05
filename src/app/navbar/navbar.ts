import {IRootScopeService} from '../index.run';

/** @ngInject */
export function appNavbar(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'navbarCtrl',
    bindToController: true
  };

}

/** @ngInject */
export class NavbarController {

  public account: any;
  public FBUserToken: string;

  constructor(
    private $window: angular.IWindowService,
    private $scope: angular.IScope,
    private $log: angular.ILogService,
    private $rootScope: IRootScopeService,
    private $mdSidenav: angular.material.ISidenavService,
    private $mdToast: any,
    private $mdDialog: any,
    private $state: any

  ) {

    // this.$log.debug('waht is ', this.$state.current);

    this.$scope.$watch(() => {
      return this.$rootScope.App.UserService.user;
    }, (user) => {
      if (user) {
        
        // this.$log.debug('get token from user here....', user);

        if (!this.FBUserToken) {
          this.$rootScope.App.firebase.auth().currentUser.getToken(/* forceRefresh */ false)
            .then((idToken) => {
              // Send token to your backend via HTTPS
              // ...
              this.FBUserToken = idToken;
              var w: any = window;

              const SmallFBUserToken = new w.QRious({
                element: document.getElementById('SmallFBUserToken'),
                value: this.FBUserToken
              })

              const LargeFBUserTokenQR = new w.QRious({
                element: document.getElementById('LargeFBUserToken'),
                value: this.FBUserToken
              })

              this.$rootScope.App.firebase.database().ref('/accounts/' + user.uid)
                .once('value').then((snapshot) => {

                  this.account = snapshot.val();

                  if (this.account !== null) {
                    var w: any = window;
                    const qr = new w.QRious({
                      element: document.getElementById('ethereum_account_qr_code'),
                      value: this.account.ethereum_accounts[0]
                    })

                    // this.$log.debug('qr ', qr)
                  }

                });

            }).catch((error) => {
              // Handle error
              this.$log.error('Unable to generate token...', error);
            });
        }

      }

    })

  }

  public showMetaMaskAccount = (ev) => {
    this.$mdDialog.show({
      controller: this,
      contentElement: '#showMetaMaskAccount',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  public showMonarchId = (ev) => {
    this.$mdDialog.show({
      controller: this,
      contentElement: '#showMonarchId',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  public toastCopyClipboard = () => {
    var t = this.$mdToast.simple();
    t.content(`Copied to Clipboard!`);
    t.position('top right');
    this.$mdToast.show(t);

  }

  public success = () => {
    // console.log('Copied!');
    this.toastCopyClipboard()
  };

  public fail = (err) => {
    this.$log.error('Error!', err);
  };


  public openMenu = ($mdOpenMenu, ev) => {
    var originatorEv = ev;
    $mdOpenMenu(ev);
  };


}
