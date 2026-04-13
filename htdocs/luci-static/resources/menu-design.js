'use strict';
'require base';
'require ui';
'require rpc';

return base.view.extend({
	render: function(tree) {
		var menu = document.querySelector('#mainmenu');
		if (!menu) return;

		var ul = document.createElement('ul');
		ul.className = 'nav';

		var renderMenu = function(parent, children) {
			for (var key in children) {
				var node = children[key];
				if (node.hidden || !node.title) continue;

				var li = document.createElement('li');
				var a = document.createElement('a');
				a.appendChild(document.createTextNode(node.title));
				
				if (node.children) {
					li.className = 'slide';
					a.href = '#';
					li.appendChild(a);
					var sub_ul = document.createElement('ul');
					renderMenu(sub_ul, node.children);
					li.appendChild(sub_ul);
				} else {
					a.href = L.url(node.path);
					li.appendChild(a);
				}
				parent.appendChild(li);
			}
		};

		renderMenu(ul, tree.children);
		menu.appendChild(ul);
		menu.style.display = '';

		// 激活当前菜单项
		var currentPath = window.location.pathname;
		menu.querySelectorAll('a').forEach(function(el) {
			if (el.href === window.location.origin + currentPath) {
				el.classList.add('active');
				var parent = el.closest('.slide');
				if (parent) parent.classList.add('active');
			}
		});
	}
});
