import { IMessageHandlerBase } from './IMessageHandlerBase';

export interface IMessageHandlerFactoryBase {
    create(): IMessageHandlerBase;
}