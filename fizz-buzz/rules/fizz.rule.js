"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FizzRule = void 0;
class FizzRule {
    matches(number) {
        return parseInt(String(number), 10) % 3 === 0;
    }
    getReplacement() {
        return 'Fizz';
    }
}
exports.FizzRule = FizzRule;
