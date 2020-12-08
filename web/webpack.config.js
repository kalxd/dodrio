const Path = require("path");

const config = {
	mode: "development",
	entry: "./src/main.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: "/node_modules/",
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-typescript"]
					}
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
	}
};

module.exports = config;
