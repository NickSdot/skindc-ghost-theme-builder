/*
Server start script for webpack woring alongside ghost blog server.
The webpack server here is just used to watch the files and compile as per the webpack config.
The ghost server and the webpack watcher / compiler will both start when this script is executed
and the changes will be viewable in the browser on refresh.

Using ghost server as an npm module was the start for this to be possible
https://docs.ghost.org/v0.11/docs/using-ghost-as-an-npm-module#section--start-express-instance-

This was possible when I found the docs for the webpack nodejs API.
https://github.com/webpack/docs/wiki/node.js-api

This is as far as I have got but has certainly improved develoment time for ghost themes. 

If your interested in the colourisation of output see here
https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
 */

const
  ghost = require('ghost'),
  express = require('express'),
  webpack = require('webpack'),
  server = express(),
  config = require('./webpack.config.js')(process.env)
  

function startServer() {

  console.log('\x1b[32m%s\x1b[0m', 'Starting Ghost server...')

  //Although not completely necessary we are still passing into Ghost an instance of express.
  //This way if you want to apply middleware for anyreason you can, ( I think )
  //
  //The docs say that here you should pass subdir from the config as the first parameter
  //to the server.use method but I found that just using root works fine.
  return ghost()
    .then(function(ghostServer) {
      server.use('/', ghostServer.rootApp)
      return ghostServer.start(server)
    })
}

function startWepbackWatch() {

  return new Promise(function(resolve, reject) {

    console.log('\x1b[32m%s\x1b[0m', 'Starting Webpack watch...')
    const compiler = webpack(config)

    compiler.watch({ // watch options:
      aggregateTimeout: 300, // wait so long for more changes
      poll: true // use polling instead of native watchers
      // pass a number to set the polling interval
    }, function(err, stats) {

      if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Complier Watch Error : ', err)
        reject(err)
      }

      resolve()

      console.log('\x1b[32m%s\x1b[0m', 'Compiling...')

      //Stats compilations errors is array and can have more than one error
      //It is never null just empty
      if (stats.hasErrors()) {
        var error
        //It seeem that each error in the array has the following fields.
        //name, message, module, error, origin, dependencies
        for (error in stats.compilation.errors) {
          console.error('\x1b[31m%s\x1b[0m', stats.compilation.errors[error].error)
          return
        }
      }

      //Stats compilations warnings is array and can have more than one warning
      //It is never null just empty
      if (stats.hasWarnings()) {
        var warning
        //Have not worked out the fields for warnings yet
        for (warning in stats.compilation.warnings) {
          console.warn('\x1b[33m%s\x1b[0m', stats.compilation.warnings[warning].warning)
        }
      }

      console.log('\x1b[32m%s\x1b[0m', 'Compiled Succesfully.')

      //Maybe you want to inspect yourself
      //for (key in stats.compilation) {}
      //
    });
  })
}

startWepbackWatch()
  .then(startServer)
  .catch(function(err) {
    console.log('\x1b[31m%s\x1b[0m', 'Server start failure:\n\tcode: ' + err.code + '\n\tmessage: ' + err.message + '\n')
  })