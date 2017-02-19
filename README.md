# ykit-config-qunar

## Features

- transpile ES6+, JSX 代码
- 通过 happypack 提升编译速度
- 初始脚手架(TODO)
- hotload modules(TODO)

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
        })
    ])
}
```
