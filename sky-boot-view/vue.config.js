const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: (config) => {
        // config.plugin('html').tap(args =>{
        //     return[
        //         {
        //             minify: {
        //                 removeAttributeQuotes: false
        //             }
        //         }
        //     ]
        //
        // })
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('store', resolve('src/store'))
    }

}
