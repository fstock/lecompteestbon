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
                
            console.log("Drawing target: " + map.target);

            $target.html(map.target);
        },
        drawPlaques = function() {
            console.log("Drawing plaques.");

            var
                map = game.map,
                plaques = [];

            $("#plaques").empty();
            $.each(map.plaques, function(index, value) {
                var $li = $("<li />").html(value);

                if (game.isOperandSelectable()) {
                    $li.click(function() {
                        game.selectOperand(index);
                        play();
                    });
                } else {
                    $li.addClass("disabled");
                    $li.attr("disabled", true);
                }

                $li.appendTo("#plaques");
            });

        },
        drawOperators = function() {
            console.log("Drawing operators.");

            $("#operators").empty();

            $.each(game.operators, function(index, value) {
                var $li = $("<li />").html(index);

                if (game.isOperandSelectable()) {
                    $li.addClass("disabled");
                    $li.attr("disabled", true);
                } else {
                    $li.click(function() {
                        game.selectOperator(index);
                        play();
                    });
                }

                $li.appendTo("#operators");
            });
        },
        drawOperation = function() {
            var operation = game.map.currentOperation;
            console.log("Drawing operation:");
            console.log(operation);
            
            if (operation.leftOperand !== 0) {
                $("#operation > li:nth-child(1)").html(operation.leftOperand);
            }

            if (operation.operator !== "") {
                $("#operation > li:nth-child(2)").html(operation.operator);
            }

            if (operation.rightOperand !== 0) {
                $("#operation > li:nth-child(3)").html(operation.rightOperand);
            }
        },

        cancel = function() {},
        reset = function() {
            if (confirm("Sure????")) {
                game.init();
            }
        },
        play = function() {
            if (game.isWon()) {
                alert("Bravooo!!!! You won.");
            }

            draw();
        };

    game.init();
    draw();

    return {
        cancel: cancel,
        reset: reset
    };
})(jQuery, game);