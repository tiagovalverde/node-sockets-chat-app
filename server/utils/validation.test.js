const expect = require('expect');
let {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    })

    it('should reject string with only spaces', () => {
        var res = isRealString('       ');
        expect(res).toBe(false);
    })

    it('should allow a string with non-space characters', () => {
        var res = isRealString('  Tiago Valverde  ');
        expect(res).toBe(true);
    })
});
