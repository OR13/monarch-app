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

  public FBUserToken: string;

  constructor(
    private $window: angular.IWindowService,
    private $scope: angular.IScope,
    private $log: angular.ILogService,
    private $rootScope: IRootScopeService,
    private $mdSidenav: angular.material.ISidenavService,
    private $mdToast: any,
    private $mdDialog: any

  ) {

    this.$scope.$watch(() => {
      return this.$rootScope.App.UserService.user;
    }, (user) => {
      if (user) {


        this.$log.debug('get token from user here....', user);

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

            }).catch((error) => {
              // Handle error
              this.$log.error('Unable to generate token...', error);
            });
        }

      }

    })

  }

  public showId = (ev) => {
    this.$mdDialog.show({
      controller: this,
      contentElement: '#largeIdDialog',
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


}
