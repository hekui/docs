# 与Webpack集成
你可以使用 `ts-loader`，它是一个TypeScript的加载器，结合`source-map-loader`方便调试。 运行：
```javascript
npm install ts-loader source-map-loader
```
并将下面的选项合并到你的webpack.config.js文件里：  
```javascript
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // Other options...
};
```
要注意的是`ts-loader`必须在其它处理.js文件的加载器之前运行。  