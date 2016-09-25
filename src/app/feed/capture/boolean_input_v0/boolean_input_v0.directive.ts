import {BooleanInputV0Controller} from './boolean_input_v0.controller';

/** @ngInject */
export function ecBooleanInputV0(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
        user: '=',
        instance: '='
    },
    templateUrl: 'app/feed/capture/boolean_input_v0/boolean_input_v0.partial.html',
    controller: BooleanInputV0Controller,
    controllerAs: 'vm',
    bindToController: true
  };

}
