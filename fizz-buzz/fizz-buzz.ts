import {FizzBuzzRule} from "./rules/fizzBuzz.rule";
import {FizzRule} from "./rules/fizz.rule";
import {BuzzRule} from "./rules/buzz.rule";
import {RuleInterface} from "./rule-interface";

class NumberListReplacer<T>
{
    rules: RuleInterface<T>[] = [];


    private outputHandler: ((output: T[]) => void) | undefined;

    private numberGenerator: (() => T[]) | undefined;

    setOutputHandler(handler: (output: T[]) => void) {
        this.outputHandler = handler;
    }


    handleOutput(output: T[]):any {
        if (this.outputHandler) {
            this.outputHandler(output);
        } else {
            console.log(output.join(", "));
        }
    }

    setNumberGenerator(generator: () => T[]): void {
        this.numberGenerator = generator;
    }
    addRule(ruleFactory: () => RuleInterface<T>): void {
        this.rules.push(ruleFactory());
    }

    generateNumbers(): T[] {
        if (this.numberGenerator) {
            return this.numberGenerator();
        }
        // @ts-ignore
        return Array.from({ length: 100 }, (_, i) => i + 1) as T[];
    }

    generate(): any {
        let output: T[] = [];

        for (let customNumber of this.generateNumbers()) {
            output.push(this.getReplacement(customNumber));
        }

        return this.handleOutput(output);
    }

    private isSingleItem(value: T | T[]): value is T {
        return !Array.isArray(value);
    }
    check(value: T | T[]): void {
        let output: T[] = [];

        if (this.isSingleItem(value)) {
            output.push(this.getReplacement(value));
        } else {
            for (const item of value) {
                output.push(this.getReplacement(item));
            }
        }

        this.handleOutput(output);
    }



    getReplacement(number: T): any {
        for (let rule of this.rules) {
            if (rule.matches(number)) {
                return rule.getReplacement();
            }
        }
        return String(number);
    }
}


const stringReplacer = new NumberListReplacer<number>();
stringReplacer.addRule(() => new FizzBuzzRule<number>());

stringReplacer.addRule(() => new FizzRule<number>());
stringReplacer.addRule(() => new BuzzRule<number>());


stringReplacer.setOutputHandler((output: any[]) => {
    console.log("Custom String Output: " + output.join(", "));
});
 stringReplacer.check([15, 2, 44, 3, 10, 5])
stringReplacer.check(15)

stringReplacer.generate();
