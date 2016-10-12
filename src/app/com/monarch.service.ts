
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
    instance_uid: string;
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

export interface IUser {
    name: string;
    uid: string;
    image: string;
    activity_suite: IActivitySuite;
    activity_instances: Array<IActivityInstance>;
}

declare var KeenAsync: any;
declare var Keen: any;

declare var later: any;

export class MonarchService {

    public ActivitySuite: IActivitySuite;

    public keen_async_client: any;

    public activity_instances: any;


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
        private keen_read_key: string,
        private $firebaseObject: any
    ) {



        this.ActivitySuite = {
            activity_specs: [
                {
                    "cron_expression": null,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Name",
                        "priority": 2,
                        "md_theme": "alt",
                        "icon": "feedback",
                        "component": ComponentTypes.text_input_v0
                    },
                    "schema_config": {
                        "uid": '0',
                        "title": "What is your full name?",
                        "name": "user_name",
                        "type": "string"
                    }
                },
                {
                    "cron_expression": null,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Date",
                        "priority": 2,
                        "md_theme": "alt",
                        "icon": "feedback",
                        "component": ComponentTypes.text_input_v0
                    },
                    "schema_config": {
                        "uid": '0',
                        "title": "What is your date of birth?",
                        "name": "birthDate",
                        "type": "string"
                    }
                },
                {
                    "cron_expression": null,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Country",
                        "priority": 2,
                        "md_theme": "alt",
                        "icon": "feedback",
                        "component": ComponentTypes.text_input_v0
                    },
                    "schema_config": {
                        "uid": '0',
                        "title": "What is your country of origin?",
                        "name": "originCountry",
                        "type": "string"
                    }
                },
                {
                    "cron_expression": null,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Have Ids?",
                        "priority": 2,
                        "md_theme": "alt",
                        "icon": "feedback",
                        "component": ComponentTypes.boolean_input_v0
                    },
                    "schema_config": {
                        "uid": '0',
                        "title": "Do you have any identifying documents?",
                        "name": "isInPossesionOfExistingIds",
                        "type": "string"
                    }
                },
                {
                    "cron_expression": null,
                    "expiration_criteria": "NEVER",
                    "render_config": {
                        "label": "Are you in need of medical assistance?",
                        "priority": 1,
                        "md_theme": "alt",
                        "icon": "healing",
                        "component": ComponentTypes.boolean_input_v0
                    },
                    "schema_config": {
                        "uid": '1',
                        "title": "Are you in need of medical assistance?",
                        "name": "isInNeedOfMedicalAssistance",
                        "type": "boolean"
                    }
                },
                // {
                //     "cron_expression": cron_expr,
                //     "expiration_criteria": "NEVER",
                //     "render_config": {
                //         "label": "Rate this video",
                //         "priority": 3,
                //         "md_theme": "alt",
                //         "icon": "ondemand_video",
                //         "component": ComponentTypes.content_view_v0
                //     },
                //     "schema_config": {
                //         "uid": '2',
                //         "title": "Meditation Excercise",
                //         "video_url": "http://www.youtube.com/embed/NlOF03DUoWc",
                //         "name": "has_read_content_view",
                //         "type": "boolean"
                //     }
                // },
            ]
        };

        this.waitForKeen();


    }

    // public syncActivityInstances = (user) => {
    //     var ref = this.$rootScope.App.firebase.database().ref('/accounts/' + user.uid + '/activity_instances');

    //     var syncObject = this.$firebaseObject(ref);

    //     syncObject.$bindTo(this.$rootScope, "App.MonarchService.activity_instances");
    // }


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

    public isSpecInInstances = (spec: IActivitySpec, activity_instances: any) => {

        var flag = false;

        activity_instances.forEach((instance: IActivityInstance) => {

            // this.$log.debug('is spec in instance ', spec.schema_config.uid === instance.activity_spec.schema_config.uid);

            if (spec.schema_config.uid === instance.activity_spec.schema_config.uid) {
                flag = true;
            }

        });

        return flag;
    }

    // public getNextInstance = (user: IUser): IActivityInstance => {

    //     var highest_priority_activity: IActivityInstance = null;

    //     user.activity_instances.forEach((inst: IActivityInstance) => {

    //         if (!highest_priority_activity) {
    //             highest_priority_activity = inst;
    //         } else {

    //             if (highest_priority_activity.activity_spec.render_config.priority < inst.activity_spec.render_config.priority) {
    //                 highest_priority_activity = inst;
    //             }
    //         }

    //     });

    //     return highest_priority_activity;

    // }

    // public loadIpfsImage = () => {
    //     this.$rootScope.App.IpfsService.ipfs.cat('QmRcm8yiCYmQ1jDxhUVtsjvps4XjtjSTziVSdQsszuiRfw')
    //         .then((cat) => {
    //             this.$log.debug('cat: ', cat.url)

    //             var tag: any = document.getElementById('ipfs_image_tag');

    //             tag.src = cat.url;

    //             this.$rootScope.$apply();
    //             // document.getElementById("test-image").innerHTML += '<img style="width: 75%; padding-left: 30px;" src="' + cat.url + '">';
    //         })
    //         .catch((err) => {
    //             this.$log.debug('Fail: ', err)
    //         })
    // }

    public schedule = (account: IUser) => {

        // this.$log.debug(' push all specs...  ', account.activity_suite.activity_specs)

        account.activity_suite.activity_specs.forEach((activity_spec: IActivitySpec) => {


            var account_ref = this.$rootScope.App.firebase.database()
                .ref('accounts/' + account.uid);

            // Get a key for a new Post.
            var new_act_inst_key = account_ref.child('activity_instances').push().key;

            var new_instance = angular.copy({
                instance_uid: new_act_inst_key,
                account_uid: account.uid,
                activity_spec: angular.copy(activity_spec),
                capture: {
                    value: null,
                    created: new Date()
                },
                status: ActivityInstanceStatus.Incomplete
            });

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};

            updates['/activity_instances/' + new_act_inst_key] = new_instance;

            account_ref.update(updates);

            // this.$rootScope.App.firebase.database().ref('accounts/' + account.uid + '/activity_instances').push(new_instance);

        })

    }

    public captureInstance = (instance: IActivityInstance) => {

        this.$log.debug('capturing instance: ', instance);

        var user = this.$rootScope.App.UserService.user;

        var account_ref = this.$rootScope.App.firebase.database()
            .ref('accounts/' + user.uid);

        // Get a key for a new Post.
        var new_key = account_ref.child('activity_instance_captures').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};

        updates['/activity_instance_captures/' + new_key] = instance;

        account_ref.update(updates);

        this.$rootScope.App.MonarchService.keen_async_client.recordEvent('activity_instance_captures', instance);

        //remove the instance
        account_ref.child('activity_instances/' + instance.instance_uid).remove();
        // delete this.$rootScope.App.UserService.account.activity_instances[instance.instance_uid]

    }

    // public scheduleActivities = () => {

    //     // this.$log.debug('schedule activities for ', user.name);

    //     this.schedule();

    //     var s = later.parse.text('every 60 seconds');

    //     later.schedule(s).next(10);

    //     later.setInterval(() => {
    //         this.schedule();
    //     }, s);

    // }

}