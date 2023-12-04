


import {RuleInterface} from "../rule-interface";
export class FizzBuzzRule<T> implements RuleInterface<T> {
    matches(number: T): boolean {
        return parseInt(String(number)) % 3 === 0 &&
            parseInt(String(number)) % 5 === 0;
    }

    getReplacement(): string {
        return 'FizzBuzz';
    }
}