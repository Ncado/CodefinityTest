"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FizzBuzzRule = void 0;
class FizzBuzzRule {
    matches(number) {
        return parseInt(String(number)) % 3 === 0 &&
            parseInt(String(number)) % 5 === 0;
    }
    getReplacement() {
        return 'FizzBuzz';
    }
}
exports.FizzBuzzRule = FizzBuzzRule;
