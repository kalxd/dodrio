const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtraPlugin = require("mini-css-extract-plugin");

const config = {
	mode: "development",
	entry: "./src/main.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-typescript"]
					}
				}
			},
			{
				test: /\.css$/,
				use: [MiniCssExtraPlugin.loader, "css-loader"]
			},
			{
				test: /\.(ttf|eot|woff(2)?|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "file-loader"
				}
			}
		]
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},

	output: {
		filename: "main.js",
		path: Path.resolve(".", "dist")
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "",
			hash: true,
			// template: "./webpack/template.html"
		}),

		new MiniCssExtraPlugin()
	]
};

module.exports = config;
