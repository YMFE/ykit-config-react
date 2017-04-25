'use strict';

var path = require('path');
var HappyPack = require('happypack');
var es6Config = require('ykit-config-es6');

exports.config = function (options, cwd) {
    var originModifyQuery = options.modifyQuery;

    options.modifyQuery = function(defaultQuery) {
        defaultQuery.presets.push('react');

        if(typeof originModifyQuery === 'function') {
            return originModifyQuery(defaultQuery);
        } else {
            return defaultQuery;
        }
    }

    es6Config.config.call(this, options, cwd);

    extend(true, this.config, {
        plugins: this.config.plugins.concat([
            new this.webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(this.env === 'prd' ? 'production' : 'dev')
                }
            })
        ])
    });
};
