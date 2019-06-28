// import CopyWebpackPlugin from 'copy-webpack-plugin';
import preactCliSwPrecachePlugin from 'preact-cli-sw-precache';

export default (config, env, helpers) => {
	if (env.isProd) {
		// causes build error: cannot read property emit of undefined
		// config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src`, from: `*.*` }]) );

		// Make async work
		let babel = config.module.loaders.filter(loader => loader.loader === 'babel-loader')[0].options;
		// Blacklist regenerator within env preset:
		babel.presets[0][1].exclude.push('transform-async-to-generator');
		// Add fast-async
		babel.plugins.push([require.resolve('fast-async'), {
			spec: true
		}]);
	}
	const precacheConfig = {
		staticFileGlobs: [
			'build/assets/**.svg',
			'build/assets/**.png',
			'build/assets/favicon.ico',
			'build/**.html',
			'build/**.js',
			'build/**.css',
			'build/**.json'
		],
		runtimeCaching: [{
			urlPattern: /^https:\/\/unpkg\.com\/|^https:\/\/fonts\.google\.com\//,
			handler: 'cacheFirst'
		}],
		stripPrefix: 'build/',
		minify: true,
		navigateFallback: 'index.html',
		clientsClaim: true,
		skipWaiting: true
	};
	return preactCliSwPrecachePlugin(config, precacheConfig);

};