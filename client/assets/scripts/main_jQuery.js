$(document).ready(function() {
    $(".navbar a").on("click", function() {
        $(".navbar").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    $(".property").hover(function() {
        $(this).css('cursor', 'pointer');
        $(this).css('opacity', '0.75')
    }, function() {
        $(this).css('opacity', '1')
    });
});
