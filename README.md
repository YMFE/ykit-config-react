# ykit-config-react

<b class="ykit-tip">
该插件已内置 ykit-config-es6，不需要单独引入。
</b>

## Features

- 编译 ES6+, JSX 代码（兼容至 IE8）
- 通过 happypack 提升编译速度
- 设置 react 环境变量
- 初始脚手架(TODO)

## 安装

在项目中执行：

```
$ npm install ykit-config-react --save
```

编辑 `ykit.js`，引入插件即可：

```javascript
module.exports = {
    plugins: ['react']
    // ...
};
```

或者如果需要添加插件的选项，也可以传入一个对象：

```javascript
module.exports = {
    plugins: [{
        name: 'react',
        options: {
            // 插件选项
        }
    }]
    // ...
};
```

## 示例

查看：https://github.com/roscoe054/ykit-starter-react

## babel-polyfill

babel-polyfill 默认是没有引入的，需要根据项目需求手动引入。

### 功能

babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。如果需要这些 API 则要手动引入 babel-polyfill。

### 引入

引入 babel-polyfill 需要在入口 js 头部，加入如下一行代码：

```javasciprt
import 'babel-polyfill';
```

<b class="ykit-tip">
babel-polyfill 会增大 js 体积（压缩后 80k 左右），请根据项目需求选择是否引入。
</b>

## 兼容 ie8

如果需要支持 ie8，则要指定 ie8 选项：

```javascript
module.exports = {
    plugins: [{
        name: 'react',
        options: {
            ie8: true
        }
    }]
    // ...
};
```

<b class="ykit-tip">
react 和 react-dom 从 15 版本开始已经不支持 ie8，请确保项目中安装 react@0.14.8 以及 react-dom@0.14.8 版本。
</b>

## 如何更改配置？

该插件支持更改 babel-loader 的 `test`、`exclude`、`query` 配置项：

```javascript
module.exports = {
    plugins: [
        'qunar', {
            // 通过对象的方式引入插件，可以传入 options
            name: 'react',
            options: {
                // 更改 es6 配置
                test: /\.(js)$/, // 默认是 /\.(js|jsx)$/
                exclude: /node_modules\/(?!(MY_UI)\/).*/, // 默认是 /node_modules/
                modifyQuery: function(defaultQuery) { // 可查看和编辑 defaultQuery
                    defaultQuery.presets.push('my_preset');
                    defaultQuery.plugins.push('my_plugin');
                    return defaultQuery;
                }
            }
        }
    ],
    config: {
        // ...
    }
};
```

## 插件内置 Webpack 配置（仅供参考）

```javascript
{
    module: {
        loaders: baseConfig.module.loaders.concat([{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loaders: ['happypack/loader']
        }])
    },
    plugins: baseConfig.plugins.concat([
        new HappyPack({
            loaders: [
                {
                    loader: require.resolve('babel-loader'),
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: [
                            'es2015',
                            'es2017',
                            'react',
                            'stage-0',
                            'stage-1',
                            'stage-2',
                        ],
                        plugins: ['transform-es2015-modules-simple-commonjs']
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
        })
    ])
}
```
