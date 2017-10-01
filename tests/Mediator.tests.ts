import { expect } from 'chai';
import * as sinon from 'sinon';
import { Mediator   } from '../src/Mediator';
import { IMessageHandler } from '../src/IMessageHandler';
import { Message } from '../src/Message';

class TestMessage extends Message {
    message: string;

    constructor() {
        super('TestMessage');
    }
}

// tslint:disable-next-line:max-classes-per-file
class TestMessageHandler implements IMessageHandler<TestMessage> {
    static messages: TestMessage[];

    handle(testMessage: TestMessage) {
        TestMessageHandler.messages.push(testMessage);
    }
}

// tslint:disable-next-line:max-classes-per-file
class TestModifyMessageHandler implements IMessageHandler<TestMessage> {
    static messages: TestMessage[];
    static modifyMessage: string = 'GoodBye';

    handle(testMessage: TestMessage) {
        testMessage.message = TestModifyMessageHandler.modifyMessage;
        TestModifyMessageHandler.messages.push(testMessage);
    }
}

describe('Mediator Tests', () => {
    
    let mediator: Mediator;

    beforeEach(() => {
        mediator = new Mediator();       
        TestMessageHandler.messages = [];
        TestModifyMessageHandler.messages = [];
    });
    
    afterEach(() => {
    });

    it('GivenTestHandler_WhenPublishingMessage_ThenCallsHandler_WithMessage', () => {
        mediator.registerHandler(new TestMessage(), { create: () => new TestMessageHandler() });

        const testMessage = new TestMessage();
        testMessage.message = 'Hello world';
        mediator.publish(testMessage);
        expect(TestMessageHandler.messages[0].message).to.equal(testMessage.message);
    });

    it('GivenTestHandler_WhenPublishingMessage_ThenCallsHandlerOnce', () => {
        mediator.registerHandler(new TestMessage(), { create: () => new TestMessageHandler() });
        
        const testMessage = new TestMessage();
        testMessage.message = 'Hello world';
        mediator.publish(testMessage);
        expect(TestMessageHandler.messages.length).to.equal(1);
    });

    it('GivenMultipleTestHandlers_WhenPublishingMessage_ThenCallsAllHandlers', () => {
        mediator.registerHandler(new TestMessage(), { create: () => new TestMessageHandler() });
        mediator.registerHandler(new TestMessage(), { create: () => new TestMessageHandler() });
        
        const testMessage = new TestMessage();
        testMessage.message = 'Hello world';
        mediator.publish(testMessage);
        expect(TestMessageHandler.messages.length).to.equal(2);
    });

    it('GivenMultipleTestHandlers_WhenPublishingMessage_AndFirstHandlerModifiesMessage_ThenOriginalMessageIsPassedToSecondHandler', () => {
        mediator.registerHandler(new TestMessage(), { create: () => new TestModifyMessageHandler() });
        mediator.registerHandler(new TestMessage(), { create: () => new TestMessageHandler() });
        const expectedMessage = 'Hello world';
        const expectedModifiedMessage = 'Goodbye';
        const testMessage = new TestMessage();
        testMessage.message = 'Hello world';
        mediator.publish(testMessage);

        expect(TestMessageHandler.messages[0].message).to.equal(expectedMessage);
        expect(TestModifyMessageHandler.messages[0].message).to.equal(TestModifyMessageHandler.modifyMessage);
    });
});
