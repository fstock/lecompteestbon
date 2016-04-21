var game = (function($) {
	var
		map = {
			target: 0,
			plaques: [],
			currentOperation: {}
		},
		availablePlaques = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			25, 75, 100
		],
		getBlankOperation = function() {
			return {
				leftOperand: 0,
				operator: "",
				rightOperand: 0
			};
		},

		addition = function(leftOperand, rightOperand) {
			return leftOperand + rightOperand;
		},
		substraction = function(leftOperand, rightOperand) {
			return leftOperand - rightOperand < 0 ? 0 : leftOperand - rightOperand;
		},
		multiplication = function(leftOperand, rightOperand) {
			return leftOperand * rightOperand;
		},
		division = function(leftOperand, rightOperand) {
			return leftOperand / rightOperand !== Math.floor(leftOperand / rightOperand) ?
				0 :
				leftOperand / rightOperand;
		},
		operators = {
			"+": addition,
			"-": substraction,
			"*": multiplication,
			":": division
		},

		// initialization
		init = function() {
			initTarget();
			initPlaques();
			initOperation();
		},
		initTarget = function() {
			map.target = getRandomInt(100, 999);

			console.log("Target initialized: " + map.target);
		},
		initPlaques = function() {
			var
				temp = availablePlaques.slice(),
				count;

			map.plaques = [];

			for (count = 0; count < 6; ++count) {
				var
					index = getRandomInt(0, temp.length - 1),
					number = temp.splice(index, 1)[0];

				map.plaques.push(number);
			}

			console.log("Plaques initialized: " + map.plaques);
		},
		initOperation = function() {
			map.currentOperation = getBlankOperation();
			console.log("Operation initialized.");
		},
		getRandomInt = function(minimum, maximum) {
			return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		}

	// Game routines
	selectOperand = function(index) {
			if (!isOperandSelectable()) {
				throw Error("Illegal operation: operator is already selected.");
			}

			var
				operation = game.map.currentOperation,
				value = game.map.plaques.slice(index, 1)[0];

			if (operation.leftOperand === 0) {
				operation.leftOperand = value;
			} else if (operation.rightOperand === 0) {
				operation.rightOperand = value;
			}
		},
		selectOperator = function(operator) {
			if (!isOperandSelectable()) {
				throw Error("Illegal operation: operator is already selected.");
			}

			game.currentOperation.operator = operator;
		},
		isOperandSelectable = function() {
			var operation = map.currentOperation;

			return operation.leftOperand === 0 || operation.operator !== "";
		};

	return {
		map: map,
		operators: operators,
		init: init,
		selectOperand: selectOperand,
		selectOperator: selectOperator,
		isOperandSelectable: isOperandSelectable
	};
})(jQuery);