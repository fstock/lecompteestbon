var app = (function($, game) {
    var
        draw = function() {
            drawTarget();
            drawButtons();
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
        drawButtons = function() {
            var $cancel = $("#cancel");

            $cancel.unbind();

            if (game.isCancellable()) {
                $cancel.click(cancel);
                $cancel.removeClass("disabled");
            } else {
                $cancel.addClass("disabled", true);
            }
        },
        cancel = function() {
            game.cancel();
            play();
        },
        drawPlaques = function() {
            var
                map = game.map,
                plaques = [],
                $plaques = $("#plaques");

            $plaques.empty();
            $.each(map.plaques, function(index, value) {
                var
                    $li = $("<li />").html(value),
                    click = function() {
                        game.selectOperand(index);
                        play();
                    };

                if (game.isOperandSelectable()) {
                    $li.click(click);
                }

                $li.appendTo($plaques);
            });

            if (game.isOperandSelectable()) {
                $plaques.removeClass("disabled");
            } else {
                $plaques.addClass("disabled");
            }
        },
        drawOperators = function() {
            var $operators = $("#operators");

            $operators.empty();

            $.each(game.operators, function(index, value) {
                var $li = $("<li />").html(index);

                if (game.isOperatorSelectable()) {
                    $li.click(function() {
                        game.selectOperator(index);
                        play();
                    });
                }

                $li.appendTo($operators);
            });

            if (game.isOperatorSelectable()) {
                $operators.removeClass("disabled");
            } else {
                $operators.addClass("disabled");
            }
        },
        drawOperation = function() {
            var operation = game.map.currentOperation,
                leftOperand = operation.leftOperand,
                operator = operation.operator,
                rightOperand = operation.rightOperand;

            $("#operation > li:nth-child(1)").html(leftOperand === 0 ? "" : leftOperand);
            $("#operation > li:nth-child(2)").html(operator);
            $("#operation > li:nth-child(3)").html(rightOperand === 0 ? "" : rightOperand);

            if (rightOperand !== 0 && !game.isOperationValid()) {
                $("#operation").addClass("invalid");
            } else {
                $("#operation").removeClass("invalid");
            }
        },
        reset = function() {
            if (confirm("Sure????")) {
                init();
            }
        },
        play = function() {
            if (game.isOperationValid()) {
                console.log("Operation is valid.");
                game.calculate();
            }
                        
            if (game.isWon()) {
                alert("Bravooo!!!! You won.");
            }

            draw();
        },
        init = function() {
            game.init();
            play();
        };

    init();

    return {
        reset: reset
    };
})(jQuery, game);