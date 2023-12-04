"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuzzRule = void 0;
class BuzzRule {
    matches(number) {
        return parseInt(String(number), 10) % 5 === 0;
    }
    getReplacement() {
        return 'Fizz';
    }
}
exports.BuzzRule = BuzzRule;
