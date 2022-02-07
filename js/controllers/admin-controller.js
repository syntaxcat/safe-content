'use strict';

function init() {
	const loggedInUser = getLoggedInUser();
	if (loggedInUser === null || !loggedInUser.isAdmin) {
		alert('Nope!');
		window.location.href = '/index.html';
		return;
	}
	showTable();
}

function onSort(sortBy) {
	console.log('Filtering By:', sortBy);

	sortUsers(sortBy);
	showTable();
}

function showCards() {
	document.querySelector('.table-btn').classList.remove('selected');
	document.querySelector('.cards-btn').classList.add('selected');
	const users = getUsersToShow();
	var strHTMLs = users.map(
		(user) =>
			`<div class="card">
					<h2>
					${user.username}
					</h2>		
					<img src="./images/${user.img}">
				</div>
				`
	);
	document.querySelector('.users-container').innerHTML = `
		<div class="cards">
			${strHTMLs.join('')}
		</div>
	`;
}

function showTable() {
	document.querySelector('.cards-btn').classList.remove('selected');
	document.querySelector('.table-btn').classList.add('selected');
	const users = getUsersToShow();

	var strHTMLs = users.map(
		(user) =>
			`<tr>
				<td>${user.username}</td>
				<td>${user.password}</td>
				<td>${user.lastLoginTime}</td>
				<td>${user.isAdmin}</td>
			</tr>`
	);

	document.querySelector('.users-container').innerHTML = `
		<table class="users-table" cellpadding="10">
			<thead>
				<tr>
					<th>username</th>
					<th>password</th>
					<th>lastLoginTime</th>
					<th>isAdmin</th>
				</tr>
			</thead>
			<tbody>
				${strHTMLs.join('')}
			</tbody>
		</table>
	`;
}
