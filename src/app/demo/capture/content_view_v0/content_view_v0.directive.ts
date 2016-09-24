import {ContentViewV0Controller} from './content_view_v0.controller';

/** @ngInject */
export function ecContentViewV0(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
        patient: '=',
        instance: '='
    },
    templateUrl: 'app/demo/capture/content_view_v0/content_view_v0.partial.html',
    controller: ContentViewV0Controller,
    controllerAs: 'vm',
    bindToController: true
  };

}
