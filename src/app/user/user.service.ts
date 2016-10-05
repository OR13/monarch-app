
import {IRootScopeService} from '../index.run';


import {IUser} from '../com/monarch.service';


export interface ILoginCredentials {
    email: string;
    password: string;
}



export class UserService {

    public login: ILoginCredentials;
    public user: IUser;
    public account: IUser;

    public onLoginToast: ng.material.ISimpleToastPreset;

    /** @ngInject */
    constructor(
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: angular.ui.IStateService,
        private $rootScope: IRootScopeService
    ) {

    }

    public toastLogin = () => {
        var t = this.$mdToast.simple();
        t.content(`Hello ${this.user.uid}`);
        t.position('top left');
        this.$mdToast.show(t);
    }

    public loadSessionUser = (): angular.IPromise<IUser> => {

        var deferred = this.$q.defer();

        this.$rootScope.App.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // this.$log.debug('onAuthStateChanged: ', user);
                this.user = user;

               

                this.toastLogin();

                deferred.resolve(this.user);

            } else {
                // this.$log.debug('onAuthStateChanged: ', 'user is logged out.');
                this.user = null;

                deferred.reject("User is logged out");
            }

        });

        return deferred.promise;

    }

    public loginWithGithub = () => {

        var deferred = this.$q.defer();

        var w: any = window;
        var provider = new w.firebase.auth.GithubAuthProvider();

        // this.$log.debug('provider: ', provider)

        this.$rootScope.App.firebase.auth().signInAnonymously()
            .catch((error) => {
                this.$log.error('loginWithGithub failed: ', error);
            });

        return deferred.promise;

    }

    public logout = (): angular.IPromise<any[]> => {

        var deferred = this.$q.defer();
        this.$rootScope.App.firebase.auth().signOut().then(() => {
            // Sign-out successful.
            deferred.resolve(true);
        }, (error) => {
            // An error happened.
            deferred.reject(error);
        });

        return deferred.promise;;
    }

}