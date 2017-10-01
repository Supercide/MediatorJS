import { Message } from './Message';
import { IMessageHandler } from './IMessageHandler';
import { IMessageHandlerFactoryBase } from './IMessageHandlerFactoryBase';

export interface IMessageHandlerFactory<T extends Message> extends IMessageHandlerFactoryBase {
    create(): IMessageHandler<T>;
}