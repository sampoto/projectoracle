define({ "api": [
  {
    "description": "<p>Get whole Flowdock flow for project</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/flow'",
    "title": "",
    "name": "GetFlowData",
    "group": "FlowDock",
    "filename": "api/v1/index.js",
    "groupTitle": "FlowDock"
  },
  {
    "description": "<p>Get messages from project flow</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/flow/messages'",
    "title": "GetFlowMessages",
    "name": "GetFlowMessages",
    "group": "FlowDock",
    "filename": "api/v1/index.js",
    "groupTitle": "FlowDock"
  },
  {
    "description": "<p>Get users of project flow</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/flow/users'",
    "title": "GetFlowUsers",
    "name": "GetFlowUsers",
    "group": "FlowDock",
    "filename": "api/v1/index.js",
    "groupTitle": "FlowDock"
  },
  {
    "description": "<p>Get data from one Pivotal project</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/pivotal'",
    "title": "GetPivotalData",
    "name": "GetPivotalData",
    "group": "Pivotal_Tracker",
    "filename": "api/v1/index.js",
    "groupTitle": "Pivotal_Tracker"
  },
  {
    "description": "<p>Get all iterations</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/pivotal'",
    "title": "GetPivotalIterations",
    "name": "GetPivotalIterations",
    "group": "Pivotal_Tracker",
    "filename": "api/v1/index.js",
    "groupTitle": "Pivotal_Tracker"
  },
  {
    "description": "<p>Get all memberships</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/pivotal'",
    "title": "GetPivotalMemberships",
    "name": "GetPivotalMemberships",
    "group": "Pivotal_Tracker",
    "filename": "api/v1/index.js",
    "groupTitle": "Pivotal_Tracker"
  },
  {
    "description": "<p>Get all stories from project</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/pivotal/stories'",
    "title": "GetPivotalStories",
    "name": "GetPivotalStories",
    "group": "Pivotal_Tracker",
    "filename": "api/v1/index.js",
    "groupTitle": "Pivotal_Tracker"
  },
  {
    "description": "<p>Get one story by story id</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "storyId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/pivotal/stories/:storyId'",
    "title": "GetPivotalStory",
    "name": "GetPivotalStory",
    "group": "Pivotal_Tracker",
    "filename": "api/v1/index.js",
    "groupTitle": "Pivotal_Tracker"
  },
  {
    "description": "<p>Get all applications related to project id</p> ",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "projectId",
            "description": ""
          }
        ]
      }
    },
    "type": "get",
    "url": "/projects/:projectId/applications'",
    "title": "GetAllApplicationsFromProject",
    "name": "GetAllApplicationsFromProject",
    "group": "Projects",
    "filename": "api/v1/index.js",
    "groupTitle": "Projects"
  },
  {
    "description": "<p>Get all projects related to user</p> ",
    "version": "1.0.0",
    "type": "get",
    "url": "/projects",
    "title": "GetProjects",
    "name": "GetProjects",
    "group": "Projects",
    "filename": "api/v1/index.js",
    "groupTitle": "Projects"
  },
  {
    "description": "<p>Delete specified application from account</p> ",
    "name": "DeleteAccount",
    "group": "User_Account",
    "version": "1.0.0",
    "type": "delete",
    "url": "/accounts/:appId",
    "title": "DeleteAccount",
    "filename": "api/v1/index.js",
    "groupTitle": "User_Account"
  },
  {
    "description": "<p>Get all accounts, where user is authenticated to. Flowdoc, Pivotal Tracker ...</p> ",
    "version": "1.0.0",
    "type": "get",
    "url": "/accounts",
    "title": "GetAccounts",
    "name": "GetAccounts",
    "group": "User_Account",
    "filename": "api/v1/index.js",
    "groupTitle": "User_Account"
  }
] });