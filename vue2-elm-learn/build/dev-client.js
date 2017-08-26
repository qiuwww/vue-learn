/* eslint-disable */
// add hot-reload related code to entry chunks
// 重启服务器
require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
	if (event.action === 'reload') {
		window.location.reload()
	}
})