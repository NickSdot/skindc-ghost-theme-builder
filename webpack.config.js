const
  path = require('path'),

  //autoprefixer = require('autoprefixer'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  ZipFilesPlugin = require('webpack-zip-files-plugin'),
  GhostPackageJson = require('./plugins/GhostPackageJson.js'),

  //const HtmlWebpackPlugin = require('html-webpack-plugin');
  //const AssetsPlugin = require('assets-webpack-plugin');

  //Establish routes to theme directory
  projectConfig = require('./ProjectConfig.js'),
  packageJson = require('./package.json'),
  //Content path needs to be absolute path for webpack
  contentPath = path.join(__dirname, projectConfig.contentPath),
  themesDirectory = path.join(contentPath, 'themes'),
  themeName = projectConfig.themeName || packageJson.name,
  themeDescription = projectConfig.themeDescription || packageJson.description,
  themeDirectory = path.join(themesDirectory, projectConfig.themeDirectory || themeName),
  stylesName = projectConfig.stylesName || themeName,
  javascriptName = projectConfig.javascriptName || themeName

console.info('Webpack config themeDirectory : ', themeDirectory)

module.exports = function(env) {

  //Use production build type if the build is staging or production
  //const production = (env.build === BUILD_STAGE || env.build === BUILD_PROD)
  const release = process.argv.indexOf('-p') !== -1,

    defaultPlugins = [
      //The package plugin that auto generates the package.json inside your theme directory
      //new GhostPackageJson(),
      //We can set a source for the package.json if we want to.
      new GhostPackageJson({
        themeName: themeName, //Optional overrides use of project package.json name
        themeDescription: themeDescription //Optional overrides use of project package.json description
        // source: [pathToJSON] //Optional overrides the json used for values
      }),
      //The plugin to extract the compiled sass out to the css directory.
      new ExtractTextPlugin(path.join('assets/css', stylesName + '.css'))
    ]

  return {

    context: path.join(__dirname, 'src'),

    entry: './js/index.js',

    output: {
      path: themeDirectory,
      filename: path.join('assets/js/', javascriptName + '.js'),
      publicPath: '/'
    },

    devtool: !release ? 'source-map' : 'eval',

    bail: release,

    //Here we only add the ZipFilesPlugin when we release the themes.
    //Zipped theme for release will be in dist directory.
    //ie using webpack with -p option.
    plugins: release ? defaultPlugins.concat([new ZipFilesPlugin({
      entries: [{
        src: themeDirectory,
        dist: '/'
      }],
      output: path.resolve(__dirname, 'dist', themeName + '-' + packageJson.version),
      format: 'zip'
    })]) : defaultPlugins,

    /*new AssetsPlugin(),
    new HtmlWebpackPlugin({
      template:  path.join(__dirname, 'src', 'index.html')
    }),*/

    resolveLoader: {
      // An array of directory names to be resolved to the current directory
      //modules: ['node_modules', 'loader', helpers.root('src')],
      modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },

    module: {
      rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            sourceRoot: path.resolve(__dirname),
            only: [
              path.resolve(__dirname, 'src')
            ]
          }
        }]
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'sass-loader',
            options: {
              indentedSyntax: false,
              includePaths: [path.resolve(__dirname, 'node_modules')]
            }
          }],
          fallback: 'style-loader'
        })
      }]
    }
  }
}