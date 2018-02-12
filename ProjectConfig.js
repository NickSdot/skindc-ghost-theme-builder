/**
 * Project configuration file.
 * 
 * First we are just passing through the migrator config.
 * Note: Validate that this is still needed.
 * 
 * Then we can set names and directories to be used for the theme development.
 */

const config = require('ghost/core/server/config'),
  migratorConfig = require('./MigratorConfig.js')

module.exports = Object.assign(
  migratorConfig, {
    
    //Get the content path from the ghost npm dependency
    contentPath: config.get('paths:contentPath'),
    
    //The name of the theme to be used when building the theme components
    //(js and css assets) and distribution archive. 
    //This is optional and if this is not set then the name from the package.json for
    //this project will be used.
    themeName: 'casper',

    //The description of the theme to be applied to the themes package.json
    //This is optional and if this is not set then the description from the package.json for
    //this project will be used.
    themeDescription: 'The default casper theme for demonstration',
    
    //Optional name for the css asset output if this needs to vary from themeName
    //stylesName: 'casper.css',
    
    //Optional name for the js asset output if this needs to vary from themeName
    //javascriptName: 'casper.js',
    
    //Theme directory is the directory within the themes path.
    //So using contentPath above
    //[contentPath]/themes/[themeDirectory]
    //This by default would be the same as themeName but this is made flexible
    //in case the actual themeName used to package the zip (in theme package.json and name of dist zip)
    //needs to vary from the name of the target themeDirectory used by ghost server.
    themeDirectory: 'development'
  }
)