import {RuleInterface} from "../rule-interface";
export class FizzRule<T> implements RuleInterface<T> {
    matches(number: T): boolean {
        return parseInt(String(number), 10) % 3 === 0;
    }

    getReplacement(): string {
        return 'Fizz';
    }
}