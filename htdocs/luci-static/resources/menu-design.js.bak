'use strict';
'require baseclass';
'require ui';

return baseclass.extend({
	canonicalTitle(name, title) {
		const map = {
			quickstart: 'QuickStart',
			wizard: 'QuickStart',
			status: 'Status',
			system: 'System',
			services: 'Services',
			service: 'Services',
			network: 'Network',
			networkguide: 'NetworkGuide',
			istore: 'iStore',
			nas: 'NAS',
			modem: 'Modem',
			vpn: 'VPN',
			logout: 'Logout',
			reboot: 'Reboot',
			statistics: 'Statistics',
			control: 'Control',
			asterisk: 'Asterisk',
			bandwidth: 'Bandwidth Monitor'
		};

		return map[(name || '').toLowerCase()] || title || name || '';
	},

	isChildActive(modeName, childName, grandName) {
		if (L.env.dispatchpath[0] !== modeName || L.env.dispatchpath[1] !== childName)
			return false;

		if (grandName != null)
			return L.env.dispatchpath[2] === grandName;

		return L.env.dispatchpath.length <= 2 || L.env.dispatchpath[2] == null;
	},

	__init__() {
		ui.menu.load().then(L.bind(this.render, this));
	},

	render(tree) {
		this.renderModeMenu(tree);
		const activeMode = this.getActiveMode(tree);

		if (activeMode)
			this.renderSidebar(activeMode);

		if (L.env.dispatchpath.length >= 3) {
			let node = tree;
			let url = '';

			for (let i = 0; i < 3 && node; i++) {
				node = node.children[L.env.dispatchpath[i]];
				url = url + (url ? '/' : '') + L.env.dispatchpath[i];
			}

			if (node)
				this.renderTabMenu(node, url);
		}
	},

	getActiveMode(tree) {
		const children = ui.menu.getChildren(tree);
		for (let i = 0; i < children.length; i++) {
			if (L.env.requestpath.length ? children[i].name === L.env.requestpath[0] : i === 0)
				return children[i];
		}

		return children[0] || null;
	},

	renderModeMenu(tree) {
		const ul = document.querySelector('#modemenu');
		if (!ul)
			return;

		const children = ui.menu.getChildren(tree);
		children.forEach((child, index) => {
			const isActive = L.env.requestpath.length ? child.name === L.env.requestpath[0] : index === 0;
			ul.appendChild(E('li', { 'class': isActive ? 'active' : '' }, [
				E('a', { 'href': L.url(child.name) }, [ _(child.title) ])
			]));
		});

		if (ul.children.length > 1)
			ul.style.display = '';
	},

	renderSidebar(modeNode) {
		const ul = document.querySelector('#designmenu');
		const menuWrap = document.querySelector('.main-left');
		if (!ul || !menuWrap)
			return;

		ul.innerHTML = '';
		const children = ui.menu.getChildren(modeNode);
		children.forEach((child) => {
			const subChildren = ui.menu.getChildren(child);
			const li = E('li', { 'class': 'slide' });
			const canonical = this.canonicalTitle(child.name, child.title);

			if (subChildren.length) {
				const isGroupActive = subChildren.some((grand) => this.isChildActive(modeNode.name, child.name, grand.name));
				const toggle = E('a', {
					'class': 'menu' + (isGroupActive ? ' active' : ''),
					'href': '#',
					'data-title': canonical,
					'data-name': child.name
				}, [ _(child.title) ]);
				const sub = E('ul', { 'class': 'slide-menu' + (isGroupActive ? ' active' : ''), 'style': isGroupActive ? 'display:block' : 'display:none' });

				subChildren.forEach((grand) => {
					const isActive = this.isChildActive(modeNode.name, child.name, grand.name);
					sub.appendChild(E('li', { 'class': isActive ? 'active' : '' }, [
						E('a', {
							'href': L.url(modeNode.name, child.name, grand.name),
							'data-title': this.canonicalTitle(grand.name, grand.title),
							'data-name': grand.name
						}, [ _(grand.title) ])
					]));
				});

				li.appendChild(toggle);
				li.appendChild(sub);
			}
			else {
				li.className = 'slide' + (this.isChildActive(modeNode.name, child.name) ? ' active' : '');
				li.appendChild(E('a', {
					'class': 'menu2',
					'href': L.url(modeNode.name, child.name),
					'data-title': canonical,
					'data-name': child.name
				}, [ _(child.title) ]));
			}

			ul.appendChild(li);
		});

		ul.style.display = '';
		menuWrap.style.display = '';
	},

	renderTabMenu(tree, url, level) {
		const container = document.querySelector('#tabmenu');
		if (!container)
			return E([]);

		const ul = E('ul', { 'class': 'tabs' });
		const children = ui.menu.getChildren(tree);
		let activeNode = null;

		children.forEach((child) => {
			const isActive = (L.env.dispatchpath[3 + (level || 0)] === child.name);
			ul.appendChild(E('li', {
				'class': 'tabmenu-item-%s%s'.format(child.name, isActive ? ' active' : '')
			}, [
				E('a', { 'href': L.url(url, child.name) }, [ _(child.title) ])
			]));
			if (isActive)
				activeNode = child;
		});

		if (!ul.children.length)
			return E([]);

		container.appendChild(ul);
		container.style.display = '';

		if (activeNode)
			this.renderTabMenu(activeNode, url + '/' + activeNode.name, (level || 0) + 1);

		return ul;
	}
});
