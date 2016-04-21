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
				plaques = [];

			$("#plaques").empty();
			$.each(map.plaques, function(index, value) {
				var $li = $("<li />").html(value);

				if (game.isOperandSelectable()) {
					$li.click(function() {
						game.selectPlaque(index);
					});
				} else {
                    $li.addClass("disabled");
                    $li.attr("disabled", true);
                }

				$li.appendTo("#plaques");
			});

		},
		drawOperators = function() {
			$.each(game.operators, function(index, value) {
				var                    $li = $("<li />").html(value);
                
                if (game.isOperandSelectable()) {
                    $li.addClass("disabled");
                    $li.attr("disabled", true);
				} else {
					$li.click(function() {
						game.selectOperator(value);
					});
                }

				$li.appendTo("#operators");
			});
		},
		drawOperation = function() {

		};

	game.init();
	draw();
})(jQuery, game);