import {RuleInterface} from "../rule-interface";

export class BuzzRule<T> implements RuleInterface<T> {
    matches(number: T): boolean {
        return parseInt(String(number), 10) % 5 === 0;

    }

    getReplacement(): string {
        return 'Fizz';
    }
}