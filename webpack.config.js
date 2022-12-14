const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { title } = require('process');

isDev = true;
idProd = !isDev;

const generateHtmlPlugin = title => {
    return new HtmlWebpackPlugin({
        title,
        favicon: "./src/assets/icons/favico.png",
        filename: `${title.toLowerCase()}.html`,
        template: `./src/pages/${title.toLowerCase()}/${title.toLowerCase()}.html`,
        chunks: [`${title.toLowerCase()}`]
    })
}

const populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
        res.push(generateHtmlPlugin(page));

    });
    return res;
}

const pages = populateHtmlPlugins(['index']);
console.log(__dirname)

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/pages/index/index.js'),
        // donate: path.resolve(__dirname, './src/pages/donate/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pages/[name]/[name]bundle.js',
        assetModuleFilename: 'assets/images/[name][ext]'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 9000,
      },
    
    mode: 'development',
    plugins: [
        ...pages,
        new MiniCssExtractPlugin({
            filename: 'pages/[name]/styles/[name].css'
        }),
        // new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(mp3||wav)$/,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },


                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }

                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,
                // 'style-loader',
                // 'css-loader'
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(ttf|woff2?|eot)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[ext]'
                }
            }

        ]
    }
}