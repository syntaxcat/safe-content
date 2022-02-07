'use strict';

const USERS_STORAGE_KEY = 'usersDB';
const LOGGED_IN_USER_STORAGE_KEY = 'loggedinUser';
var gUsers;
_createUsers();

function _createUsers() {
	gUsers = loadFromStorage(USERS_STORAGE_KEY);
	if (!gUsers || !gUsers.length) {
		gUsers = [
			_createUser('shiri', 'omerIsTheKing', false, 'posh.png'),
			_createUser('admin', '1234', true, 'preppy.png'),
			_createUser('yaron', 'iHaveAPuki', false, 'rocker.png')
		];
		_saveUsers();
	}
}

function _createUser(username, password, isAdmin, img) {
	const user = {
		id: _makeId(),
		username: username,
		password: password,
		lastLoginTime: null,
		isAdmin: isAdmin,
		img: img
	};
	return user;
}

function _saveUsers() {
	saveToStorage(USERS_STORAGE_KEY, gUsers);
}

function _makeId(length = 5) {
	var txt = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return txt;
}

function getUsersToShow() {
	return gUsers;
}

function sortUsers(sortBy) {
	switch (sortBy) {
		case 'lastLoginTime':
			gUsers.sort((user1, user2) => user2.lastLoginTime - user1.lastLoginTime);
			break;
		case 'username':
			gUsers.sort((user1, user2) => {
				if (user1.username < user2.username) {
					return -1;
				} else if (user1.username > user2.username) {
					return 1;
				}
				return 0;
			});
			break;
		default:
			break;
	}
}

function doLogin(username, password) {
	const user = gUsers.find((user) => user.username === username && user.password === password);
	if (!user) {
		return null;
	} else {
		user.lastLoginTime = new Date().getTime();
		_saveUsers();
		saveToStorage(LOGGED_IN_USER_STORAGE_KEY, user);
		return user;
	}
}

function doLogout() {
	deletFromStorage(LOGGED_IN_USER_STORAGE_KEY);
}

function getLoggedInUser() {
	return loadFromStorage(LOGGED_IN_USER_STORAGE_KEY);
}
