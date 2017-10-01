import { Dictionary } from './Dictionary';
import { Message } from './Message';
import { IMessageHandlerFactoryBase } from './IMessageHandlerFactoryBase';
import { IMessageHandlerFactory } from './IMessageHandlerFactory';

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
