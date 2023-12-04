export interface RuleInterface<T> {
    matches(number: T): boolean | Promise<boolean>;
    getReplacement(): any | Promise<any>;
}