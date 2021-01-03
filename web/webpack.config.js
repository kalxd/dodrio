const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtraPlugin = require("mini-css-extract-plugin");

const config = {
	mode: "development",
	entry: "./src/main.js",
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"]
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
		extensions: [".js", ".jsx"]
	},

	output: {
		filename: "main.js",
		chunkFilename: "[id].chunk.js",
		path: Path.resolve(".", "dist")
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "",
			hash: true,
		}),

		new MiniCssExtraPlugin()
	],

	optimization: {
		splitChunks: {
			chunks: "all"
		}
	}
};

module.exports = config;
