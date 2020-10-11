const { hashPassword, comparePassword } = require('../../helpers/bcrypt')
const should = require('chai').should() //actually call the function

describe('Bcrypt', function () {
    describe('compare password', function () {
        it('should return true when compare is true', async function () {
            const pass = await hashPassword('test')
            const compare = await comparePassword('test', pass)
            compare.should.equal(true);

        });

        it('should return false when compare is false', async function () {
            const pass = await hashPassword('test')
            const compare = await comparePassword('test1', pass)
            compare.should.equal(false);
        });

    });
});