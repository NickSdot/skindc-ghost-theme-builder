# Ghost Theme Builder

Base project template for building (Ghost Blog)[https://ghost.org/] themes.

## Features

* Uses (Ghost NPM)[https://www.npmjs.com/package/ghost] so no need for Ghost to be installed on your system.
* Utilises power and configuration of Webpack to watch, autobuild and package theme.
* Babel enabled and configurable via Webpack for precompilation of ES6 javascript.
* Default to use SASS via webpack for css precompilation.
* Webpack configuration is completely configurable as any other Webpack project.
* Auto generates theme package.json from project configuration.
* Configurable for flexible naming conventions for development.
* Structure is compliant with requirements for Knex-Migrator.

## Getting started

You can clone this github project but it is recommended you download a zip from one of the versioned tags.

This is a template and once downloaded you should configure the project to be managed as your own project.
Please do not try and commit changes to this github project. Pull requests will be considered.

### The Package.json

Once downloaded obviously the package.json content is for this project in its template state. You will need to make changes to this to take ownership of the project.

To do this change the following to the values as required for your own project.

* name
* version
* description
* author
* repository
* bugs
* homepage
* license

You can replace this with a new package.json but please ensure the devDependencies in the current file are replicated in your new replacement.

### Git configuration

It was advised that you download a zip of this project and this was so your project is clean to use on your own repository of choice. If you have cloned this project then please make sure that you have taken all the appropriate steps to relocate a clean project to your own repository.


## Default project setup and configuration

This project is setup as per the root of a ghost installation to be compliant with, rather than intrusive to usual Ghost practices. Therefore you will notice that there is a _content_ directory at the root of our project and that structure will comply to a default Ghost installation.

## The Commands

Before we start it is worth noting that everything these commands do is completely configurable as everything is as standard configuration for Webpack and by modifying the _webpack.config.js to add, modify or remove loaders or plugins as you desire.

### Install dependencies

Before we do anything we need to install the npm depndencies;

```
npm install
```

### Running the dev server

To start the Ghost server and the Webpack watcher simply run the following command in your terminal from the root of the project

```
npm start
```

This runs the Ghost instance from the npm dependency and alongside runs the Webpack watcher of which is entirely dependent on the webpack.config.js. All usual Webpack practices apply. The defualt Webpack config of this template precompiles ES6 and SCSS files when they change into the theme directory ready to be viewed by refreshing the view in the browser.

Webpack will also autmatically generate the package.json for the theme.

You can read more about how to configure the output locations and filenames for assets in _ProjectConfig.js_ later.

//Insert link to ProjectConfig.js docs

Note: This does not run a webpack devserver just the watcher of which in turn compiles the required files. Making the Ghost npm server compliant with a Webpack devserver in memory filesystem mmay come later.


### Releasing an archive

To release your project archive run the following command in your terminal from the root of the project

```
npm run release
```

Again this is using all of usual Webpack setup and is just an NPM script for

```
webpack -p
```

If you look inside the _webpack.config.js_ you will see we define a _release_ boolean which is true only if the -p option is applied to the node args. Then the plugins vary to included the archiver only when _release_ is true. Another thing that is variant on it being an execution of release is that the maps for compiled js and css files are not produced.

### Changing theme in database.

This feature will be coming in next release and will enable easy manipulation of the Ghost database to set the theme to the one correct for your development project.

This can still be done at this time and is documented later.

//Insert link to configuration docs.

### The database

The default database for this prjoect is an sqlite database and this can be found in the typical location _'content/data/ghost.db'_. When you download this project this database will be poulated with the default settings and content but would have not yet been initialised with a user account so you want to continue using this database you will have to set up the initail user by going to the ghost admin when the server is running.

The active theme will be set to development and therefore loading the theme files from _'content/themes/development'_. The files that are present in this directory at the minute replicate the default Ghost theme 'casper'.

You can replace this database with the an alternate sqlite database but remember that when you do the database you use may have a different theme setting.

//Insert ways of setting theme in database or changing target in ProjectConfig.js


### The database and knex-migrator

This project is setup as to allow the use of the (knex-migrator)[https://github.com/TryGhost/knex-migrator] tool distributed by Ghost.

In the docs for knex migrator it will tell you about the 'MigratorConfig.js', this file is already setup in this project and instead of pointing to _current_ points at the Ghost NPM dependency.

If you choose to replace the database file and the Ghost server start up tells you to execute commands using knex-migrator you can execute those commands on this project.

Note: This project does not install knex-migrator and if you need to use it then install it globally with;

```
npm install -g knex-migrator
```

## Default settings and configuration

This template is very configurable to help with naming conventions and theme directories.

When first downloaded this project is setup with the casper theme to allow for an immediate example when running the server.

There is a file _ProjectConfig.js_ at the root of the project of which allows certain configuration without modifying the webpack.config.js. Each of the options are documented in this file and so I will not go into detail here.


### Theme package.json

As mentioned in the features list the package.json for your theme is automatically generated during theme development and theme release.

By default all of the values for this file are extracted from the package.json for this project.
Most of these are the normal package.json convention values yet in this example package.json you will see an aditional ghost entry. Anything here will be mapped to the theme package.json.

If your theme name, description or other fields need to vary from the package.json for the project then they can be overiden in ProjectConfig.js.


## Testing your JS

Considering there is no example Javascript in this project I have left the choice of testing frameworks unopionated. There is plenty of documentation online and I am sure you all have your own favourites.

I have historically used Karma, Mocha and Chai with Webpack but have recently discovered Tape.

I will try and set up some examples for implemtating test suites but it is not high on my agenda as you should be able to set up your choice of suite on the project as you would normally.


## Issues and Feedback

This is the very early release of this template and although it is a replca of what I use to produce and manage my themes for my personal blogs I have quickly released a version for others to use.

I find it very useful and so thought I would share it. It is stable but I appreciate the documentation may be a little light of which I will improve very soon.

I am very open to opinions and will help with issues where I can. Just post them on the githib project and I will get to them asap.

