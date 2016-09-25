import {TextInputV0Controller} from './text_input_v0.controller';

/** @ngInject */
export function ecTextInputV0(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
        instance: '='
    },
    templateUrl: 'app/feed/capture/text_input_v0/text_input_v0.partial.html',
    controller: TextInputV0Controller,
    controllerAs: 'vm',
    bindToController: true
  };

}
