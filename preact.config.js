// import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config, env, helpers) => {
	if (env.isProd) {
		// causes build error: cannot read property emit of undefined
		// config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src`, from: `*.*` }]) );

		// Make async work
		let babel = config.module.loaders.filter( loader => loader.loader === 'babel-loader')[0].options;
		// Blacklist regenerator within env preset:
		babel.presets[0][1].exclude.push('transform-async-to-generator');
		// Add fast-async
		babel.plugins.push([require.resolve('fast-async'), { spec: true }]);
	}
};