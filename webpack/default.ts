import path from 'path';
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CSSExtractPlugin from 'mini-css-extract-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const ROOT_DIR = path.resolve(__dirname, '..');
export const SRC_DIR = path.resolve(ROOT_DIR, 'src');
export const BUILD_DIR = path.resolve(ROOT_DIR, 'dist');
export const ASSETS_DIR = path.resolve(SRC_DIR, 'assets');
export const VERSION = process.env.VERSION || "v0.0.0-0-g0000000"

export default (_: webpack.Configuration): webpack.Configuration => ({
    context: ROOT_DIR,
    entry: {
        bundle: path.resolve(SRC_DIR, 'index.tsx')
    },
    stats: 'normal',
    output: {
        path: BUILD_DIR,
        filename: 'assets/[name].[chunkhash:8].js',
        pathinfo: true,
        publicPath: '/'
    },
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.gql'],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: path.resolve(ROOT_DIR, 'tsconfig.json')
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/

            }, {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    publicPath: './assets/images',
                    outputPath: './assets/images'
                }
            }, {
                test: /\.css$/i,
                use: [CSSExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    CSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                exportLocalsConvention: "camelCase",
                            },
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [ASSETS_DIR]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: path.join(SRC_DIR, 'index.ejs'),
            inject: 'body',
            favicon: path.join(ASSETS_DIR, 'favicon.ico')
        }),
        new CSSExtractPlugin({
            filename: 'assets/bundle.[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(VERSION),
        })
    ]
})