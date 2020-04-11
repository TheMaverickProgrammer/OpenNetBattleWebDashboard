# About
The [Web Data API](https://github.com/TheMaverickProgrammer/OpenNetBattleWebDataAPI) is just a HTTP RESTful service on top of the datastore. This project is the visual component that users will see.

Both of these web projects constitute the data-management solution for the [Open Net Battle](https://github.com/TheMaverickProgrammer/OpenNetBattle) engine.

## Disclaimer
Contributing is always welcome. However there will be no official tutorials or help form me personally on how to use this software. 

# Development 
* Navigate into the vuejs project directory `open_net_battle_dashboard`
* run `npm install`
* run `npm run serve`

The dashboard will be running and you can connect. 

# Building
You'd need to set your `NODE_ENV` to `production` and execute `npm run build`, because the project has web pack configured for both development and production.

Serve the `dist/` output. I recommend using [http-server](https://www.npmjs.com/package/http-server).

# Configuring
The dashboard will be configurable to point to different URLs if you have a custom web api for the project for instance

The project comes with a config file that looks like this:

```js
export default {
    domain: "my.api.host.com",
    port:8080,
    version: "v1",
    secured: false
}
```

Setting the config property `secured` to `true` will query HTTPS versions of the domain endpoints.

For specifics on how to use the api, I wrote a primitive plugin for Vue found in `api/index.js`. The entire app has access to this plugin
and uses it to make requests.

# Security
If you're running your own dashboard on your own server you'll want to close all ports that aren't HTTP/HTTPS related.
Then I would run the server over HTTPS.