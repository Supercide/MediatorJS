export abstract class Message {
    messageType: string;

    protected constructor(type: string) {
        this.messageType = type;
    }
}