var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd


module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        // webpack打包后，生成的js文件，css文件，字符文件，图片文件会打包放在path字段所指定的文件目录中。
        path: config.build.assetsRoot,
        // 而webpack打包的时候，遇到通过相对路径或者绝对路径进行引用的文件，其路径可通过publicPath中指定的路径重新合成。
        // 如一个大图片的地址
        // 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，
        // output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。
        
        // publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
        // publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
        // publicPath: "/assets/", // 相对于服务(server-relative)
        // publicPath: "assets/", // 相对于 HTML 页面
        // publicPath: "../assets/", // 相对于 HTML 页面
        // publicPath: "", // 相对于 HTML 页面（目录相同）
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    // 扩展名，从前往后匹配
    resolve: {
        extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
        fallback: [path.join(__dirname, '../node_modules')],
        // 别名
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    // 在解析模块（例如，loader）时尝试使用的扩展。默认是一个空数组。
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap
        }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 10 versions']
            })
        ]
    }
}