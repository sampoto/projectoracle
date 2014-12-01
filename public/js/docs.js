$(document).on("click", ".docsLinkRow", function(e) {
    $('.docsLinkRow').each(function() {
        $(this).removeClass("active");
    });

    $(this).addClass("active");
});