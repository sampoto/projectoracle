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
            "user": "103287",
            "content": {
                "type": "add_people",
                "message": [
                    "Joona"
                ]
            },
            "event": "action",
            "tags": [],
            "id": 5,
            "sent": 1419497593209,
            "edited": null,
            "attachments": [],
            "app": "chat",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2014-12-25T08:53:13.209Z",
            "edited_at": null
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
        },
        {
            "user": "103287",
            "content": {
                "title": "Värikuulapelifirma haki koehenkilöä ammuttavaksi – sai 10 000 hakemusta",
                "text": "Johan nyt"
            },
            "event": "comment",
            "tags": [
                "influx:72"
            ],
            "id": 78,
            "sent": 1421314234848,
            "edited": null,
            "attachments": [],
            "uuid": "AY3xYSxu_LzobqXC",
            "app": "chat",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-15T09:30:34.848Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "subject": "Atte Perämäki added Twitter follow for @ParoniAnttila",
                "replyTo": [],
                "to": [],
                "contentType": null,
                "from": [
                    {
                        "name": "Flowdock",
                        "address": "avatar+twitter@flowdock.com"
                    }
                ],
                "bcc": [],
                "content": "Twitter user follow does not include retweets or replies",
                "sender": null,
                "cc": []
            },
            "event": "mail",
            "tags": [],
            "id": 158,
            "sent": 1421322289706,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-15T11:44:49.706Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://www.linkedin.com/\" rel=\"nofollow\">LinkedIn</a>",
                "entities": {
                    "user_mentions": [],
                    "urls": [
                        {
                            "url": "http://t.co/2XxIw9oVSq",
                            "expanded_url": "http://ow.ly/HqbuC",
                            "display_url": "ow.ly/HqbuC",
                            "indices": [
                                51,
                                73
                            ]
                        }
                    ],
                    "symbols": [],
                    "hashtags": [],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556057773163560960",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421409478833",
                "truncated": false,
                "text": "Palveluneuvojia asiakaspalvelutehtäviin Helsinkiin http://t.co/2XxIw9oVSq",
                "retweet_count": 0,
                "id": 556057773163560960,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Fri Jan 16 11:57:58 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "fi",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 370,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3060,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 278,
            "sent": 1421409479002,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-16T11:57:59.002Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://www.linkedin.com/\" rel=\"nofollow\">LinkedIn</a>",
                "entities": {
                    "user_mentions": [
                        {
                            "name": "Elenia",
                            "screen_name": "Elenia_fi",
                            "indices": [
                                67,
                                77
                            ],
                            "id_str": "575993980",
                            "id": 575993980
                        }
                    ],
                    "urls": [
                        {
                            "url": "http://t.co/d1BKH9IUzV",
                            "expanded_url": "http://ow.ly/HqbkR",
                            "display_url": "ow.ly/HqbkR",
                            "indices": [
                                78,
                                100
                            ]
                        }
                    ],
                    "symbols": [],
                    "hashtags": [
                        {
                            "text": "rekry",
                            "indices": [
                                52,
                                58
                            ]
                        },
                        {
                            "text": "elenia",
                            "indices": [
                                59,
                                66
                            ]
                        }
                    ],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556058031629164544",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421409540456",
                "truncated": false,
                "text": "Palveluneuvojia asiakaspalvelutehtäviin Tampereelle #rekry #elenia @elenia_fi http://t.co/d1BKH9IUzV",
                "retweet_count": 0,
                "id": 556058031629164540,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Fri Jan 16 11:59:00 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "fi",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 370,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3061,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 279,
            "sent": 1421409540670,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-16T11:59:00.670Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
                "entities": {
                    "user_mentions": [],
                    "urls": [
                        {
                            "url": "http://t.co/uNBIG06jrp",
                            "expanded_url": "http://yle.fi/uutiset/7741989",
                            "display_url": "yle.fi/uutiset/7741989",
                            "indices": [
                                103,
                                125
                            ]
                        }
                    ],
                    "symbols": [],
                    "hashtags": [],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556069658085040129",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421412312419",
                "truncated": false,
                "text": "OP:n ja Danske Bankin verkkoisku oli kiristysyritys – lopettamisesta Bitcoineja | Yle Uutiset | yle.fi http://t.co/uNBIG06jrp",
                "retweet_count": 0,
                "id": 556069658085040100,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Fri Jan 16 12:45:12 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "fi",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 370,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3061,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 280,
            "sent": 1421412312561,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-16T12:45:12.561Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
                "entities": {
                    "user_mentions": [
                        {
                            "name": "IKEA",
                            "screen_name": "IKEA",
                            "indices": [
                                52,
                                57
                            ],
                            "id_str": "606342802",
                            "id": 606342802
                        }
                    ],
                    "urls": [],
                    "symbols": [],
                    "hashtags": [],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556394785850679296",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421489828919",
                "truncated": false,
                "text": "Most disorienting thing in a while: walking through @Ikea in wrong direction",
                "retweet_count": 0,
                "id": 556394785850679300,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Sat Jan 17 10:17:08 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "en",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 372,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3066,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 833,
            "sent": 1421489829106,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-17T10:17:09.105Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
                "entities": {
                    "user_mentions": [
                        {
                            "name": "Geekologie",
                            "screen_name": "geekologie",
                            "indices": [
                                60,
                                71
                            ],
                            "id_str": "230005832",
                            "id": 230005832
                        }
                    ],
                    "urls": [
                        {
                            "url": "http://t.co/D4F9jUp751",
                            "expanded_url": "http://geekologie.com/2015/01/guy-on-craigslist-needs-help-beating-sup.php",
                            "display_url": "geekologie.com/2015/01/guy-on…",
                            "indices": [
                                73,
                                95
                            ]
                        }
                    ],
                    "symbols": [],
                    "hashtags": [],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556473747444871169",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421508654830",
                "truncated": false,
                "text": "Guy On Craigslist Needs Help Beating Super Mario World (via @geekologie) http://t.co/D4F9jUp751",
                "retweet_count": 0,
                "id": 556473747444871200,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Sat Jan 17 15:30:54 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "en",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 374,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3067,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 991,
            "sent": 1421508654960,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-17T15:30:54.960Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
                "entities": {
                    "user_mentions": [],
                    "urls": [],
                    "symbols": [],
                    "media": [
                        {
                            "expanded_url": "http://twitter.com/ParoniAnttila/status/556553650387312641/photo/1",
                            "indices": [
                                22,
                                44
                            ],
                            "url": "http://t.co/PLJ25TkkNp",
                            "media_url": "http://pbs.twimg.com/media/B7lGlECCEAAw4u7.jpg",
                            "id_str": "556553631508336640",
                            "id": 556553631508336640,
                            "media_url_https": "https://pbs.twimg.com/media/B7lGlECCEAAw4u7.jpg",
                            "sizes": {
                                "small": {
                                    "w": 340,
                                    "h": 453,
                                    "resize": "fit"
                                },
                                "medium": {
                                    "w": 600,
                                    "h": 800,
                                    "resize": "fit"
                                },
                                "thumb": {
                                    "w": 150,
                                    "h": 150,
                                    "resize": "crop"
                                },
                                "large": {
                                    "w": 768,
                                    "h": 1024,
                                    "resize": "fit"
                                }
                            },
                            "type": "photo",
                            "display_url": "pic.twitter.com/PLJ25TkkNp"
                        }
                    ],
                    "hashtags": [
                        {
                            "text": "olut",
                            "indices": [
                                0,
                                5
                            ]
                        },
                        {
                            "text": "beer",
                            "indices": [
                                6,
                                11
                            ]
                        },
                        {
                            "text": "saturday",
                            "indices": [
                                12,
                                21
                            ]
                        }
                    ],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556553650387312641",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421527705176",
                "truncated": false,
                "text": "#olut #beer #saturday http://t.co/PLJ25TkkNp",
                "retweet_count": 0,
                "id": 556553650387312640,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Sat Jan 17 20:48:25 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "und",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 374,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3068,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                },
                "extended_entities": {
                    "media": [
                        {
                            "expanded_url": "http://twitter.com/ParoniAnttila/status/556553650387312641/photo/1",
                            "indices": [
                                22,
                                44
                            ],
                            "url": "http://t.co/PLJ25TkkNp",
                            "media_url": "http://pbs.twimg.com/media/B7lGlECCEAAw4u7.jpg",
                            "id_str": "556553631508336640",
                            "id": 556553631508336640,
                            "media_url_https": "https://pbs.twimg.com/media/B7lGlECCEAAw4u7.jpg",
                            "sizes": {
                                "small": {
                                    "w": 340,
                                    "h": 453,
                                    "resize": "fit"
                                },
                                "medium": {
                                    "w": 600,
                                    "h": 800,
                                    "resize": "fit"
                                },
                                "thumb": {
                                    "w": 150,
                                    "h": 150,
                                    "resize": "crop"
                                },
                                "large": {
                                    "w": 768,
                                    "h": 1024,
                                    "resize": "fit"
                                }
                            },
                            "type": "photo",
                            "display_url": "pic.twitter.com/PLJ25TkkNp"
                        }
                    ]
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 1013,
            "sent": 1421527705529,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-17T20:48:25.529Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
                "entities": {
                    "user_mentions": [],
                    "urls": [],
                    "symbols": [],
                    "hashtags": [
                        {
                            "text": "commando",
                            "indices": [
                                0,
                                9
                            ]
                        },
                        {
                            "text": "ravintola931",
                            "indices": [
                                12,
                                25
                            ]
                        }
                    ],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556589837898506240",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421536332951",
                "truncated": false,
                "text": "#commando @ #ravintola931",
                "retweet_count": 0,
                "id": 556589837898506240,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Sat Jan 17 23:12:12 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "und",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 374,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3069,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 1014,
            "sent": 1421536333065,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-17T23:12:13.065Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
                "entities": {
                    "user_mentions": [],
                    "urls": [],
                    "symbols": [],
                    "media": [
                        {
                            "expanded_url": "http://twitter.com/ParoniAnttila/status/556590005939077120/photo/1",
                            "indices": [
                                26,
                                48
                            ],
                            "url": "http://t.co/DgCq0DoQDp",
                            "media_url": "http://pbs.twimg.com/media/B7lnp02IcAAbfN0.jpg",
                            "id_str": "556589997214953472",
                            "id": 556589997214953500,
                            "media_url_https": "https://pbs.twimg.com/media/B7lnp02IcAAbfN0.jpg",
                            "sizes": {
                                "small": {
                                    "w": 340,
                                    "h": 453,
                                    "resize": "fit"
                                },
                                "medium": {
                                    "w": 600,
                                    "h": 800,
                                    "resize": "fit"
                                },
                                "thumb": {
                                    "w": 150,
                                    "h": 150,
                                    "resize": "crop"
                                },
                                "large": {
                                    "w": 768,
                                    "h": 1024,
                                    "resize": "fit"
                                }
                            },
                            "type": "photo",
                            "display_url": "pic.twitter.com/DgCq0DoQDp"
                        }
                    ],
                    "hashtags": [
                        {
                            "text": "commando",
                            "indices": [
                                0,
                                9
                            ]
                        },
                        {
                            "text": "ravintola931",
                            "indices": [
                                12,
                                25
                            ]
                        }
                    ],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556590005939077120",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421536373015",
                "truncated": false,
                "text": "#commando @ #ravintola931 http://t.co/DgCq0DoQDp",
                "retweet_count": 0,
                "id": 556590005939077100,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Sat Jan 17 23:12:53 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "und",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 374,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3069,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                },
                "extended_entities": {
                    "media": [
                        {
                            "expanded_url": "http://twitter.com/ParoniAnttila/status/556590005939077120/photo/1",
                            "indices": [
                                26,
                                48
                            ],
                            "url": "http://t.co/DgCq0DoQDp",
                            "media_url": "http://pbs.twimg.com/media/B7lnp02IcAAbfN0.jpg",
                            "id_str": "556589997214953472",
                            "id": 556589997214953500,
                            "media_url_https": "https://pbs.twimg.com/media/B7lnp02IcAAbfN0.jpg",
                            "sizes": {
                                "small": {
                                    "w": 340,
                                    "h": 453,
                                    "resize": "fit"
                                },
                                "medium": {
                                    "w": 600,
                                    "h": 800,
                                    "resize": "fit"
                                },
                                "thumb": {
                                    "w": 150,
                                    "h": 150,
                                    "resize": "crop"
                                },
                                "large": {
                                    "w": 768,
                                    "h": 1024,
                                    "resize": "fit"
                                }
                            },
                            "type": "photo",
                            "display_url": "pic.twitter.com/DgCq0DoQDp"
                        }
                    ]
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 1015,
            "sent": 1421536373264,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-17T23:12:53.263Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": {
                "coordinates": null,
                "retweeted": false,
                "source": "<a href=\"http://www.twentyfeet.com\" rel=\"nofollow\">TwentyFeet</a>",
                "entities": {
                    "user_mentions": [],
                    "urls": [
                        {
                            "url": "http://t.co/SOySonr7bW",
                            "expanded_url": "http://sumall.com/myweek",
                            "display_url": "sumall.com/myweek",
                            "indices": [
                                104,
                                126
                            ]
                        }
                    ],
                    "symbols": [],
                    "hashtags": [],
                    "trends": []
                },
                "favorite_count": 0,
                "in_reply_to_status_id_str": null,
                "geo": null,
                "id_str": "556767012048089089",
                "in_reply_to_user_id": null,
                "timestamp_ms": "1421578574560",
                "truncated": false,
                "text": "How I did on Twitter this week: 1 New Followers, 1 Retweets, 137 Retweet Reach. How'd your week go? via http://t.co/SOySonr7bW",
                "retweet_count": 0,
                "id": 556767012048089100,
                "in_reply_to_status_id": null,
                "possibly_sensitive": false,
                "filter_level": "low",
                "created_at": "Sun Jan 18 10:56:14 +0000 2015",
                "place": null,
                "favorited": false,
                "lang": "en",
                "contributors": null,
                "in_reply_to_screen_name": null,
                "in_reply_to_user_id_str": null,
                "user": {
                    "utc_offset": 7200,
                    "name": "Lauri Anttila",
                    "friends_count": 325,
                    "screen_name": "ParoniAnttila",
                    "location": "Finland",
                    "protected": false,
                    "url": "http://laurianttila.com",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_background_color": "282828",
                    "profile_use_background_image": true,
                    "is_translator": false,
                    "geo_enabled": true,
                    "description": "I'm Lauri Anttila. Half man, half project manager, half IT specialist @ Elenia. Intrapreneur, MBA, rebel thinker, gamer.",
                    "profile_link_color": "0084B4",
                    "id_str": "353119576",
                    "listed_count": 2,
                    "default_profile_image": false,
                    "followers_count": 177,
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/545517882117873664/DiyBLyKU_normal.jpeg",
                    "profile_sidebar_border_color": "000000",
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg",
                    "favourites_count": 374,
                    "following": null,
                    "default_profile": false,
                    "id": 353119576,
                    "profile_background_tile": false,
                    "contributors_enabled": false,
                    "follow_request_sent": null,
                    "created_at": "Thu Aug 11 15:41:13 +0000 2011",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "lang": "en",
                    "profile_text_color": "333333",
                    "notifications": null,
                    "verified": false,
                    "time_zone": "Helsinki",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/353119576/1414145578",
                    "statuses_count": 3070,
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/611971333/fy7pw15o4v6jij6x7e5t.jpeg"
                }
            },
            "event": "twitter",
            "tags": [],
            "id": 1016,
            "sent": 1421578574674,
            "edited": null,
            "attachments": [],
            "app": "influx",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-18T10:56:14.674Z",
            "edited_at": null
        },
        {
            "user": "103287",
            "content": {
                "path": "/files/89621/4bIMUsSjDKs-zIO3nlVjyg/.gitignore",
                "file_name": ".gitignore",
                "file_size": 77,
                "content_type": "text/plain",
                "content_disposition": "attachment"
            },
            "event": "file",
            "tags": [
                ":file",
                ":thread"
            ],
            "id": 1155,
            "sent": 1421614545879,
            "edited": null,
            "attachments": [
                {
                    "path": "/files/89621/4bIMUsSjDKs-zIO3nlVjyg/.gitignore",
                    "file_name": ".gitignore",
                    "file_size": 77,
                    "content_type": "text/plain",
                    "content_disposition": "attachment"
                }
            ],
            "uuid": "2glVlMAnq6J6eUk3",
            "app": "chat",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-18T20:55:45.878Z",
            "edited_at": null
        },
        {
            "user": "103287",
            "content": {
                "path": "/files/89621/JszkwtQkkQRRhqet2jzMFA/.gitignore",
                "file_name": ".gitignore",
                "file_size": 77,
                "content_type": "text/plain",
                "content_disposition": "attachment"
            },
            "event": "file",
            "tags": [
                "influx:1155",
                ":file"
            ],
            "id": 1159,
            "sent": 1421614563711,
            "edited": null,
            "attachments": [
                {
                    "path": "/files/89621/JszkwtQkkQRRhqet2jzMFA/.gitignore",
                    "file_name": ".gitignore",
                    "file_size": 77,
                    "content_type": "text/plain",
                    "content_disposition": "attachment"
                }
            ],
            "uuid": "O9s943Zh-Byc788R",
            "app": "chat",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-18T20:56:03.710Z",
            "edited_at": null
        },
        {
            "user": "103287",
            "content": {
                "type": "add_people",
                "message": [
                    "SampoT"
                ]
            },
            "event": "action",
            "tags": [],
            "id": 1713,
            "sent": 1421675103883,
            "edited": null,
            "attachments": [],
            "app": "chat",
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "created_at": "2015-01-19T13:45:03.882Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": null,
            "event": "activity",
            "tags": [],
            "id": 1718,
            "sent": 1421675178621,
            "edited": null,
            "attachments": [],
            "thread_id": "uyxCAcvNKLu0IyWV4bIQA21Wtaw",
            "app": "influx",
            "thread": {
                "id": "uyxCAcvNKLu0IyWV4bIQA21Wtaw",
                "title": "GitHub source sampoto/projectoracle added",
                "body": "",
                "external_url": null,
                "status": null,
                "actions": [],
                "fields": [],
                "source": {
                    "application": {
                        "name": "GitHub",
                        "url": "http://www.flowdock.com/oauth/applications/472",
                        "published": true,
                        "id": 472,
                        "icon_url": "https://dxgv4vuja9avs.cloudfront.net/applications/472/320219d8c5257080.png",
                        "_links": {
                            "setup": {
                                "href": "http://www.flowdock.com/rest/applications/472/setup"
                            }
                        }
                    },
                    "name": "sampoto/projectoracle",
                    "external_url": null,
                    "url": "https://api.flowdock.com/flows/futurice-nonda/project-oracle-testbench/sources/708",
                    "id": 708,
                    "created_at": "2015-01-19T13:46:18.580Z",
                    "updated_at": "2015-01-19T13:46:18.580Z",
                    "_links": {
                        "configuration": {
                            "href": "https://flowdock.com"
                        }
                    }
                },
                "activities": 1,
                "internal_comments": 0,
                "external_comments": 0,
                "updated_at": "2015-01-19T13:46:18.615Z",
                "created_at": "2015-01-19T13:46:18.000Z",
                "initial_message": 1718
            },
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "author": {
                "name": "Sampo Tolvanen",
                "avatar": "https://d2cxspbh1aoie1.cloudfront.net/avatars/3bfbeb34702c980787bc7b781c21bd80/"
            },
            "title": "added source sampoto/projectoracle",
            "body": "",
            "created_at": "2015-01-19T13:46:18.621Z",
            "edited_at": null
        },
        {
            "user": "0",
            "content": null,
            "event": "activity",
            "tags": [],
            "id": 1860,
            "sent": 1421680763788,
            "edited": null,
            "attachments": [],
            "uuid": "HDTNL5CLtp0CQdLVrayyhQ",
            "thread_id": "02VgGoNjPmt0KmpFO4ixkAMAvr0",
            "app": "influx",
            "thread": {
                "id": "02VgGoNjPmt0KmpFO4ixkAMAvr0",
                "title": "develop at sampoto/projectoracle updated",
                "body": "",
                "external_url": "https://github.com/sampoto/projectoracle/compare/2799fa00c65b...91d7080acb01",
                "status": null,
                "actions": [
                    {
                        "@type": "ViewAction",
                        "name": "Create PR",
                        "image": "https://s3.amazonaws.com/flowdock-resources/images/diff.png",
                        "description": "Create Pull Request in GitHub",
                        "url": "https://github.com/sampoto/projectoracle/compare/develop"
                    }
                ],
                "fields": [],
                "source": {
                    "application": {
                        "name": "GitHub",
                        "url": "http://www.flowdock.com/oauth/applications/472",
                        "published": true,
                        "id": 472,
                        "icon_url": "https://dxgv4vuja9avs.cloudfront.net/applications/472/320219d8c5257080.png",
                        "_links": {
                            "setup": {
                                "href": "http://www.flowdock.com/rest/applications/472/setup"
                            }
                        }
                    },
                    "name": "sampoto/projectoracle",
                    "external_url": null,
                    "url": "https://api.flowdock.com/flows/futurice-nonda/project-oracle-testbench/sources/708",
                    "id": 708,
                    "created_at": "2015-01-19T13:46:18.580Z",
                    "updated_at": "2015-01-19T13:46:18.580Z",
                    "_links": {
                        "configuration": {
                            "href": "https://flowdock.com"
                        }
                    }
                },
                "activities": 1,
                "internal_comments": 0,
                "external_comments": 0,
                "updated_at": "1970-01-01T00:00:02.015Z",
                "created_at": null,
                "initial_message": 1860
            },
            "flow": "504a0893-d41b-4203-9511-79ca10619b90",
            "author": {
                "name": "sampoto",
                "avatar": "https://secure.gravatar.com/avatar/3bfbeb34702c980787bc7b781c21bd80?s=120&r=pg",
                "email": "sampo.tolvanen@gmail.com"
            },
            "title": "<a href=\"https://github.com/sampoto/projectoracle/commit/91d7080acb01bc7cec15c739bbaebbdfd1413840\">91d7080</a> Fix tab change flickering issue",
            "body": "<pre>* Page refresh still causes flickering because template is shown before application status</pre>",
            "created_at": "2015-01-19T15:19:23.788Z",
            "edited_at": null
        }
    ]