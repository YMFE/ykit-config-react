'use strict';

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    extend(true, baseConfig, {
        module: {
            loaders: baseConfig.module.loaders.concat ([{
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                        'es2017',
                        'react',
                        'stage-0',
                        'stage-1',
                        'stage-2',
                    ]
                }
            }])
        }
    });

    this.packCallbacks.push(function (opt, stats) {
        // 构建钩子
    });

    // 自定义命令
    // this.commands.push({
    //     name: 'setup',
    //     module: require('./commands/setup.js')
    // });
};
