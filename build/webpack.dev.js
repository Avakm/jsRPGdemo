const webpack=require('webpack')
const {merge}=require('webpack-merge');
const commonConfig=require('./webpack.common.js');

const devConfig = {
	mode:'development',
	devtool:'cheap-module-eval-source-map',
	devServer:{  
		contentBase:'./dist', 
		open:true, 
		port:2000,
		hot:true
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
	],
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			}
		]
	}
}

module.exports=merge(commonConfig,devConfig);