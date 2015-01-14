var express = require('express');

var dummyDocs = [
	{
		"url" :"https://docs.google.com/presentation/d/1HqLpL1lkOrtoxEIFRwu7UbCEUfUvalSEP7GnT5MKvLc/embed?start=false&loop=true&delayms=60000",
		"name":"requirement"
	},
	{
		"url" :"https://docs.google.com/spreadsheets/d/1rFUSxn6kGnBhm7CYHeT8bqf5NxwdwmQy_s8QQ1I3HdA/pubhtml?widget=true&amp;headers=false",
		"name":"hourlog"
	},
	{
		"url" :"https://docs.google.com/spreadsheets/d/1KuzTYVn-pc9PzI387Q7HpbkZGvJ0xfwxq82LzMGt5S0/pubhtml?widget=true&amp;headers=false",
		"name":"dummy spreadsheet"
	}
];

/*

    DUMMY PIVOTAL API DATA BEGIN

 */

var dummyPivotalProject = {
    "id": 1165184,
    "kind": "project",
    "name": "Project Oracle",
    "version": 88,
    "iteration_length": 1,
    "week_start_day": "Monday",
    "point_scale": "0,1,2,3",
    "point_scale_is_custom": false,
    "bugs_and_chores_are_estimatable": false,
    "automatic_planning": true,
    "enable_tasks": true,
    "time_zone": {
        "kind": "time_zone",
        "olson_name": "Europe/Helsinki",
        "offset": "+03:00"
    },
    "velocity_averaged_over": 3,
    "number_of_done_iterations_to_show": 12,
    "has_google_domain": false,
    "enable_incoming_emails": true,
    "initial_velocity": 18,
    "public": false,
    "atom_enabled": false,
    "start_date": "2014-09-15",
    "start_time": "2014-09-14T21:00:00Z",
    "created_at": "2014-09-12T07:50:29Z",
    "updated_at": "2014-10-13T21:05:08Z",
    "account_id": 262513,
    "current_iteration_number": 5,
    "enable_following": true
};

// GET https://www.pivotaltracker.com/services/v5/projects/1165184/stories?with_state=unscheduled
var dummyPivotalUnscheduledStories =
    [
        {
            "kind": "story",
            "id": 78984214,
            "created_at": "2014-09-17T06:49:40Z",
            "updated_at": "2014-09-17T06:57:22Z",
            "estimate": 2,
            "story_type": "feature",
            "name": "Session control",
            "current_state": "unscheduled",
            "requested_by_id": 1439084,
            "project_id": 1165184,
            "url": "https://www.pivotaltracker.com/story/show/78984214",
            "owner_ids": [],
            "labels": []
        },
        {
            "kind": "story",
            "id": 78984128,
            "created_at": "2014-09-17T06:45:59Z",
            "updated_at": "2014-09-17T06:53:19Z",
            "estimate": 1,
            "story_type": "feature",
            "name": "Settings page",
            "current_state": "unscheduled",
            "requested_by_id": 1439084,
            "project_id": 1165184,
            "url": "https://www.pivotaltracker.com/story/show/78984128",
            "owner_ids": [],
            "labels": []
        },
        {
            "kind": "story",
            "id": 78983996,
            "created_at": "2014-09-17T06:41:22Z",
            "updated_at": "2014-09-17T06:48:44Z",
            "estimate": 2,
            "story_type": "feature",
            "name": "Dashboard page",
            "current_state": "unscheduled",
            "requested_by_id": 1439084,
            "project_id": 1165184,
            "url": "https://www.pivotaltracker.com/story/show/78983996",
            "owner_ids": [],
            "labels": []
        },
        {
            "kind": "story",
            "id": 78983986,
            "created_at": "2014-09-17T06:40:56Z",
            "updated_at": "2014-09-17T06:57:47Z",
            "estimate": 2,
            "story_type": "feature",
            "name": "Login page",
            "current_state": "unscheduled",
            "requested_by_id": 1439084,
            "project_id": 1165184,
            "description": "Loginpagedsdsds",
            "url": "https://www.pivotaltracker.com/story/show/78983986",
            "owner_ids": [],
            "labels": []
        },
        {
            "kind": "story",
            "id": 78983958,
            "created_at": "2014-09-17T06:39:06Z",
            "updated_at": "2014-09-17T06:39:06Z",
            "story_type": "feature",
            "name": "Back-end API implementation",
            "current_state": "unscheduled",
            "requested_by_id": 1439084,
            "project_id": 1165184,
            "url": "https://www.pivotaltracker.com/story/show/78983958",
            "owner_ids": [],
            "labels": []
        },
        {
            "kind": "story",
            "id": 78799152,
            "created_at": "2014-09-15T07:39:54Z",
            "updated_at": "2014-09-15T18:09:35Z",
            "estimate": 1,
            "story_type": "feature",
            "name": "Back-end API design",
            "description": "The API to use to provide information from back-end to front-end",
            "current_state": "unscheduled",
            "requested_by_id": 1439084,
            "project_id": 1165184,
            "url": "https://www.pivotaltracker.com/story/show/78799152",
            "owner_ids": [],
            "labels": []
        }
    ];

var dummyPivotalUnscheduledStories2 =
        [
            {
                "kind": "story",
                "id": 81177878,
                "created_at": "2014-10-22T10:16:40Z",
                "updated_at": "2014-10-22T10:16:40Z",
                "story_type": "feature",
                "name": "Pivotal tracker API implementation",
                "current_state": "unscheduled",
                "requested_by_id": 1439084,
                "project_id": 1165184,
                "description": "Pivotaaalllasdsdsds",
                "url": "https://www.pivotaltracker.com/story/show/81177878",
                "owner_ids": [],
                "labels": []
            },
            {
                "kind": "story",
                "id": 81177868,
                "created_at": "2014-10-22T10:16:07Z",
                "updated_at": "2014-10-22T10:16:08Z",
                "story_type": "feature",
                "name": "Flowdock API implementation",
                "current_state": "unscheduled",
                "requested_by_id": 1439084,
                "project_id": 1165184,
                "url": "https://www.pivotaltracker.com/story/show/81177868",
                "owner_ids": [],
                "labels": []
            },
            {
                "kind": "story",
                "id": 78984214,
                "created_at": "2014-09-17T06:49:40Z",
                "updated_at": "2014-09-17T06:57:22Z",
                "estimate": 2,
                "story_type": "feature",
                "name": "Session control",
                "current_state": "unscheduled",
                "requested_by_id": 1439084,
                "project_id": 1165184,
                "url": "https://www.pivotaltracker.com/story/show/78984214",
                "owner_ids": [],
                "labels": []
            },
            {
                "kind": "story",
                "id": 78984128,
                "created_at": "2014-09-17T06:45:59Z",
                "updated_at": "2014-09-17T06:53:19Z",
                "estimate": 1,
                "story_type": "feature",
                "name": "Settings page",
                "current_state": "unscheduled",
                "requested_by_id": 1439084,
                "project_id": 1165184,
                "url": "https://www.pivotaltracker.com/story/show/78984128",
                "owner_ids": [],
                "labels": []
            },
            {
                "kind": "story",
                "id": 78983986,
                "created_at": "2014-09-17T06:40:56Z",
                "updated_at": "2014-09-17T06:57:47Z",
                "estimate": 2,
                "story_type": "feature",
                "name": "Login page",
                "current_state": "unscheduled",
                "description": "Loginpagedsdsds",
                "requested_by_id": 1439084,
                "project_id": 1165184,
                "url": "https://www.pivotaltracker.com/story/show/78983986",
                "owner_ids": [],
                "labels": []
            }
        ]
    ;

// GET https://www.pivotaltracker.com/services/v5/projects/1165184/iterations?scope=current
var dummyPivotalCurrentIterations =
    [
        {
            "kind": "iteration",
            "number": 5,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [
                {
                    "kind": "story",
                    "id": 78798354,
                    "project_id": 1165184,
                    "name": "Flowdock study",
                    "description": "Getting familiar with pivotal tracker",
                    "story_type": "feature",
                    "current_state": "started",
                    "estimate": 0,
                    "requested_by_id": 1439084,
                    "owned_by_id": 1439080,
                    "owner_ids": [
                        1439080
                    ],
                    "labels": [],
                    "created_at": "2014-09-15T07:23:49Z",
                    "updated_at": "2014-09-30T18:17:41Z",
                    "url": "https://www.pivotaltracker.com/story/show/78798354"
                },
                {
                    "kind": "story",
                    "id": 78983656,
                    "project_id": 1165184,
                    "name": "Google authentication",
                    "story_type": "feature",
                    "current_state": "finished",
                    "estimate": 2,
                    "requested_by_id": 1439084,
                    "owned_by_id": 1439074,
                    "owner_ids": [
                        1439074
                    ],
                    "labels": [],
                    "created_at": "2014-09-17T06:27:20Z",
                    "updated_at": "2014-10-12T18:04:59Z",
                    "url": "https://www.pivotaltracker.com/story/show/78983656"
                },
                {
                    "kind": "story",
                    "id": 78798394,
                    "project_id": 1165184,
                    "name": "Back-end authentication study",
                    "description": "Studying on how to implement the back-end authentication",
                    "story_type": "feature",
                    "current_state": "started",
                    "estimate": 1,
                    "requested_by_id": 1439084,
                    "owner_ids": [
                        1439080
                    ],
                    "labels": [],
                    "created_at": "2014-09-15T07:24:54Z",
                    "updated_at": "2014-10-06T07:15:27Z",
                    "url": "https://www.pivotaltracker.com/story/show/78798394"
                }
            ],
            "start": "2014-10-12T21:00:00Z",
            "finish": "2014-10-19T21:00:00Z"
        }
    ];

var dummyPivotalCurrentIterations2 =
        [
            {
                "kind": "iteration",
                "number": 7,
                "project_id": 1165184,
                "team_strength": 1,
                "stories": [
                    {
                        "kind": "story",
                        "id": 78798336,
                        "project_id": 1165184,
                        "name": "Pivotal tracker study",
                        "description": "Getting familiarized with pivotal tracker",
                        "story_type": "feature",
                        "current_state": "accepted",
                        "estimate": 0,
                        "accepted_at": "2014-10-27T11:33:15Z",
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439072,
                        "owner_ids": [
                            1439072
                        ],
                        "labels": [],
                        "created_at": "2014-09-15T07:23:22Z",
                        "updated_at": "2014-10-27T11:33:14Z",
                        "url": "https://www.pivotaltracker.com/story/show/78798336"
                    },
                    {
                        "kind": "story",
                        "id": 81177396,
                        "project_id": 1165184,
                        "name": "Pivotal tracker API design",
                        "story_type": "feature",
                        "current_state": "accepted",
                        "estimate": 3,
                        "accepted_at": "2014-10-27T11:33:33Z",
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439072,
                        "owner_ids": [
                            1439072
                        ],
                        "labels": [],
                        "created_at": "2014-10-22T10:06:24Z",
                        "updated_at": "2014-10-27T11:33:31Z",
                        "url": "https://www.pivotaltracker.com/story/show/81177396"
                    },
                    {
                        "kind": "story",
                        "id": 81179248,
                        "project_id": 1165184,
                        "name": "Google spreadsheets view",
                        "story_type": "feature",
                        "current_state": "accepted",
                        "estimate": 1,
                        "accepted_at": "2014-10-27T11:33:46Z",
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439072,
                        "owner_ids": [
                            1439072
                        ],
                        "labels": [],
                        "created_at": "2014-10-22T10:46:17Z",
                        "updated_at": "2014-10-27T11:33:45Z",
                        "url": "https://www.pivotaltracker.com/story/show/81179248"
                    },
                    {
                        "kind": "story",
                        "id": 78798696,
                        "project_id": 1165184,
                        "name": "Flowdock authorization",
                        "story_type": "feature",
                        "current_state": "started",
                        "estimate": 1,
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439084,
                        "owner_ids": [
                            1439084
                        ],
                        "labels": [],
                        "created_at": "2014-09-15T07:31:12Z",
                        "updated_at": "2014-10-24T11:54:38Z",
                        "url": "https://www.pivotaltracker.com/story/show/78798696"
                    },
                    {
                        "kind": "story",
                        "id": 78798684,
                        "project_id": 1165184,
                        "name": "Pivotal tracker authorization",
                        "story_type": "feature",
                        "current_state": "started",
                        "estimate": 2,
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439080,
                        "owner_ids": [
                            1439080
                        ],
                        "labels": [],
                        "created_at": "2014-09-15T07:30:58Z",
                        "updated_at": "2014-10-24T11:58:06Z",
                        "url": "https://www.pivotaltracker.com/story/show/78798684"
                    },
                    {
                        "kind": "story",
                        "id": 81364326,
                        "project_id": 1165184,
                        "name": "Database scheme",
                        "story_type": "feature",
                        "current_state": "started",
                        "estimate": 1,
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439074,
                        "owner_ids": [
                            1439074
                        ],
                        "labels": [],
                        "created_at": "2014-10-24T11:55:59Z",
                        "updated_at": "2014-10-24T11:57:45Z",
                        "url": "https://www.pivotaltracker.com/story/show/81364326"
                    },
                    {
                        "kind": "story",
                        "id": 81371066,
                        "project_id": 1165184,
                        "name": "Automated testing setup",
                        "story_type": "feature",
                        "current_state": "started",
                        "estimate": 0,
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439084,
                        "owner_ids": [
                            1439084
                        ],
                        "labels": [],
                        "created_at": "2014-10-24T13:58:03Z",
                        "updated_at": "2014-10-24T13:58:10Z",
                        "url": "https://www.pivotaltracker.com/story/show/81371066"
                    },
                    {
                        "kind": "story",
                        "id": 78798752,
                        "project_id": 1165184,
                        "name": "Basic website and navigation",
                        "description": "First version of the app UI",
                        "story_type": "feature",
                        "current_state": "finished",
                        "estimate": 2,
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439072,
                        "owner_ids": [
                            1439072
                        ],
                        "labels": [],
                        "created_at": "2014-09-15T07:32:06Z",
                        "updated_at": "2014-10-27T09:32:24Z",
                        "url": "https://www.pivotaltracker.com/story/show/78798752"
                    }
                ],
                "start": "2014-10-26T22:00:00Z",
                "finish": "2014-11-02T22:00:00Z"
            }
        ]
    ;

// GET https://www.pivotaltracker.com/services/v5/projects/1165184/iterations?scope=backlog
var dummyPivotalBacklogIterations =
    [
        {
            "kind": "iteration",
            "number": 6,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [],
            "start": "2014-10-19T21:00:00Z",
            "finish": "2014-10-26T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 7,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [
                {
                    "kind": "story",
                    "id": 78798752,
                    "project_id": 1165184,
                    "name": "Basic website and navigation",
                    "description": "First version of the app UI",
                    "story_type": "feature",
                    "current_state": "unstarted",
                    "estimate": 2,
                    "requested_by_id": 1439084,
                    "owned_by_id": 1439072,
                    "owner_ids": [
                        1439072
                    ],
                    "labels": [],
                    "created_at": "2014-09-15T07:32:06Z",
                    "updated_at": "2014-10-12T18:11:29Z",
                    "url": "https://www.pivotaltracker.com/story/show/78798752"
                }
            ],
            "start": "2014-10-26T22:00:00Z",
            "finish": "2014-11-02T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 8,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [],
            "start": "2014-11-02T22:00:00Z",
            "finish": "2014-11-09T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 9,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [
                {
                    "kind": "story",
                    "id": 80518830,
                    "project_id": 1165184,
                    "name": "Database connectivity",
                    "story_type": "feature",
                    "current_state": "unstarted",
                    "estimate": 2,
                    "requested_by_id": 1439084,
                    "owned_by_id": 1439074,
                    "owner_ids": [
                        1439074
                    ],
                    "labels": [],
                    "created_at": "2014-10-12T18:06:24Z",
                    "updated_at": "2014-10-12T18:08:20Z",
                    "url": "https://www.pivotaltracker.com/story/show/80518830"
                },
                {
                    "kind": "story",
                    "id": 78798336,
                    "project_id": 1165184,
                    "name": "Pivotal tracker study",
                    "description": "Getting familiarized with pivotal tracker",
                    "story_type": "feature",
                    "current_state": "unstarted",
                    "estimate": 0,
                    "requested_by_id": 1439084,
                    "owner_ids": [],
                    "labels": [],
                    "created_at": "2014-09-15T07:23:22Z",
                    "updated_at": "2014-09-22T07:25:13Z",
                    "url": "https://www.pivotaltracker.com/story/show/78798336"
                }
            ],
            "start": "2014-11-09T22:00:00Z",
            "finish": "2014-11-16T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 10,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [],
            "start": "2014-11-16T22:00:00Z",
            "finish": "2014-11-23T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 11,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [
                {
                    "kind": "story",
                    "id": 78798696,
                    "project_id": 1165184,
                    "name": "Flowdock authentication",
                    "story_type": "feature",
                    "current_state": "unstarted",
                    "estimate": 2,
                    "requested_by_id": 1439084,
                    "owner_ids": [],
                    "labels": [],
                    "created_at": "2014-09-15T07:31:12Z",
                    "updated_at": "2014-09-17T06:30:45Z",
                    "url": "https://www.pivotaltracker.com/story/show/78798696"
                }
            ],
            "start": "2014-11-23T22:00:00Z",
            "finish": "2014-11-30T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 12,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [],
            "start": "2014-11-30T22:00:00Z",
            "finish": "2014-12-07T22:00:00Z"
        },
        {
            "kind": "iteration",
            "number": 13,
            "project_id": 1165184,
            "team_strength": 1,
            "stories": [
                {
                    "kind": "story",
                    "id": 78798684,
                    "project_id": 1165184,
                    "name": "Pivotal tracker authentication",
                    "story_type": "feature",
                    "current_state": "unstarted",
                    "estimate": 2,
                    "requested_by_id": 1439084,
                    "owner_ids": [],
                    "labels": [],
                    "created_at": "2014-09-15T07:30:58Z",
                    "updated_at": "2014-09-17T06:30:54Z",
                    "url": "https://www.pivotaltracker.com/story/show/78798684"
                }
            ],
            "start": "2014-12-07T22:00:00Z",
            "finish": "2014-12-14T22:00:00Z"
        }
    ];

var dummyPivotalBacklogIterations2 =
        [
            {
                "kind": "iteration",
                "number": 8,
                "project_id": 1165184,
                "team_strength": 1,
                "stories": [
                    {
                        "kind": "story",
                        "id": 81179256,
                        "project_id": 1165184,
                        "name": "Pivotal tracker dashboard view",
                        "story_type": "feature",
                        "current_state": "unstarted",
                        "description": "Pivotaldashboardasdsdsds",
                        "requested_by_id": 1439084,
                        "owned_by_id": 1439078,
                        "owner_ids": [
                            1439078
                        ],
                        "labels": [],
                        "created_at": "2014-10-22T10:46:34Z",
                        "updated_at": "2014-10-22T10:46:56Z",
                        "url": "https://www.pivotaltracker.com/story/show/81179256"
                    },
                    {
                        "kind": "story",
                        "id": 81177370,
                        "project_id": 1165184,
                        "name": "Flowdock API design",
                        "story_type": "feature",
                        "current_state": "unstarted",
                        "requested_by_id": 1439084,
                        "owner_ids": [],
                        "labels": [],
                        "created_at": "2014-10-22T10:05:57Z",
                        "updated_at": "2014-10-24T11:56:51Z",
                        "url": "https://www.pivotaltracker.com/story/show/81177370"
                    },
                    {
                        "kind": "story",
                        "id": 78983996,
                        "project_id": 1165184,
                        "name": "Dashboard page",
                        "story_type": "feature",
                        "current_state": "unstarted",
                        "estimate": 2,
                        "description": "Dashboardasdsdsds",
                        "requested_by_id": 1439084,
                        "owner_ids": [],
                        "labels": [],
                        "created_at": "2014-09-17T06:41:22Z",
                        "updated_at": "2014-10-24T11:57:02Z",
                        "url": "https://www.pivotaltracker.com/story/show/78983996"
                    }
                ],
                "start": "2014-11-02T22:00:00Z",
                "finish": "2014-11-09T22:00:00Z"
            }
        ]
    ;

// GET https://www.pivotaltracker.com/services/v5/projects/1165184/memberships/
var dummyPivotalMemberships =
    [
        {
            "kind": "project_membership",
            "id": 4647614,
            "person": {
                "kind": "person",
                "id": 522449,
                "name": "Ilkka Laukkanen",
                "email": "ilkka.laukkanen@futurice.com",
                "initials": "IL",
                "username": "FutuIlkka"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "8100ea",
            "last_viewed_at": "2014-09-29T07:46:00Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647618,
            "person": {
                "kind": "person",
                "id": 1005643,
                "name": "Miro Nieminen",
                "email": "miro.nieminen@futurice.com",
                "initials": "MN",
                "username": "mnie"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "155f8b",
            "last_viewed_at": "2014-09-12T07:53:19Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647620,
            "person": {
                "kind": "person",
                "id": 1439072,
                "name": "Atte Perämäki",
                "email": "atte.90@gmail.com",
                "initials": "AP",
                "username": "attep"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "818182",
            "last_viewed_at": "2014-10-08T06:35:19Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647622,
            "person": {
                "kind": "person",
                "id": 1439074,
                "name": "Eliisa Väkevä",
                "email": "eliisa.vakeva@gmail.com",
                "initials": "EV",
                "username": "eliisav"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "ac3f65",
            "last_viewed_at": "2014-10-06T07:15:56Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647628,
            "person": {
                "kind": "person",
                "id": 1439076,
                "name": "Jingui Liee",
                "email": "jingui.liee@gmail.com",
                "initials": "JL",
                "username": "jinguil"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "555555",
            "last_viewed_at": "2014-10-14T10:04:51Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647630,
            "person": {
                "kind": "person",
                "id": 1439078,
                "name": "Joona Laamanen",
                "email": "joona.laamanen@gmail.com",
                "initials": "JL",
                "username": "joonal"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "555555",
            "last_viewed_at": "2014-10-15T10:15:41Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647632,
            "person": {
                "kind": "person",
                "id": 1439080,
                "name": "Jouni Mikkola",
                "email": "jouni.mikkola@student.tut.fi",
                "initials": "JM",
                "username": "jounimikkola"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "ac3f65",
            "last_viewed_at": "2014-10-06T07:13:48Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        },
        {
            "kind": "project_membership",
            "id": 4647636,
            "person": {
                "kind": "person",
                "id": 1439084,
                "name": "Sampo Tolvanen",
                "email": "sampo.tolvanen@gmail.com",
                "initials": "ST",
                "username": "sampotolvanen"
            },
            "project_id": 1165184,
            "role": "owner",
            "project_color": "d82b00",
            "last_viewed_at": "2014-10-12T18:04:00Z",
            "wants_comment_notification_emails": true,
            "will_receive_mention_notifications_or_emails": true
        }
    ];

var dummyPivotalMemberships2 =
        [
            {
                "kind": "project_membership",
                "id": 4647614,
                "person": {
                    "kind": "person",
                    "id": 522449,
                    "name": "Ilkka Laukkanen",
                    "email": "ilkka.laukkanen@futurice.com",
                    "initials": "IL",
                    "username": "FutuIlkka"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "8100ea",
                "last_viewed_at": "2014-09-29T07:46:00Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647618,
                "person": {
                    "kind": "person",
                    "id": 1005643,
                    "name": "Miro Nieminen",
                    "email": "miro.nieminen@futurice.com",
                    "initials": "MN",
                    "username": "mnie"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "155f8b",
                "last_viewed_at": "2014-10-27T09:57:54Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647620,
                "person": {
                    "kind": "person",
                    "id": 1439072,
                    "name": "Atte Perämäki",
                    "email": "atte.90@gmail.com",
                    "initials": "AP",
                    "username": "attep"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "818182",
                "last_viewed_at": "2014-10-27T14:14:23Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647622,
                "person": {
                    "kind": "person",
                    "id": 1439074,
                    "name": "Eliisa Väkevä",
                    "email": "eliisa.vakeva@gmail.com",
                    "initials": "EV",
                    "username": "eliisav"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "ac3f65",
                "last_viewed_at": "2014-10-06T07:15:56Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647628,
                "person": {
                    "kind": "person",
                    "id": 1439076,
                    "name": "Jingui Liee",
                    "email": "jingui.liee@gmail.com",
                    "initials": "JL",
                    "username": "jinguil"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "555555",
                "last_viewed_at": "2014-10-14T10:04:51Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647630,
                "person": {
                    "kind": "person",
                    "id": 1439078,
                    "name": "Joona Laamanen",
                    "email": "joona.laamanen@gmail.com",
                    "initials": "JL",
                    "username": "joonal"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "555555",
                "last_viewed_at": "2014-10-15T10:15:41Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647632,
                "person": {
                    "kind": "person",
                    "id": 1439080,
                    "name": "Jouni Mikkola",
                    "email": "jouni.mikkola@student.tut.fi",
                    "initials": "JM",
                    "username": "jounimikkola"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "ac3f65",
                "last_viewed_at": "2014-10-23T09:52:42Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            },
            {
                "kind": "project_membership",
                "id": 4647636,
                "person": {
                    "kind": "person",
                    "id": 1439084,
                    "name": "Sampo Tolvanen",
                    "email": "sampo.tolvanen@gmail.com",
                    "initials": "ST",
                    "username": "sampotolvanen"
                },
                "project_id": 1165184,
                "role": "owner",
                "project_color": "d82b00",
                "last_viewed_at": "2014-10-27T10:37:16Z",
                "wants_comment_notification_emails": true,
                "will_receive_mention_notifications_or_emails": true
            }
        ]
    ;

/*

 DUMMY PIVOTAL API DATA END

 */

module.exports = (function () {

    var router = express.Router();

	router.get('/applications', function(req, res) {
		res.send(["flowdock", "pivotal"]);
	});
	
    router.get('/projects', function (req, res) {
        res.send([{id: '1', name: 'test1'}, {id: '2', name: 'test2'}]);
    });

    router.get('/projects/:projectId/applications', function (req, res) {
        res.send([{id: "flowdock"},
            {id: "pivotal"},
            {id: "googledocs"}]);
    });

    router.get('/projects/:projectId/docs', function (req, res) {
        res.json(dummyDocs);
    });

    router.get('/projects/:projectId/pivotal', function(req, res) {
        res.json(dummyPivotalProject);
    });

    router.get('/projects/:projectId/pivotal/memberships', function(req, res) {
        res.json(dummyPivotalMemberships2);
    });

    router.get('/projects/:projectId/pivotal/stories', function(req, res, next) {
		if (req.query.with_state == 'unscheduled') {
			res.json(dummyPivotalUnscheduledStories2);
		} else {
			next();
		}
    });

    router.get('/projects/:projectId/pivotal/iterations/', function(req, res, next) {
		if (req.query.scope == 'current') {
			res.json(dummyPivotalCurrentIterations2);
		} else if (req.query.scope == 'backlog') {
			res.json(dummyPivotalBacklogIterations2);
		} else {
			next();
		}
    });

    router.get('/accounts', function(req, res) {
        res.json(['pivotal', 'flowdock']);
    });

    router.post('/auth/pivotal', function(req, res) {
        var token = req.body.trackerToken;
        if (token == '1337') {
            res.status(500).send('invalid API token');
        } else {
            res.status(200).send('ok');
        }
    });

    router.delete('/accounts/:appId', function(req, res) {
        if (req.params.appId == 'pivotal' || req.params.appId == 'flowdock') {
            res.json('ok');
        } else {
            res.status(404).send('App "'+req.params.appId+'" not found');
        }

    });

    router.get('*', function (req, res) {
        res.status(404).send('Not Found');
    });

    return router;
}());