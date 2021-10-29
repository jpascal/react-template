import * as webpack from "webpack";
import {merge} from 'webpack-merge';
import defaultConfiguration from './default';
import {config} from "./plugins/config";

export default (env: webpack.Configuration): webpack.Configuration => merge(defaultConfiguration(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000/',
                secure: false,
                changeOrigin: true,
            },
        }
    },
    plugins: [
        config(env, 'development')
    ],
} as webpack.Configuration);