const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ScriptKind } = require('react-remove-props-loader');

const result = {};

result.plugins = [
	new ESLintPlugin({
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	}),
	new HtmlWebpackPlugin({
		template: './public/index.html',
	}),
	new Dotenv(),
	new MiniCssExtractPlugin({
		filename: 'styles/[name].css',
	}),
	new CleanWebpackPlugin(),
];

result.module = {
	rules: [
		{
			test: /\.(js|jsx|ts|tsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader'],
		},
		{
			test: /\.(ts)x?$/,
			exclude: /node_modules/,
			use: {
				loader: 'ts-loader',
			},
		},
		process.env.NODE_ENV === 'production' && {
			test: /\.tsx?$/,
			use: [
				{
					loader: 'react-remove-props-loader',
					options: {
						props: ['data-testid'],
						scriptKind: ScriptKind.TSX,
						removeFromObjects: true,
					},
				},
			],
		},
		{
			test: /\.css$/,
			exclude: /\.module\.css$/,
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.module\.css$/i,
			exclude: /node_modules/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
					},
				},
			],
		},
		{
			test: /\.(jpg|jpeg|png|svg)$/,
			type: 'asset/resource',
			generator: {
				filename: 'images/[name][ext][query]',
			},
		},
		{
			test: /\.(woff(2)?|eot|ttf|otf)$/,
			type: 'asset/resource',
			generator: {
				filename: 'fonts/[name][ext][query]',
			},
		},
	],
};

result.optimization = {
	splitChunks: {
		chunks: 'all',
	},
};

if (process.env.NODE_ENV === 'production') {
	result.optimization = {
		...result.optimization,
		minimize: true,
		minimizer: [new TerserPlugin()],
	};
}

module.exports = result;
