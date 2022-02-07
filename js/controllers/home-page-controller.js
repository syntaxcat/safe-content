'use strict';

function onLogin(ev) {
	ev.preventDefault();
	const elUsername = document.querySelector('input[name=username]');
	const elPassword = document.querySelector('input[name=password]');
	const username = elUsername.value;
	const password = elPassword.value;
	console.log('USER', username);
	console.log('PAS', password);
	if (username.trim() === '' || password.trim() === '') return;
	const user = doLogin(username, password);
	if (user === null) return;
	if (user.isAdmin) {
		document.querySelector('.admin-link').style.display = 'inline-block';
	}
	document.querySelector('.secret-content-container').style.display = 'flex';
	document.querySelector('.login-form').style.display = 'none';
	document.querySelector('h1').innerText = 'Welcome back: ' + user.username + '!';
	console.log('USER', user);
}

function onLogout() {
	document.querySelector('.admin-link').style.display = 'none';
	document.querySelector('.secret-content-container').style.display = 'none';
	document.querySelector('.login-form').style.display = 'block';
	document.querySelector('h1').innerText = 'Sign in!';
	doLogout();
}
