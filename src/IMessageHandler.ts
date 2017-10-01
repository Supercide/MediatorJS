import { Message } from './Message';
import { IMessageHandlerBase } from './IMessageHandlerBase';

export interface IMessageHandler<T extends Message> extends IMessageHandlerBase {
    handle(message: T);
}
