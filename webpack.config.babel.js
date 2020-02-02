import path from 'path';
import fs from 'fs';

require('dotenv').config();
import app from './app.json';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
//import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';
import PurgecssPlugin from 'purgecss-webpack-plugin';
import glob from 'glob-all';
import tailwindcss from 'tailwindcss';
import RobotstxtPlugin from 'robotstxt-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';

module.exports = (env, argv) => {
	const dirDist = path.resolve(__dirname, 'dist');
	const dirSrc = path.resolve(__dirname, 'src');
	const dev = argv.mode !== 'production';

	let serveHttps = false;
	if (process.env.SSL_KEY && process.env.SSL_CRT && process.env.SSL_PEM) {
		serveHttps = {
			key: fs.readFileSync(process.env.SSL_KEY),
			cert: fs.readFileSync(process.env.SSL_CRT),
			ca: fs.readFileSync(process.env.SSL_PEM),
		};
	}

	return {
		entry: {
			app: `${dirSrc}/index.js`,
		},
		devServer: {
			contentBase: dirDist,
			compress: true,
			port: process.env.PORT || 8080,
			https: serveHttps,
			hot: true,
			historyApiFallback: true,
		},
		output: {
			path: dirDist,
			filename: 'assets/[name]-[hash].js',
			publicPath: '/',
		},
		devtool: dev ? `cheap-module-eval-source-map` : undefined,
		plugins: [
			new CleanWebpackPlugin({
				cleanStaleWebpackAssets: false,
			}),
			new MiniCssExtractPlugin({
				filename: dev ? 'assets/[name].css' : 'assets/[name].[hash].css',
				chunkFilename: dev
					? 'assets/[name].[id].css'
					: 'assets/[name].[id].[hash].css',
			}),
			new PurgecssPlugin({
				paths: glob.sync([`${dirSrc}/**/*.jsx`, `${dirSrc}/index.html`]),
			}),
			new CopyWebpackPlugin([
				{
					from: 'src/static',
					to: 'assets/static',
				},
			]),
			new HtmlWebpackPlugin({
				title: app.title,
				description: app.description,
				template: 'src/index.html',
				filename: './index.html',
				chunksSortMode: 'none',
				minify: dev
					? false
					: {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true,
					},
			}),
			new WebpackPwaManifest({
				name: app.title,
				short_name: app.short,
				description: app.description,
				theme_color: app.color,
				background_color: app.colorbkg,
				display: 'standalone',
				crossorigin: 'use-credentials',
				icons: [
					{
						src: path.resolve('./src/assets/favicon.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icon'),
						ios: true,
					},
				],
				share_target: {
					action: '/',
					method: 'GET',
					params: {
						title: 'title',
						text: 'text',
						url: 'url',
					},
				},
			}),
			new GenerateSW({
				importWorkboxFrom: 'local',
				include: [/\.html$/, /\.js$/, /\.css$/],
				importsDirectory: 'wb-assets',
				exclude: [/app\.css$/],
				runtimeCaching: [
					{
						urlPattern: new RegExp(/\.(?:png|gif|jpg|svg|ico|webp)$/),
						handler: 'CacheFirst',
						options: {
							cacheName: 'image-cache',
						},
					},
					{
						urlPattern: new RegExp(/\.html$/),
						handler: 'NetworkFirst',
						options: {
							cacheName: 'index-cache',
						},
					},
				],
				navigateFallback: 'index.html',
				skipWaiting: true,
			}),
			new RobotstxtPlugin({
				sitemap: 'https://ytaud.io/sitemap.xml',
				host: 'https://ytaud.io',
			}),
			new SitemapPlugin('https://ytaud.io', ['/', '/about/']),
		],
		module: {
			rules: [
				{
					test: /\.svg$/,
					exclude: /node_modules/,
					loader: ['babel-loader', 'raw-loader'],
				},
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpg|gif)$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]',
					},
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: dev,
								//reloadAll: true,
							},
						},
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('postcss-nested'),
									tailwindcss('./tailwind.config.js'),
									require('autoprefixer'),
								],
							},
						},
					],
				},
			],
		},
		resolve: {
			alias: {
				'@app': dirSrc + '/app',
				'@assets': dirSrc + '/assets',
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			},
			extensions: ['.js', '.jsx'],
		},
	};
};