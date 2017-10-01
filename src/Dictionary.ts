export class Dictionary<TKey, TValue> {
    private _internalState: {} = {};

    containsKey(key: TKey): any {
        return this._internalState.hasOwnProperty(`${key}`);
    }

    add(key: TKey, value: TValue) {
        this._internalState[`${key}`] = value;
    }

    get(key: TKey): TValue {
        return this._internalState[`${key}`];
    }
}