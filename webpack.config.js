const path = require("path");
const fs=require("fs");
const mock=require("mockjs");
const webpack=require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: path.join(__dirname, "src/app.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "vue-style-loader"]
                })
            },
            {
                test: /\.(jpg|png|gif)/,
                loader: "file-loader"
            },
            {
                test: /\.(ttf|woff|woff2|eot)/,
                loader: "url-loader"
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    devServer: {
        host: "localhost",
        port: 8080,
        contentBase: ".",
        setup(app) {
            app.get("/mock", function(req, res,next) {
               res.writeHead(200,{
                   "Content-type": "text/json;charset=utf8",
                   "Access-Control-Allow-Origin": "*"
               });
                let filepath = path.join(__dirname, "src/Data/imgs.json");
                fs.readFile(filepath, function(err, data) {
                    if (err) return console.error(err);
                    res.end(data);
                });
               //if (req.url = "/mock") {
               //    let arr = [];
               //    for (var i = 0; i < 5; i++) {
               //        arr.push(mock.mock({
               //            "name": "@name",
               //            "url": `./src/images/${(i+1)}.jpg`,
               //        }));
               //    }
               //    res.end(JSON.stringify(arr));
               //}
            });
        }
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"common.js"
        }),
        new HtmlWebpackPlugin({
            title: "index",
            filename: 'index.html',
            template: "./index.html",
            inject: "body",
            hash: true
        })
    ]
}