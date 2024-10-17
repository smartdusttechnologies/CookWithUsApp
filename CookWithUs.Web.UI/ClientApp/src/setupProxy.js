const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :   env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:23380';
//const target = "https://localhost:44481";
//Put controller Name Here ->
const context = [
    "/weatherforecast", "/resturant", "/document", "/payment", "/Rider", "/user", "/location", "/Auth","/Publicdetails"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
         target: target,
       // target: 'http://localhost:51303',
        secure: false,
        ws : true
    
    });

    app.use(appProxy);
};