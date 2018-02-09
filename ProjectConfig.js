const migratorConfig = require('./MigratorConfig.js')


/**
 * At this time we are just passing through the migrator config.
 * We keep this file as an extra layer so if we need to customise values for our project we can
 * but we do not want to disturb the values in MigratorConfig.
 * We can add arbitrary values here if need be just ensure we still pass the values
 * from MigratorConfig.
 *
 * eg
 *
 * module.exports = Object.assign(migratorConfig, {
 *   [extra value here]
 * })
 */

module.exports = migratorConfig