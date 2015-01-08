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
      "disabled": true,
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
      "disabled": true,
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
      "disabled": true,
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
    }
]
