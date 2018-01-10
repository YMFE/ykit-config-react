'use strict'

var path = require('path');
var fs = require('fs-extra');
var execSync = require('child_process').execSync;
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
        installDependencies();

        log('Setup finished.');
    }

    function copy(pathName) {
        if(fs.existsSync(path.join(tmpRepo + pathName))) {
            fs.copySync(path.join(tmpRepo + pathName), path.join(cwd + pathName));
        } else {
            console.log('目标文件不存在，拷贝失败：', path.join(tmpRepo + pathName));
        }
    }

    function installDependencies() {
        var dependencies = ['react@16.2.0', 'react-dom@16.2.0'];
        var installCommand = 'npm i --save --registry=https://registry.npm.taobao.org ';

        for (var i = 0, len = dependencies.length; i < len; i++) {
            log('Installing ' + dependencies[i] + '...');
            execSync(installCommand + dependencies[i]);
        }

        log('Successfully install dependencies.');
    }
};
