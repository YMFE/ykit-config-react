'use strict';

var path = require('path');
var HappyPack = require('happypack');

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    var happyPackConfig = {
        loaders: [
            {
                loader: require.resolve('babel-loader'),
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: [
                        ["es2015", {"loose": true}],
                        'es2017',
                        'react',
                        'stage-0',
                        'stage-1',
                        'stage-2',
                    ],
                    plugins: ['transform-runtime']
                }
            }
        ],
        threads: 4,
        verbose: false,
        cacheContext: {
            env: process.env.NODE_ENV
        },
        tempDir: path.join(cwd, 'node_modules/.happypack'),
        cachePath: path.join(cwd, 'node_modules/.happypack/cache--[id].json')
    };
    happyPackConfig = options.modifyHappypack ? options.modifyHappypack(happyPackConfig) : happyPackConfig;

    extend(true, baseConfig, {
        module: {
            loaders: baseConfig.module.loaders.concat([{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loaders: ['happypack/loader']
            }])
        },
        plugins: baseConfig.plugins.concat([
            new HappyPack(happyPackConfig),
            new this.webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(this.env === 'prd' ? 'production' : 'dev')
                }
            })
        ])
    });
};
