export class Dictionary<TKey, TValue> {
    private _internalState: {};

    containsKey(key: TKey): any;

    add(key: TKey, value: TValue) ;

    get(key: TKey): TValue;
}

export interface IMessageHandler<T extends Message> extends IMessageHandlerBase {
    handle(message: T);
}

export interface IMessageHandlerBase {
    handle(message: Message);
}

export interface IMessageHandlerFactory<T extends Message> extends IMessageHandlerFactoryBase {
    create(): IMessageHandler<T>;
}

export interface IMessageHandlerFactoryBase {
    create(): IMessageHandlerBase;
}


export class Mediator {
    
        private _handlers: Dictionary<string, IMessageHandlerFactoryBase[]>;
    
        constructor();
    
        public publish<T extends Message>(message: T);
    
        public registerHandler<T extends Message>(message: T, handlerFactory: IMessageHandlerFactory<T>);

        private getMessageType<T extends Message>(message: T);
    }

    export abstract class Message {
        messageType: string;
    
        protected constructor(type: string);
    }