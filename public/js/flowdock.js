$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
   
    $(".user-popover").popover({
        animation: 'true',
        placement: 'bottom',
        html: 'true',
        trigger: 'click',
        content: userdata()
    });
   
});

function userList()
{
    $scope.gotoBottom();
    console.log($scope.offline.user[0].nick);
}
function dnd(){
    console.log("toggle!");
    $(".dnd").toggle("slow");
}

function userdata(){
    
    var data = $('<table></table>', {
        class: "table",
        html: [
            $('<tr></tr>', {
                class: "disturb-popover clickable",
                'click':function(){ 
                    console.log("toggle!");
                    $(".dnd").toggle("150");
                },
                html: [
                    $('<td></td>',{
                        html: $('<i></i>', {
                            class: "fa fa-bell-slash",
                            })
                        }),
                    $('<td></td>', {
                        html: "Do not disturb..."
                        })
                    ]
            }),
            $('<tr></tr>', {
                style: "display: none",
                class: "dnd",
                html: [
                    $('<td></td>', {}),
                    $('<td></td>', {
                        html: "30 minutes"
                        })
                    ]
            }),
            $('<tr></tr>', {
                style: "display: none",
                class: "dnd",
                html: [
                    $('<td></td>', {}),
                    $('<td></td>', {
                        html: "2 hours"
                        })
                        ]
            }),
            $('<tr></tr>', {
                style: "display: none",
                class: "dnd",
                html: [
                    $('<td></td>', {}),
                    $('<td></td>', {
                        html: "8 hours"
                        })
                        ]
            }),
            $('<tr></tr>', {
                html: [
                    $('<td></td>', {
                        html: $('<i></i>', {
                            class: "fa fa-sliders"
                            })
                        }),
                    $('<td></td>', {
                        html: "Preferences..."
                        })
                    ]
            })
            ]
        });
        
        
    
    console.dir(data);
    return data;

}