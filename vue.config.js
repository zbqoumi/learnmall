module.exports = {
    configureWebpack: {
        resolve: {
            //extensions: [], 配置省略的后缀名  已经默认配置过
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },

  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/mall/'
  //   : '/'
};
