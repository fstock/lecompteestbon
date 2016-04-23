var game = (function($) {
    var
        map = {
            target: 0,
            plaques: [],
            currentOperation: {},
            history: []
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
            return leftOperand === 1 || rightOperand === 1 ? 0 : leftOperand * rightOperand;
        },
        division = function(leftOperand, rightOperand) {
            return rightOperand === 1 || leftOperand / rightOperand !== Math.floor(leftOperand / rightOperand) ?
                0 :
                leftOperand / rightOperand;
        },
        operators = {
            "+": addition,
            "-": substraction,
            "*": multiplication,
            ":": division
        },
        isOperationValid = function() {
            var
                operation = map.currentOperation,
                leftOperand = operation.leftOperand,
                operator = operation.operator,
                rightOperand = operation.rightOperand;

            return leftOperand !== 0 &&
                operator !== "" &&
                rightOperand !== 0 &&
                operators[operator](leftOperand, rightOperand) !== 0;
        },
        calculate = function() {
            if (!isOperationValid()) {
                throw Error("Impossible to calculate.");
            }

            var
                operation = map.currentOperation,
                result = operators[operation.operator](operation.leftOperand, operation.rightOperand);

            map.currentOperation = getBlankOperation();
            map.plaques.push(result);
            map.history.push(map.plaques.slice());

            console.log("History after calculate:")
            console.log(map.history);
        },

        // initialization
        init = function() {
            initTarget();
            initPlaques();
            initOperation();
            initHistory();
        },
        initTarget = function() {
            map.target = getRandomInt(100, 999);
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
        initHistory = function() {
            map.history = [];
        },
        getRandomInt = function(minimum, maximum) {
            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        },

        // Game routines
        selectOperand = function(index) {
            console.log("Select operand index: '" + index + "'");

            if (!isOperandSelectable()) {
                throw Error("Illegal operation: operator is already selected.");
            }

            if (index >= map.plaques.length) {
                throw Error("Index of bounds.");
            }

            var
                operation = map.currentOperation,
                actualPlaques = map.plaques.slice(),
                value = map.plaques.splice(index, 1)[0];

            if (operation.leftOperand === 0) {
                map.history.push(actualPlaques);
                operation.leftOperand = value;
            } else if (operation.rightOperand === 0) {
                operation.rightOperand = value;
            }
        },
        selectOperator = function(operator) {
            console.log("Operator '" + operator + "' clicked");

            if (isOperandSelectable()) {
                throw Error("Illegal operation: operator is already selected.");
            }

            map.currentOperation.operator = operator;
        },
        isOperandSelectable = function() {
            var operation = map.currentOperation;
            return (operation.leftOperand === 0 || operation.rightOperand === 0)  && !isOperatorSelectable();
        },
        isOperatorSelectable = function() {
            var operation = map.currentOperation;
            return operation.leftOperand !== 0 && operation.operator === "" && operation.rightOperand === 0
        },

        cancel = function() {
            console.log("Cancelling.");

            var old = map.history.pop();

            console.log("old: " + old);
            console.log("new history: " + map.history);

            map.plaques = old.slice();
            map.currentOperation = getBlankOperation();
        },
        isCancellable = function() {
            return map.plaques.length !== 6;
        },

        isWon = function() {
            var
                plaques = map.plaques,
                target = map.target;

            return plaques.indexOf(target) >= 0;
        };

    return {
        map: map,
        operators: operators,
        init: init,
        selectOperand: selectOperand,
        selectOperator: selectOperator,
        isOperandSelectable: isOperandSelectable,
        isOperatorSelectable: isOperatorSelectable,
        cancel: cancel,
        isCancellable: isCancellable,
        isWon: isWon,
        isOperationValid: isOperationValid,
        calculate: calculate
    };
})(jQuery);