'use strict';

const path = require('path');
const es6Config = require('ykit-config-es6');

exports.config = function(options, cwd) {
    const originModifyQuery = options.modifyQuery;

    options.modifyQuery = function(defaultQuery) {
        defaultQuery.presets.push('react');

        if (typeof originModifyQuery === 'function') {
            return originModifyQuery(defaultQuery);
        } else {
            return defaultQuery;
        }
    };

    es6Config.config.call(this, options, cwd);

    if (options.ie8) {
        var pkg = require(path.join(cwd, 'package.json'));
        var reactVer = pkg.dependencies.react;
        var reactDomVer = pkg.dependencies['react-dom'];

        if (!reactVer || reactVer.search(/\^?0\./) === -1) {
            console.log('兼容 ie8 需要手动安装 react@0.14.8'); // eslint-disable-line
            process.exit(0);
        }

        if (!reactDomVer || reactDomVer.search(/\^?0\./) === -1) {
            console.log('兼容 ie8 需要手动安装 react-dom@0.14.8'); // eslint-disable-line
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
