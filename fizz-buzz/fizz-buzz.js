"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fizzBuzz_rule_1 = require("./rules/fizzBuzz.rule");
const fizz_rule_1 = require("./rules/fizz.rule");
const buzz_rule_1 = require("./rules/buzz.rule");
class NumberListReplacer {
    constructor() {
        this.rules = [];
    }
    setOutputHandler(handler) {
        this.outputHandler = handler;
    }
    handleOutput(output) {
        if (this.outputHandler) {
            this.outputHandler(output);
        }
        else {
            console.log(output.join(", "));
        }
    }
    setNumberGenerator(generator) {
        this.numberGenerator = generator;
    }
    addRule(ruleFactory) {
        this.rules.push(ruleFactory());
    }
    generateNumbers() {
        if (this.numberGenerator) {
            return this.numberGenerator();
        }
        // @ts-ignore
        return Array.from({ length: 100 }, (_, i) => i + 1);
    }
    generate() {
        let output = [];
        for (let customNumber of this.generateNumbers()) {
            output.push(this.getReplacement(customNumber));
        }
        return this.handleOutput(output);
    }
    isSingleItem(value) {
        return !Array.isArray(value);
    }
    check(value) {
        let output = [];
        if (this.isSingleItem(value)) {
            output.push(this.getReplacement(value));
        }
        else {
            for (const item of value) {
                output.push(this.getReplacement(item));
            }
        }
        this.handleOutput(output);
    }
    getReplacement(number) {
        for (let rule of this.rules) {
            if (rule.matches(number)) {
                return rule.getReplacement();
            }
        }
        return String(number);
    }
}
const stringReplacer = new NumberListReplacer();
stringReplacer.addRule(() => new fizzBuzz_rule_1.FizzBuzzRule());
stringReplacer.addRule(() => new fizz_rule_1.FizzRule());
stringReplacer.addRule(() => new buzz_rule_1.BuzzRule());
stringReplacer.setOutputHandler((output) => {
    console.log("Custom String Output: " + output.join(", "));
});
stringReplacer.check([15, 2, 44, 3, 10, 5]);
stringReplacer.check(15);
stringReplacer.generate();
