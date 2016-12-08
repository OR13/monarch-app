
interface IParticlesScope extends angular.IScope {

}

/** @ngInject */
export function renderedParticles(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        template: `<div id="particles-js" layout-fill></div>
        `,
        link: linkFunc,
        controller: ParticlesController,
        controllerAs: 'vm'
    };

}

function linkFunc(scope: IParticlesScope, el: JQuery, attr: any, vm: ParticlesController) {

}

declare var particlesJS: any;

/** @ngInject */
export class ParticlesController {

    constructor(
        public $log: angular.ILogService
    ) {
        // $log.debug('Loaded ParticlesController...');

        particlesJS.load('particles-js', 'assets/json/particles/particles.json', function () {
            // $log.debug('callback - particles.js config loaded');
        });


    }

}
