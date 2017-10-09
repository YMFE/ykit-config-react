'use strict'

var path = require('path');
var fs = require('fs-extra');
var simpleGit = require('simple-git')();

exports.usage = '初始化项目环境';

exports.setOptions = function(optimist) {
};

exports.run = function(options) {
    var cwd = process.cwd();
    var repoURL = 'https://github.com/roscoe054/ykit-starter-react.git';
    var tmpRepo = path.join(cwd, '.ykit/');

    fs.mkdirSync(tmpRepo);
    simpleGit.clone(repoURL, tmpRepo, {}, afterClone);

    function afterClone() {
        copy('/src/');
        copy('/index.html');
        copy('/ykit.js');
        copy('/.gitignore');

        fs.removeSync(tmpRepo);
        log('Setup finished.');
    }

    function copy(pathName) {
        if(fs.existsSync(path.join(tmpRepo + pathName))) {
            fs.copySync(path.join(tmpRepo + pathName), path.join(cwd + pathName));
        } else {
            console.log('目标文件不存在，拷贝失败：', path.join(tmpRepo + pathName));
        }
    }
};
