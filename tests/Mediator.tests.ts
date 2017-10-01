import { expect } from 'chai';
import * as sinon from 'sinon';
import { IMessageHandler, Mediator, Message   } from '../src/Mediator';

class TestMessage extends Message {
    message: string;

    constructor() {
        super('TestMessage');
    }
}

// tslint:disable-next-line:max-classes-per-file
class TestMessageHandler implements IMessageHandler<TestMessage> {
    static messages: TestMessage[];

    handle(message: TestMessage) {
        TestMessageHandler.messages.push(message);
    }
}

describe('Mediator Tests', () => {
    
    let mediator: Mediator;

    beforeEach(() => {
        mediator = new Mediator();
        mediator.registerHandler(new TestMessage(), { create: () => new TestMessageHandler() });
        TestMessageHandler.messages = [];
    });
    
    afterEach(() => {
    });

    it('GivenTestHandler_WhenPublishingMessage_ThenCallsHandler_WithMessage', () => {
        const testMessage = new TestMessage();
        testMessage.message = 'Hello world';
        mediator.publish(testMessage);
        expect(TestMessageHandler.messages[0].message).to.equal(testMessage.message);
    });

    it('GivenTestHandler_WhenPublishingMessage_ThenCallsHandlerOnce', () => {
        const testMessage = new TestMessage();
        testMessage.message = 'Hello world';
        mediator.publish(testMessage);
        expect(TestMessageHandler.messages.length).to.equal(1);
    });
});
