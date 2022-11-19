const {merge}=require('webpack-merge');
const path=require('path');
const commonConfig=require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ParalleUglifyPlugin=require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const HappyPack=require('happypack');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

const prodConfig = {
	mode:'production',//线上环境
	devtool:'cheap-module-source-map',
	module:{
		rules:[
			{
				test:/\.js$/,
				use:['happypack/loader?id=babel'],
				include:/src/
			},
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,	
					'css-loader',
					'postcss-loader'
				]
			}
		]
	},
	optimization:{
		minimizer:[new OptimizeCssAssetsPlugin({})]
	},
	resolve:{
		// 针对npm中第三方模块优先采用jsnext：main中指向的ES6模块化语法文件
		mainFields:['jsnext:main','browser','main']
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'[name].css',
			chunkFilename:'[name].[contentHash].css'
		}),
		new HappyPack({
			id:'babel',
			loaders:['babel-loader?cacheDirectory']
		}),
		new ModuleConcatenationPlugin()
		// new ParalleUglifyPlugin({
		// 	//还是使用Uglify压缩，只不过帮助开启了多进程
		// 	uglifyJS:{
		// 		output:{
		// 			beautify:false,	//最紧凑的输出
		// 			comments:false  //删除所有注释
		// 		},	
		// 		compress:{
		// 			drop_console:true, //删除所有的console.log语句
		// 			collapse_vars:true, //内嵌定义了但是只用到一次的变量
		// 			reduce_vars:true  //提取出现多次单是没有定义成变量去引用的静态值
		// 		}
		// 	}
		// })
	],
	output:{
		filename:'[name].[contenthash].js',
		chunkFilename:'[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist')
	}
}

module.exports=merge(commonConfig,prodConfig);