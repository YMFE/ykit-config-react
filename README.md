# ykit-config-react

## Features

- 编译 ES6+, JSX 代码（兼容至 IE8）
- 通过 happypack 提升编译速度
- 添加 babel-polyfill
- 设置 react 环境变量
- 初始脚手架(TODO)

## 安装

在项目中执行：

```
$ npm install ykit-config-react --save
```

编辑 `ykit.js`，引入插件：

```
module.exports = {
    plugins: ['react']
    // ...
};
```

## 更改 happypack 配置

由于插件内置 `happypack`，因此该它的编译 es6/react 配置需要调用 `modifyHappypack` 接口：

```javascript
module.exports = {
    plugins: [
        'qunar', {
            // 通过对象的方式引入插件，可以传入 options
            name: 'react',
            options: {
                // 更改 es6/react 配置
                modifyHappypack: function(config) {
                    // 通过 console.log(config) 可查看当前配置
                    config.verbose = false;
                    return config;
                }
            }
        }
    ],
    config: {
        // ...
    }
};
```

## 插件配置详情

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
