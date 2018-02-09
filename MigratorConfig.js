/**
 * This file is required to use knex-migrator.
 * This file varies from the file you will see if you have installed
 * a ghost instance via ghost-cli in that the values here point at the
 * the ghost npm dependency.
 */

var config = require('ghost/core/server/config'),
    ghostVersion = require('ghost/core/server/lib/ghost-version')

/**
 * 
 * knex-migrator can be used via CLI or within the application
 * when using the CLI, we need to ensure that our global overrides are triggered
 */
require('ghost/core/server/overrides')

module.exports = {
    //The first three here are primarily for the knex-migrator
    //currentVersion is a regex presumably for safe versions
    //module.exports.safe = version.match(/^(\d+\.)?(\d+)/)[0];
    currentVersion: ghostVersion.safe,
    //The database config object, similar to what your see in the
    //usual ghost configs
    database: config.get('database'),
    migrationPath: config.get('paths:migrationPath'),
    //The next are custom to the startup validations and tools
    //for this theme builder.
    defaultTheme: 'development',
    contentPath: config.get('paths:contentPath')
};