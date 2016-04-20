var app = (function($, game) {
    var
        draw = function() {
            drawTarget();
            drawPlaques();
            drawOperators();
            drawOperation();
        },
        drawTarget = function() {
            var
                map = game.map,
                $target = $("#target");

            $target.html(map.target);
        },
        drawPlaques = function() {
            var
                map = game.map,
                item = [];

            $.each(map.plaques, function(index, value) {
                item.push("<li>" + value + "</li>");
            });

            $("#plaques").append(item.join(""));
        },
        drawOperators = function() {
            $.each(game.operators, function(index, value) {
                console.log(index + "/" + value);
            });
        },
        drawOperation = function() {};

    game.init();
    draw();
})(jQuery, game);