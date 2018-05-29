const expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

    
    it('should generate correct message object', () => {
        let from = 'tiago';
        let text = 'some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        let from = 'Ana';
        let lat = 15;
        let long = 19;
        let url = `https://www.google.com/maps?q=15,19`;

        let message = generateLocationMessage(from, lat, long);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    }) 
});