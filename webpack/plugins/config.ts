/// <reference path="../../typings/config.d.ts" />
import * as webpack from "webpack";

export const getConfig = (envName: Environment): Config => {
    switch (envName) {
    case 'development':
        return require('../../config/development.json');
    case 'production':
        return require('../../config/production.json');
    }
};

export const config = (_envWebpack: webpack.Configuration, envName: Environment, override?: (config: Config) => Config) => {
    let config = getConfig(envName);
    if (override) {
        config = override(config);
    }
    config.environment = envName
    return new webpack.DefinePlugin({
        CONFIG: JSON.stringify(config),
    });
};
