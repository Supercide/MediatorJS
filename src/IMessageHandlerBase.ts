import { Message } from './Message';

export interface IMessageHandlerBase {
    handle(message: Message);
}