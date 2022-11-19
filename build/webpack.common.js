const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports={
    entry:{
		index:'./src/index.js',
	},
	module:{
		rules:[
		{
			test:/\.(png|jpg|gif)$/,
			use:{
				loader:'url-loader',
				options:{
					//placeholder 占位符
					name:'[name]_[hash].[ext]', //使打包的文件名和后缀名与原文件一致
					outputPath:'images/',
					limit:10240
				}
			}
		},
		{
			test:/\.mp3$/,
			use:{
				loader:'file-loader',
				options:{
					name:'[name]_[hash].[ext]',
					outputPath:'audio/'
				}
			}
		},
		{
			test:/\.js$/,
			exclude: /node_modules/, 
			use:['babel-loader?cacheDirectory']//开启缓存
		}
	]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}), 
	    new CleanWebpackPlugin(['dist'],{
			root:path.resolve(__dirname,'../')
		})
	],
	optimization:{
		usedExports:true,
		splitChunks:{
			chunks:'all'
		}
	},
}