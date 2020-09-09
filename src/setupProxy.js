const proxy = require("http-proxy-middleware");

module.exports = (app)=>{
    app.use(proxy("/api",{
        target:"http://book.zhishu.online",
        changeOrigin:true,
        // pathRewrite:{
        //     "^/api":""
        // }
    }))

}