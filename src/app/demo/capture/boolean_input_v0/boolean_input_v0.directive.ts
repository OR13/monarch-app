import {BooleanInputV0Controller} from './boolean_input_v0.controller';

/** @ngInject */
export function ecBooleanInputV0(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
        patient: '=',
        instance: '='
    },
    templateUrl: 'app/demo/capture/boolean_input_v0/boolean_input_v0.partial.html',
    controller: BooleanInputV0Controller,
    controllerAs: 'vm',
    bindToController: true
  };

}
