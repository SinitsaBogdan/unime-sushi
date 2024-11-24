const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: path.resolve(__dirname, '../index.tsx'),
	output: {
		path: path.join(__dirname, '../../build'),
		filename: 'js/[name]-[hash].js',
		assetModuleFilename: 'assets/images/[name]-[hash][ext]',
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.png', '.svg', '.jpg'],
		alias: {
			'@pages': path.resolve(__dirname, './pages'),
		},
	},
	devServer: {
		allowedHosts: 'all',
		compress: true,
		port: 4000,
		hot: true,
		client: {
			logging: 'info',
		},
	},
};
