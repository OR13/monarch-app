
import {IRootScopeService} from '../index.run';

export enum ActivityInstanceStatus {
    Incomplete,
    Complete
}

export enum ComponentTypes {
    text_input_v0,
    boolean_input_v0,
    content_view_v0
}

export interface IActivityInstance {
    status: ActivityInstanceStatus;
    activity_spec: IActivitySpec; // The spec for this activity
    capture: any; // All data related to information supplied by clients related to this activity. (partial, intents, etc...)
}

export interface IRenderSchema {
    priority: number;
    icon: string;
    md_theme: string;
    component: ComponentTypes;
    label: string;
}

export interface ISchemaConfig {
    uid: string;
    title: string;
    name: string;
    type: string;

    video_url?: string;
}

export interface IActivitySpec {
    cron_expression: string; // When should this activity be offered to clients.
    expiration_criteria: string; // All data related to how long this activity should be 
    render_config: IRenderSchema; // All data related to how this activity should be rendered, and reported on by clients.
    schema_config: ISchemaConfig; // api, type configuration info
}

// Collection of Activity Specifications
export interface IActivitySuite {
    activity_specs: Array<IActivitySpec>;
}

export interface IPatient {
    name: string;
    image: string;
    activity_suite: IActivitySuite;
    activity_instances: Array<IActivityInstance>;
}

declare var KeenAsync: any;
declare var Keen: any;

declare var later: any;

export class MonarchService {

    public ActivitySuite: IActivitySuite;

    public patients: Array<IPatient>;
    public keen_async_client: any;


    /** @ngInject */
    constructor(
        private $timeout: angular.ITimeoutService,
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $rootScope: IRootScopeService,
        private keen_project_id: string,
        private keen_write_key: string,
        private keen_read_key: string
    ) {


        var cron_expr = '0/120 * * * *';

        this.ActivitySuite = {
            activity_specs: [
                {
                    "cron_expression": cron_expr,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Enter a word",
                        "priority": 2,
                        "md_theme": "dark-grey",
                        "icon": "feedback",
                        "component": ComponentTypes.text_input_v0
                    },
                    "schema_config": {
                        "uid": '0',
                        "title": "What word best describes your day?",
                        "name": "word",
                        "type": "string"
                    }
                },
                {
                    "cron_expression": cron_expr,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Feel well?",
                        "priority": 1,
                        "md_theme": "dark-grey",
                        "icon": "healing",
                        "component": ComponentTypes.boolean_input_v0
                    },
                    "schema_config": {
                        "uid": '1',
                        "title": "Do you feel well today?",
                        "name": "is_feeling_well",
                        "type": "boolean"
                    }
                },
                {
                    "cron_expression": cron_expr,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Rate this video",
                        "priority": 3,
                        "md_theme": "dark-grey",
                        "icon": "ondemand_video",
                        "component": ComponentTypes.content_view_v0
                    },
                    "schema_config": {
                        "uid": '2',
                        "title": "Meditation Excercise",
                        "video_url": "http://www.youtube.com/embed/NlOF03DUoWc",
                        "name": "has_read_content_view",
                        "type": "boolean"
                    }
                },
            ]
        };

        this.patients = [
            {
                name: 'Janet Perkins',
                image: '/assets/img/avatar.jpeg',
                activity_suite: this.ActivitySuite,
                activity_instances: []
            },
            // { name: 'Mary Johnson', img: '/assets/img/avatar.jpeg', newMessage: false },
            // { name: 'Peter Carlsson', img: '/assets/img/avatar.jpeg', newMessage: false }
        ]

        this.waitForKeen();
    }

    public waitForKeen = () => {
        this.$rootScope.$watch(() => {
            if (Keen) {
                return Keen;
            }

        }, (Keen) => {
            if (Keen) {
                this.initKeen();
            }
        })
    }

    public initKeen = () => {
        KeenAsync.ready(() => {

            var w: any = window;
            this.keen_async_client = w.keen_client;
        });

    }

    public isSpecInInstances = (spec: IActivitySpec, instances: Array<IActivityInstance>) => {

        var flag = false;

        instances.forEach((instance: IActivityInstance) => {

            // this.$log.debug('is spec in instance ', spec.schema_config.uid === instance.activity_spec.schema_config.uid);

            if (spec.schema_config.uid === instance.activity_spec.schema_config.uid) {
                flag = true;
            }

        });

        return flag;
    }

    public getNextInstance = (patient: IPatient): IActivityInstance => {

        var highest_priority_activity: IActivityInstance = null;

        patient.activity_instances.forEach((inst: IActivityInstance) => {

            if (!highest_priority_activity) {
                highest_priority_activity = inst;
            } else {

                if (highest_priority_activity.activity_spec.render_config.priority < inst.activity_spec.render_config.priority) {
                    highest_priority_activity = inst;
                }
            }

        });

        return highest_priority_activity;

    }

    public loadIpfsImage = () => {
        this.$rootScope.App.IpfsService.ipfs.cat('QmRcm8yiCYmQ1jDxhUVtsjvps4XjtjSTziVSdQsszuiRfw')
            .then((cat) => {
                this.$log.debug('cat: ', cat.url)

                var tag: any = document.getElementById('ipfs_image_tag');

                tag.src = cat.url;

                this.$rootScope.$apply();
                // document.getElementById("test-image").innerHTML += '<img style="width: 75%; padding-left: 30px;" src="' + cat.url + '">';
            })
            .catch((err) => {
                this.$log.debug('Fail: ', err)
            })
    }

    public schedule = () => {
        this.patients.forEach((patient: IPatient) => {
            // this.$log.debug('schedule activities for ', patient.name);

            // this.$log.debug('cron this activity spec ', activity_spec);

            // var s = later.parse.cron(activity_spec.cron_expression);

            patient.activity_suite.activity_specs.forEach((activity_spec: IActivitySpec) => {

                // this.$log.debug(' is this activity_spec in activity_instances ')

                var isSpecInInstances = this.isSpecInInstances(activity_spec, patient.activity_instances);

                // this.$log.debug('isSpecInInstances: ', isSpecInInstances);

                if (isSpecInInstances) {
                    // no op - the spec is already an instance
                    // this.$log.debug('YES')
                } else {
                    // this.$log.debug('NO')

                    var new_instance = angular.copy({
                        activity_spec: angular.copy(activity_spec),
                        capture: {},
                        status: ActivityInstanceStatus.Incomplete
                    });

                    patient.activity_instances.push(new_instance);

                    this.$log.debug('activity_instance added...', new_instance);
                    // this.$rootScope.$apply();
                }

            })

        })

        // this.$log.debug('activity_instances', this.patients[0].activity_instances.length);
    }

    public captureAll = (patient: IPatient, instance: IActivityInstance) => {

        this.$log.debug('patient snapshot: ', patient);
        this.$log.debug('instance snapshot: ', instance);

        this.capturePatientSnapshot(patient);
        this.captureInstanceSnapshot(instance);
    }

    public capturePatientSnapshot = (patient: IPatient) => {
        this.$log.debug('begin capturePatientSnapshot');
        this.$rootScope.App.MonarchService.keen_async_client.recordEvent('patient_snapshot', {
            patient: angular.copy(patient)
        });
    }

    public captureInstanceSnapshot = (instance: IActivityInstance) => {
        this.$log.debug('begin capturePatientSnapshot');
        this.$rootScope.App.MonarchService.keen_async_client.recordEvent('instant_snapshot', {
            instance: angular.copy(instance)
        });
    }

    public renderLast100PatientSnapshots = () => {

        var client = new Keen({
            projectId: this.keen_project_id,
            readKey: this.keen_read_key,
        });


        // Configure a Dataviz instance
        var chart = new Keen.Dataviz()
            .el('#chart_1')
            .colors(["#6ab975"])
            .height(180)
            .type('metric')
            .prepare();

        // Run a query
        client
            .query('count', {
                event_collection: "instant_snapshot",
                targetProperty: "instance.capture.value",
                timeframe: "this_14_days",
                timezone: "UTC"
            })
            .then(function (res) {
                // Handle the result
                chart
                    .data(res)
                    .render();
            })
            .catch(function (err) {
                // Handle errors
                chart.message(err.message);
            });
    }

    public renderPageViews = () => {

        var client = new Keen({
            projectId: this.keen_project_id,
            readKey: this.keen_read_key,
        });


        // Configure a Dataviz instance
        var chart = new Keen.Dataviz()
            .el('#chart_2')
            .colors(["#6ab975"])
            .height(180)
            .type('area')
            .prepare();

        // Run a query
        client
            .query('count', {
                event_collection: 'pageviews',
                interval: 'daily',
                timeframe: 'this_14_days'
            })
            .then(function (res) {
                // Handle the result
                chart
                    .data(res)
                    .render();
            })
            .catch(function (err) {
                // Handle errors
                chart.message(err.message);
            });
    }

    public scheduleActivities = () => {

        // this.$log.debug('schedule activities for ', patient.name);

        this.schedule();

        var s = later.parse.text('every 60 seconds');

        later.schedule(s).next(10);

        later.setInterval(() => {
            this.schedule();
        }, s);

    }

}