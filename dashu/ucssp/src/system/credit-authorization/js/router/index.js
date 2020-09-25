module.exports = {
	name: 'authorization',
	path: '/system/authorization/index',
	meta: {
		requireAuth: true
	},
	component: (resolve) => require(['@system/credit-authorization/index'], resolve),
	children: [{
		name: 'authorization_pending',
		path: '/system/authorization/pending',
		component: resolve => require(['@system/credit-authorization/authorization/pending'], resolve)
	}, {
		name: 'authorization_processed',
		path: '/system/authorization/processed',
		component: resolve => require(['@system/credit-authorization/authorization/processed'], resolve)
	}, {
		name: 'authorization_regresses',
		path: '/system/authorization/regresses',
		component: resolve => require(['@system/credit-authorization/authorization/regresses'], resolve)
	}]
};
