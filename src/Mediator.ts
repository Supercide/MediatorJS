export interface IMessageHandler<T extends Message> extends IMessageHandlerBase {
    handle(message: T);
}

export interface IMessageHandlerBase {
    handle(message: Message);
}

// tslint:disable-next-line:max-classes-per-file
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

// tslint:disable-next-line:max-classes-per-file
export class Mediator {

    private _handlers: Dictionary<string, IMessageHandlerFactoryBase[]>;

    constructor() {
        this._handlers = new Dictionary<string, IMessageHandlerFactoryBase[]>();    
    }

    public publish<T extends Message>(message: T): void {

        const type = this.getMessageType(message);

        const factories = this._handlers.get(type);

        factories.forEach((factory) => {
            const handler = factory.create();
            
            handler.handle(JSON.parse(JSON.stringify(message)));
        });
    }

    public registerHandler<T extends Message>(message: T, handlerFactory: IMessageHandlerFactory<T>) {
        // throw if hash already exists
        const messageType = this.getMessageType(message);
        
        if (this._handlers.containsKey(messageType)) {
            const factories = this._handlers.get(messageType);
            factories.push(handlerFactory);
        } else {
            this._handlers.add(messageType, [handlerFactory]);
        }

        
    }

    private getMessageType<T extends Message>(message: T): string {
        return message.messageType;
    }
}

// tslint:disable-next-line:max-classes-per-file

export abstract class Message {
    messageType: string;

    protected constructor(type: string) {
        this.messageType = type;
    }
}

interface IMessageHandlerFactoryBase  {
    create(): IMessageHandlerBase;
}

interface IMessageHandlerFactory<T extends Message > extends IMessageHandlerFactoryBase {
    create(): IMessageHandler<T>;
}
