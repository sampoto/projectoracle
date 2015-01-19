// --------------------------
// --- Flowdoc ---
// ---------------
 
exports.name = function (req, res) {
  res.json(dummyUser);
};

exports.flows = function (req, res) {
    res.json(dummyFlows);
    
};

exports.header = function (req, res) {
    res.json(dummyHeader);
};

exports.flowById = function (req, res) {
    var index;
    for(var i = 0; i < dummyFlow.flows.length; ++i){
        if(dummyFlow.flows[i].id === req.params.id)
        {
            index = i;
            break;
        }
    }
    res.json(dummyFlow.flows[index]);
};
// List messages
// documentation: https://www.flowdock.com/api/messages
// Get: GET /flows/:organization/:flow/messages
exports.listMessages = function(req, res)
{
    res.json(dummyFlowMessages);
};
var flowWithId = function(element, index, array)
{
    if(element.id === ""){}
};
// Dummy User (flowdoc)
var dummyUser = 
{
    "id": 9,
    "email": "kimmo.koodaaja@codeslaves.com",
    "name": "Kimmo Koodaaja",
    "nick": "Kimmo",
    "avatar": "https://d2cxspbh1aoie1.cloudfront.net/avatars/f0b4520a6e0001636bf8fc1431af151c/",
    "status": "Status message",
    "disabled": false,
    "last_activity": 1366613085178,
    "last_ping": 1366616861547

};
// Dummy Flows
var dummyFlows =
[
  {
    "id": "deadbeefdeadbeef",
    "name": "My flow",
    "parameterized_name": "my-flow",
    "organization": {
      "id": 42,
      "name": "Example",
      "parameterized_name": "example",
      "user_limit": 0,
      "user_count": 10,
      "active": true,
      "url": "https://api.flowdock.com/organizations/example"
    },
    "unread_mentions": 0,
    "open": true,
    "joined": true,
    "url": "https://api.flowdock.com/flows/acme/my-flow",
    "web_url": "https://www.flowdock.com/app/acme/my-flow",
    "join_url": "https://www.flowdock.com/invitations/eedd2bf0643f75c14be9099272429351c7132a71-my-flow",
    "access_mode": "organization",
  },
  {
    "id": "05654aa3-3b13-4a79-8cea-92ed45bdc9a5",
    "name": "Another flow",
    "parameterized_name": "another-flow",
    "organization": {
      "id": 8,
      "name": "Acme",
      "parameterized_name": "acme",
      "user_limit": 0,
      "user_count": 5,
      "active": true,
      "url": "https://api.flowdock.com/organizations/acme"
    },
    "unread_mentions": 0,
    "open": true,
    "joined": true,
    "url": "https://api.flowdock.com/flows/acme/another-flow",
    "web_url": "https://www.flowdock.com/app/acme/another-flow",
    "access_mode": "invitation",
  },
  {
    "id": "deadbeefdeadbeef",
    "name": "A third flow",
    "parameterized_name": "my-flow",
    "organization": {
      "id": 42,
      "name": "Example",
      "parameterized_name": "example",
      "user_limit": 0,
      "user_count": 10,
      "active": true,
      "url": "https://api.flowdock.com/organizations/example"
    },
    "unread_mentions": 0,
    "open": true,
    "joined": true,
    "url": "https://api.flowdock.com/flows/acme/my-flow",
    "web_url": "https://www.flowdock.com/app/acme/my-flow",
    "join_url": "https://www.flowdock.com/invitations/eedd2bf0643f75c14be9099272429351c7132a71-my-flow",
    "access_mode": "organization",
  }
];

var dummyHeader = {
    "activeProject": 0,
    "projects": [
        {"name": "Red Wedding"},
        {"name": "Purple Funeral"},
        {"name": "Black Birthday"},
        {"name": "White Opening"}
    ]
};


// Get Flow by ID
// GET /flows/find?id=:id
var dummyFlow = {
    "flows": [ {   
  "id": "12345",
  "name": "Red Wedding",
  "parameterized_name": "red-wedding",
  "organization": {
    "id": 8,
    "name": "Acme",
    "parameterized_name": "acme",
    "user_limit": 0,
    "user_count": 5,
    "active": true,
    "url": "https://api.flowdock.com/organizations/acme"
  },
  "unread_mentions": 0,
  "open": true,
  "url": "https://api.flowdock.com/flows/acme/my-flow",
  "web_url": "https://www.flowdock.com/app/acme/my-flow",
  "join_url": "https://www.flowdock.com/invitations/eedd2bf0643f75c14be9099272429351c7132a71-my-flow",
  "access_mode": "link",
  "users": [
    {
      "id": 1,
      "nick": "Lord Walder",
      "name": "Lord Walder Frey",
      "email": "joe@example.com",
      "avatar": "https://dl.dropboxusercontent.com/u/65965007/walder.jpg",
      "status": "Testing API",
      "disabled": false,
      "last_activity": 1328016726423000,
      "last_ping": 1328017690004000
    },
    {
      "id": 2,
      "nick": "The Lion",
      "name": "Lord Tywin Lannister",
      "email": "stevie@example.com",
      "avatar": "https://dl.dropboxusercontent.com/u/65965007/tywin.jpg",
      "status": null,
      "disabled": false,
      "last_activity": 1328016712345000,
      "last_ping": 1328017612345050
    },
    {
      "id": 3,
      "nick": "King Jof",
      "name": "King Joffrey of houses Baratheon and Lannister",
      "email": "stevie@example.com",
      "avatar": "https://dl.dropboxusercontent.com/u/65965007/joffrey.gif",
      "status": null,
      "disabled": false,
      "last_activity": 1328016712345000,
      "last_ping": 1528017612345000
    },
    {
      "id": 4,
      "nick": "The Imp",
      "name": "Tyrion Lannister",
      "email": "stevie@example.com",
      "avatar": "https://dl.dropboxusercontent.com/u/65965007/tyrion.png",
      "status": null,
      "disabled": false,
      "last_activity": 1328016712345000,
      "last_ping": 1328017612345050
    }
  ]},
  {   
  "id": "00000",
  "name": "White Birthday",
  "parameterized_name": "red-wedding",
  "organization": {
    "id": 8,
    "name": "Acme",
    "parameterized_name": "acme",
    "user_limit": 0,
    "user_count": 5,
    "active": true,
    "url": "https://api.flowdock.com/organizations/acme"
  },
  "unread_mentions": 0,
  "open": true,
  "url": "https://api.flowdock.com/flows/acme/my-flow",
  "web_url": "https://www.flowdock.com/app/acme/my-flow",
  "join_url": "https://www.flowdock.com/invitations/eedd2bf0643f75c14be9099272429351c7132a71-my-flow",
  "access_mode": "link",
  "users": [
    {
      "id": 9,
      "nick": "Joe",
      "name": "Joe Smith",
      "email": "joe@example.com",
      "avatar": "https://d2cxspbh1aoie1.cloudfront.net/avatars/f5b8fb60c6116331da07c65b96a8a1d1/",
      "status": "Testing API",
      "disabled": false,
      "last_activity": 1328016726423000,
      "last_ping": 1328017690004000
    },
    {
      "id": 42,
      "nick": "Stevie",
      "name": "Stevie Johnson",
      "email": "stevie@example.com",
      "avatar": "https://d2cxspbh1aoie1.cloudfront.net/5bdd089a099acc56fc7120f6325a5d5c/",
      "status": null,
      "disabled": true,
      "last_activity": 1328016712345000,
      "last_ping": 1328017612345000
    }
  ]}
  
  
]

}
/*
var dummyFlowMessages = 
[
    {
        "user": "1",
        "content": "I heard there was problem with our API?",
        "event": "message",
        "tags": [
            ":thread"
        ],
        "id": 6076,
        "sent": 1412342975960,
        "edited": null,
        "attachments": [],
        "uuid": "uqdBtZklzWVTQqlJ",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "I heard there was problem with our API?",
            "text": "Yes, that was fixed, should be ok now.�"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6122,
        "sent": 1412343514879,
        "edited": null,
        "attachments": [],
        "uuid": "DS6irS1mtcMc06YU",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "I heard there was problem with our API",
            "text": "fixed here: http://github.com/foobar/barfoo"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6127,
        "sent": 1412343553446,
        "edited": 1412343559446,
        "attachments": [],
        "uuid": "MlQWg4cRQCID-tQL",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
        {
        "user": "3",
        "content": "LOL",
        "event": "message",
        "tags": [
            ":thread"
        ],
        "id": 6076,
        "sent": 1412342975960,
        "edited": null,
        "attachments": [],
        "uuid": "uqdBtZklzWVTQqlJ",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "LOL",
            "text": "Stick to the topic Joffrey!"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6122,
        "sent": 1412343514879,
        "edited": null,
        "attachments": [],
        "uuid": "DS6irS1mtcMc06YU",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "4",
        "content": "Any jobs for my talent?",
        "event": "message",
        "tags": [
            ":thread"
        ],
        "id": 6076,
        "sent": 1412342975960,
        "edited": null,
        "attachments": [],
        "uuid": "uqdBtZklzWVTQqlJ",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "Any jobs for my talent?",
            "text": "For your talent? Hardly"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6122,
        "sent": 1412343514879,
        "edited": null,
        "attachments": [],
        "uuid": "DS6irS1mtcMc06YU",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": "Anyone for beer tonight?",
        "event": "message",
        "tags": [
            ":thread"
        ],
        "id": 6076,
        "sent": 1412342975960,
        "edited": null,
        "attachments": [],
        "uuid": "uqdBtZklzWVTQqlJ",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "4",
        "content": {
            "title": "Anyone for beer tonight?",
            "text": "I'm in!"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6122,
        "sent": 1412343514879,
        "edited": null,
        "attachments": [],
        "uuid": "DS6irS1mtcMc06YU",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": {
            "title": "Anyone for beer tonight?",
            "text": "Count me in too!"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6127,
        "sent": 1412343553446,
        "edited": null,
        "attachments": [],
        "uuid": "MlQWg4cRQCID-tQL",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "Anyone for beer tonight?",
            "text": "Jof, you can't go, you are minor!"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6127,
        "sent": 1412343553446,
        "edited": null,
        "attachments": [],
        "uuid": "MlQWg4cRQCID-tQL",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": {
            "title": "Anyone for beer tonight?",
            "text": "hmph..."
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6127,
        "sent": 1412343553446,
        "edited": null,
        "attachments": [],
        "uuid": "MlQWg4cRQCID-tQL",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
]
*/
var dummyFlowMessages = 
    [
    {
        "user": "0",
        "content": "Welcome to your brand new flow!",
        "event": "message",
        "tags": [],
        "id": 2,
        "sent": 1410507059090,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": "This flow is now invitation-only.",
        "event": "line",
        "tags": [],
        "id": 3,
        "sent": 1410507061878,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "add_people",
            "message": [
                "IlkkaL"
            ]
        },
        "event": "action",
        "tags": [],
        "id": 8,
        "sent": 1410507082629,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "invite",
            "id": "d811ab1e9f6e9a9f70dc5541af1125e61a39ca9c",
            "email": "atte.peramaki@student.tut.fi"
        },
        "event": "action",
        "tags": [],
        "id": 16,
        "sent": 1410507250330,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "invite",
            "id": "17e914af2779a5f195539fd6eec5858a2337e153",
            "email": "eliisa.vakeva@student.tut.fi"
        },
        "event": "action",
        "tags": [],
        "id": 17,
        "sent": 1410507250914,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "invite",
            "id": "d893b32d556c89c8831b0fe72e754cf906e6bba9",
            "email": "jingui.liee@gmail.com"
        },
        "event": "action",
        "tags": [],
        "id": 18,
        "sent": 1410507251264,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "invite",
            "id": "80c11383e0d2a703b5d33844323bb5b594986bce",
            "email": "joona.laamanen@student.tut.fi"
        },
        "event": "action",
        "tags": [],
        "id": 19,
        "sent": 1410507251542,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "invite",
            "id": "54d7c3ac573514262107efc960295a65b1899f84",
            "email": "jouni.mikkola@student.tut.fi"
        },
        "event": "action",
        "tags": [],
        "id": 20,
        "sent": 1410507251817,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "1",
        "content": {
            "type": "invite",
            "id": "06fb3b7602c4ff694e2b9eff7e66b95c1b0afb80",
            "email": "sampo.tolvanen@student.tut.fi"
        },
        "event": "action",
        "tags": [],
        "id": 21,
        "sent": 1410507252132,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103136",
        "content": {
            "type": "join",
            "id": "06fb3b7602c4ff694e2b9eff7e66b95c1b0afb80"
        },
        "event": "action",
        "tags": [],
        "id": 642,
        "sent": 1410538565283,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103175",
        "content": {
            "type": "join",
            "id": "54d7c3ac573514262107efc960295a65b1899f84"
        },
        "event": "action",
        "tags": [],
        "id": 648,
        "sent": 1410551125366,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103184",
        "content": {
            "type": "join",
            "id": "d893b32d556c89c8831b0fe72e754cf906e6bba9"
        },
        "event": "action",
        "tags": [],
        "id": 655,
        "sent": 1410553761501,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": {
            "type": "join",
            "id": "d811ab1e9f6e9a9f70dc5541af1125e61a39ca9c"
        },
        "event": "action",
        "tags": [],
        "id": 658,
        "sent": 1410629952438,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103404",
        "content": {
            "type": "join",
            "id": "80c11383e0d2a703b5d33844323bb5b594986bce"
        },
        "event": "action",
        "tags": [],
        "id": 783,
        "sent": 1410765007195,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103404",
        "content": {
            "user": {
                "nick": "JoonaLaamanen",
                "name": "Joona Laamanen",
                "avatar": "https://d2cxspbh1aoie1.cloudfront.net/avatars/099395e321f7fa384dd8e8e3f385d4fa/",
                "email": "joona.laamanen@gmail.com",
                "id": 103404,
                "email_hash": "099395e321f7fa384dd8e8e3f385d4fa"
            }
        },
        "event": "user-edit",
        "tags": [],
        "id": 806,
        "sent": 1410765387813,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103404",
        "content": {
            "user": {
                "nick": "Joona",
                "name": "Joona Laamanen",
                "avatar": "https://d2cxspbh1aoie1.cloudfront.net/avatars/099395e321f7fa384dd8e8e3f385d4fa/",
                "email": "joona.laamanen@gmail.com",
                "id": 103404,
                "email_hash": "099395e321f7fa384dd8e8e3f385d4fa"
            }
        },
        "event": "user-edit",
        "tags": [],
        "id": 978,
        "sent": 1410769006624,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103450",
        "content": {
            "type": "join",
            "id": "17e914af2779a5f195539fd6eec5858a2337e153"
        },
        "event": "action",
        "tags": [],
        "id": 1210,
        "sent": 1410775276036,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": "hey! people! :D",
        "event": "message",
        "tags": [],
        "id": 1933,
        "sent": 1410811581646,
        "edited": null,
        "attachments": [],
        "uuid": "wlua6h8slpTr1Uf_",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "103184",
        "content": {
            "user": {
                "nick": "Jingui",
                "name": "Dennis Lee",
                "avatar": "https://d2cxspbh1aoie1.cloudfront.net/avatars/18eb1fecd9fab905af7b4cc6f0380d8f/",
                "email": "jingui.liee@gmail.com",
                "id": 103184,
                "email_hash": "18eb1fecd9fab905af7b4cc6f0380d8f"
            }
        },
        "event": "user-edit",
        "tags": [],
        "id": 1936,
        "sent": 1411286710508,
        "edited": null,
        "attachments": [],
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": "http://www.cs.tut.fi/~mikkola2/project/coinflippers.html",
        "event": "message",
        "tags": [
            ":url",
            ":thread"
        ],
        "id": 5669,
        "sent": 1412332841232,
        "edited": null,
        "attachments": [],
        "uuid": "Tp8MG55Wcfyu7o-H",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": "There is link to our project page. Documents will be added soon.",
        "event": "message",
        "tags": [],
        "id": 5672,
        "sent": 1412332861502,
        "edited": null,
        "attachments": [],
        "uuid": "8PDYZUtpxPssqKvq",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "http://www.cs.tut.fi/~mikkola2/project/coinflippers.html",
            "text": "thanks :jazz:"
        },
        "event": "comment",
        "tags": [
            "influx:5669"
        ],
        "id": 5680,
        "sent": 1412333130924,
        "edited": null,
        "attachments": [],
        "uuid": "oTIsLiNX-FMHXnKB",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "http://www.cs.tut.fi/~mikkola2/project/coinflippers.html",
            "text": "great project group name :D"
        },
        "event": "comment",
        "tags": [
            "influx:5669"
        ],
        "id": 5683,
        "sent": 1412333154620,
        "edited": null,
        "attachments": [],
        "uuid": "3xLtgJpqz4a-_zV5",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": "thanks :D",
        "event": "message",
        "tags": [
            ":thread"
        ],
        "id": 6076,
        "sent": 1412342975960,
        "edited": null,
        "attachments": [],
        "uuid": "uqdBtZklzWVTQqlJ",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "thanks :D",
            "text": "thread police protip btw 👮"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6122,
        "sent": 1412343514879,
        "edited": null,
        "attachments": [],
        "uuid": "DS6irS1mtcMc06YU",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "thanks :D",
            "text": "woo threads"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6127,
        "sent": 1412343553446,
        "edited": null,
        "attachments": [],
        "uuid": "MlQWg4cRQCID-tQL",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "path": "/files/74780/KwAqo6Vdbv_EPel46sR87Q/threads.gif",
            "file_name": "threads.gif",
            "image": {
                "width": 1,
                "height": 19
            },
            "file_size": 145269,
            "content_type": "image/gif",
            "content_disposition": "attachment"
        },
        "event": "file",
        "tags": [
            "influx:6076",
            ":file"
        ],
        "id": 6128,
        "sent": 1412343569722,
        "edited": null,
        "attachments": [
            {
                "path": "/files/74780/KwAqo6Vdbv_EPel46sR87Q/threads.gif",
                "file_name": "threads.gif",
                "image": {
                    "width": 1,
                    "height": 19
                },
                "file_size": 145269,
                "content_type": "image/gif",
                "content_disposition": "attachment"
            }
        ],
        "uuid": "RWJwAsLQ6IR3PvkP",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "2",
        "content": {
            "title": "thanks :D",
            "text": "(also a good indication why the drag'n'drop file upload is pretty awesome in some use cases ;)"
        },
        "event": "comment",
        "tags": [
            "influx:6076"
        ],
        "id": 6138,
        "sent": 1412343622079,
        "edited": null,
        "attachments": [],
        "uuid": "V6msRr2dCeoQGsXW",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "3",
        "content": "The mid-presentations are taking place 4.11 at TUT in TB109 during 16.15-18. Everyone is welcome there! :)",
        "event": "message",
        "tags": [],
        "id": 8191,
        "sent": 1413973445820,
        "edited": 1413975189619,
        "attachments": [],
        "uuid": "3YNQdELLkca4foQO",
        "app": "chat",
        "flow": "588c1470-4465-4ee8-93c1-73377ce1d421"
    },
    {
        "user": "0",
        "content": {
            "author": "",
            "link": "http://yle.fi/uutiset/varikuulapelifirma_haki_koehenkiloa_ammuttavaksi__sai_10_000_hakemusta/7718629?origin=rss",
            "feed": {
                "title": "Yle Uutiset | Pelit | Tuoreimmat uutiset",
                "url": "http://yle.fi/uutiset/rss/uutiset.rss?osasto=pelit"
            },
            "categories": [
                "Uutiset",
                "Ulkomaat",
                "Pelit"
            ],
            "content": "\n<p>Noin 10 000 ihmistä eri puolilta maailmaa on hakenut brittiläisen paintball- eli värikuulapelejä tarjoavan yrityksen palvelukseen. UKPaintball-firma etsi koehenkilöä, johon värikuulien vaikutusta kokeiltaisiin. Perjantaina se kommentoi olevansa ällistynyt hakijoiden määrästä.</p><p>– Emme osanneet ennakoida, että näin moni ihminen haluaisi tulla elannokseen ammutuksi, kuvailee UKPaintballin omistaja Justin Toohig.</p><p>Hakemuksia saapui niin Britanniasta kuin Yhdysvalloista, Kanadasta ja Intiasta. Koehenkilölle on luvassa 40 000 punnan eli noin 50 000 euron vuosipalkka.</p><p>Hakijat ovat perustelleet monin tavoin pätevyyttään tehtävään. Eräs kertoi olevansa entinen sotilas, jolle aseet ovat siis tuttuja. Joukossa oli myös entinen taikurin avustaja, joka kertoi, että hänet melkein ammuttiin taikatempussa, joka meni pahemman kerran vikaan, Toohig kuvailee hakijoita uutistoimisto AFP:lle.</p><p>Toohigin mukaan edessä on varsinainen ponnistus, jotta hakijoiden joukosta saadaan valituksi yksi, joka saa työpaikan. </p>",
            "title": "Värikuulapelifirma haki koehenkilöä ammuttavaksi – sai 10 000 hakemusta"
        },
        "event": "rss",
        "tags": [
            ":thread"
        ],
        "id": 72,
        "sent": 1421314193756,
        "edited": null,
        "attachments": [],
        "app": "influx",
        "flow": "504a0893-d41b-4203-9511-79ca10619b90",
        "created_at": "2015-01-15T09:29:53.756Z",
        "edited_at": null
    },
    {
        "user": "0",
        "content": {
            "author": "",
            "link": "http://yle.fi/uutiset/lomaileva_koululainen_valvoo_kuin_omalla_aikavyohykkeella/7700889?origin=rss",
            "feed": {
                "title": "Yle Uutiset | Pelit | Tuoreimmat uutiset",
                "url": "http://yle.fi/uutiset/rss/uutiset.rss?osasto=pelit"
            },
            "categories": [
                "Uutiset",
                "Kotimaa",
                "Terveys",
                "Internet",
                "Media",
                "Pelit"
            ],
            "content": "\n<p>Kirkkonummelaisessa Ollikaisen perheessä on kokemusta varsin vaihtelevista unirytmeistä: vanhemmat heräävät arkisin jo aamuviideltä, eivätkä osaa lomallakaan valvoa juuri iltakymmentä pidempään, ja ekaluokkalainen Janko elää vielä päiväkoti-ikäisen tahdissa. Sen sijaan yhdeksäsluokkalainen Juulia ja hänen parikymppinen isosiskonsa valvovat lomalla ja viikonloppuisin vaivatta yli puolenyön.</p><p>– Loma-aamuna minut herätetään kymmeneen mennessä. Herääminen ei kuitenkaan tarkoita sängystä nousemista. Katson tv-ohjelmaa, kaikki Facebook-päivitykset ja luen uutisia ensin ja juttelen kavereille. Kyllä siinä tunti menee, Juulia Ollikainen kuvailee.</p><p>Arjen keskellä Juulia simahtaa kyllä kello 22:een mennessä, mutta rauhoittumista voivat häiritä pikaviestipalvelun äänimerkit.</p><p>– Sanon kavereille meneväni nukkumaan, jotta he eivät enää lähettäisi viestejä. Muutaman kerran sanottuani ne kyllä uskovat. Yöllä tuleviin viesteihin ei pitäisi reagoida, mutta yleensä katson, onko kaverilla jotain tärkeätä asiaa kuitenkin, Juulia kertoo. Hänellä ei ole tapana säätää puhelintaan äänettömälle yöksi.</p><h3>Loma kuittaa univelkoja, kunhan aamuisin nukkuu tarpeeksi</h3><p> Koululaisten erilaiset uniongelmat ovat kaksinkertaistuneet sitten 1990-luvun puolivälin. Ilmiö on tuttu myös Juulia Ollikaisen koulussa. Moni luokkatoveri on aamupäivisin väsyksissä ja ärtynyt yöunien jäätyä sirpaleisiksi.</p><p>Univaivojen erääksi syyksi on tarjottu elektroniikkaa ja näytöistä hohtavan sinisen valon vaikutusta. Loma-aika on omiaan nollaamaan valvomisista koituneita univelkoja, mutta esimerkiksi masennusoireista johtuvaa unettomuutta ei vapaiden putki korjaa.</p><p>Ollikaisilla aamu-unisten lomaherätys tapahtuu keittiön kolinoilla. Kokemuksesta perheessä kuitenkin tiedetään, että myöhäistyneen rytmin hinta maksetaan arkeen palatessa.</p><p>– Kyllä lapsi on loman päätteeksi varmaan mieleltään levänneempi, kun hän on saanut olla kotona ja perheensä kanssa. Mutta arvelen, että ensimmäisen koulupäivän jälkeen hän on silti varmasti väsynyt, äiti Satu Ollikainen pohtii.</p>",
            "title": "Lomaileva koululainen valvoo kuin omalla aikavyöhykkeellä"
        },
        "event": "rss",
        "tags": [],
        "id": 73,
        "sent": 1421314193783,
        "edited": null,
        "attachments": [],
        "app": "influx",
        "flow": "504a0893-d41b-4203-9511-79ca10619b90",
        "created_at": "2015-01-15T09:29:53.782Z",
        "edited_at": null
    },
    {
        "user": "0",
        "content": {
            "author": "",
            "link": "http://yle.fi/uutiset/urheilupelit_olivat_jalleen_suomen_myydyimpia_videopeleja/7725369?origin=rss",
            "feed": {
                "title": "Yle Uutiset | Pelit | Tuoreimmat uutiset",
                "url": "http://yle.fi/uutiset/rss/uutiset.rss?osasto=pelit"
            },
            "categories": [
                "Kulttuuri",
                "Viihde",
                "Tekniikka",
                "Pelit"
            ],
            "content": "\n<p>Suomalaisen pelialan etujärjestön Figman\njulkaiseman Suomen myydyimpien pelien listan etunenästä löytyy jääkiekkopeli\n<em>NHL 15</em> ja toiselta sijalta jalkapallopeli <em>FIFA 15</em>. NHL ja FIFA ovat pelaajien\nkestosuosikkeja ja myös vuonna 2013 molemmat löytyivät viiden parhaan joukosta.</p><p>Kolmanneksi myydyin oli rakentelupeli\n<em>Minecraft</em> ja kauppansa tekivät myös toimintapelit kuten <em>Call of Duty</em> ja\nkaraokepeli <em>SingStar Suomibileet</em>. Suurin osa myydyimmistä peleistä oli jatko-osia. </p><p>Vuonna 2013 ostetuin peli oli <em>Grand\nTheft Auto V</em>, jonka versio uusille pelikonsoleille löytyy\nviime vuoden myydyimpien kahdeksannelta sijalta.</p><p>Listan pelit ovat fyysisesti myytyjä kappaleita, digitaalisesti laitteisiin hankitut pelit eivät sisälly listalle. </p>",
            "title": "Urheilupelit olivat jälleen Suomen myydyimpiä videopelejä"
        },
        "event": "rss",
        "tags": [],
        "id": 74,
        "sent": 1421314193802,
        "edited": null,
        "attachments": [],
        "app": "influx",
        "flow": "504a0893-d41b-4203-9511-79ca10619b90",
        "created_at": "2015-01-15T09:29:53.802Z",
        "edited_at": null
    },
    {
        "user": "0",
        "content": {
            "subject": "Atte Perämäki added feed http://yle.fi/uutiset/rss/uutiset.rss?osasto=pelit (Yle Uutiset | Pelit | Tuoreimmat uutiset)",
            "replyTo": [],
            "to": [],
            "contentType": null,
            "from": [
                {
                    "name": "Flowdock",
                    "address": "avatar+feed@flowdock.com"
                }
            ],
            "bcc": [],
            "content": "",
            "sender": null,
            "cc": []
        },
        "event": "mail",
        "tags": [
            ":url"
        ],
        "id": 75,
        "sent": 1421314193811,
        "edited": null,
        "attachments": [],
        "app": "influx",
        "flow": "504a0893-d41b-4203-9511-79ca10619b90",
        "created_at": "2015-01-15T09:29:53.811Z",
        "edited_at": null
    }
]
