module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,png,jpg,js}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};