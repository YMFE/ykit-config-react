'use strict';

var path = require('path');
var HappyPack = require('happypack');
var es6Config = require('ykit-config-es6');

exports.config = function(options, cwd) {
    var originModifyQuery = options.modifyQuery;

    options.modifyQuery = function(defaultQuery) {
        defaultQuery.presets.push('react');

        if (typeof originModifyQuery === 'function') {
            return originModifyQuery(defaultQuery);
        } else {
            return defaultQuery;
        }
    };

    es6Config.config.call(this, options, cwd);

    extend(true, this.config, {
        plugins: this.config.plugins.concat([
            new this.webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(
                        this.env === 'prd' || this.env === 'beta'
                            ? 'production'
                            : 'dev'
                    )
                }
            })
        ])
    });

    if (options.ie8) {
        var pkg = require(path.join(cwd, 'package.json'));
        var reactVer = pkg.dependencies.react;
        var reactDomVer = pkg.dependencies['react-dom'];

        if (!reactVer || reactVer.search(/\^?0\./) === -1) {
            console.log('兼容 ie8 需要手动安装 react@0.14.8');
            process.exit(0);
        }

        if (!reactDomVer || reactDomVer.search(/\^?0\./) === -1) {
            console.log('兼容 ie8 需要手动安装 react-dom@0.14.8');
            process.exit(0);
        }

        this.config.module.postLoaders.push({
            test: /\.(js|jsx)$/,
            loader: 'es3ify-loader'
        });
    }

    this.commands.push({
        name: 'setup',
        module: require('./commands/setup.js')
    });
};
