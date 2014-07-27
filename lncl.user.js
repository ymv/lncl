// ==UserScript==
// @name Leprosorium new comment links
// @description Add next/previous links to new comments
// @include https://leprosorium.ru/comments/*
// @run-at document-end
// ==/UserScript==

function add_link(container, target, title) {
	var link = document.createElement('a');
	link.innerHTML = title;
	link.href = '#'+target.id;
	link.className = 'c_previous';
	container.appendChild(link);
}
function add_text(container, text) {
	var e = document.createTextNode(text);
	container.appendChild(e);
}
function add_links(new_posts) {
	if (new_posts.length < 2)
		return;
	var l = new_posts.length;
	for (var i = 0; i < l; i++) {
		var footer = new_posts[i].querySelector('.ddi');
		add_text(footer, 'Новое: ');
		if (i > 0)
			add_link(footer, new_posts[i-1], '↑');
		add_text(footer, ' ');
		if (i < l - 1)
			add_link(footer, new_posts[i+1], '↓');
	}
}
add_links(document.querySelectorAll('.comment.new'));
