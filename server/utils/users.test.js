const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Rita',
            room: 'Yatch Club'
        },
        {
            id: '2',
            name: 'Kenny',
            room: 'Manga fans'
        },
        {
            id: '3',
            name: 'Tony',
            room: 'Yatch Club'
        }];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'John',
            room: 'The Lambo room'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for yatch club', () => {
        var userList = users.getUserList('Yatch Club');
        expect(userList).toEqual(['Rita', 'Tony']);
    });

    it('should return names for manga fans', () => {
        var userList = users.getUserList('Manga fans');
        expect(userList).toEqual(['Kenny']);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });

    it('should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = '88';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

});