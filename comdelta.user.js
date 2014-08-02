// ==UserScript==
// @name Leprosorium comment rating delta
// @description Show rating change near comment rating on user page
// @include /^https://leprosorium.ru/users/[^/]+/comments/
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-end
// ==/UserScript==
var colors = {
	'red': ['#9c6666', '#ffaaaa'],
	'green': ['#669c66', '#aaffaa']
}

function get_id(vote_container) {
	var chunks = vote_container.id.split('_');
	return parseInt(chunks[chunks.length-1], 10);
}

function force_sign(x) {
	if (x < 0)
		return String(x);
	return '+'+String(x);
}

function add_popup(vote_container) {
	var current_value = parseInt(vote_container.querySelector('strong').innerHTML, 10);
	var key = 'rating_' + get_id(vote_container);
	var last_value = GM_getValue(key, 0);
	if (last_value == current_value)
		return;
	GM_setValue(key, current_value);
	var color = colors[current_value < last_value ? 'red' : 'green'];
	var popup = document.createElement('strong');
	popup.className = 'vote_result';
	popup.style = 'right: 28px; color:' + color[0] + '; background-color:' + color[1];
	popup.innerHTML = force_sign(current_value - last_value);
	vote_container.appendChild(popup);
}
[].map.call(document.querySelectorAll('.comment .vote'), add_popup);
