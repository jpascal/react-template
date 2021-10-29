import {Configuration} from "webpack";
import {merge} from 'webpack-merge';
import defaultConfiguration from './default';
import {config} from "./plugins/config";

export default (env: Configuration): Configuration => merge(defaultConfiguration(env), {
    mode: 'production',
    plugins: [
        config(env, 'production'),
    ]
} as Configuration);