$(document).ready(function() {
    replaceBootstrapPopoverTrigger();
});

// This function replaces the Bootstrap hover trigger for popovers.
// It makes it possible to hover on the content of popovers without hiding them.
function replaceBootstrapPopoverTrigger() {
    var originalLeave = $.fn.popover.Constructor.prototype.leave;
    $.fn.popover.Constructor.prototype.leave = function(obj){
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);

        var container, timeout;
        originalLeave.call(this, obj);

        if(obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover');
            timeout = self.timeout;
            container.one('mouseenter', function(){
                //We entered the actual popover
                clearTimeout(timeout);
                //Let's monitor popover content instead
                container.one('mouseleave', function(){
                    $.fn.popover.Constructor.prototype.leave.call(self, self);
                });
            });
        }
    };
}

$(document).on("click", ".pivotal-dropdown-icon", function() {
    var dropdownIcon = $(this);
    var chunkId = dropdownIcon.attr("data-chunkid");

    var chunkContent = $(".pivotal-chunk-content[data-chunkid='"+chunkId+"']");

    // Could use just .toggle(), but this makes changing caret icon easier
    // and makes sure that the carets are the right way round
    if (chunkContent.is(":visible")) {
        chunkContent.hide();
        dropdownIcon.removeClass('fa-caret-down');
        dropdownIcon.addClass("fa-caret-right");
    } else {
        chunkContent.show();
        dropdownIcon.removeClass('fa-caret-right');
        dropdownIcon.addClass("fa-caret-down");
    }
});
