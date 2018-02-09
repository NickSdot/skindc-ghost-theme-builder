//DO NOT REMOVE THESE LINES.
//These are the required for the loaders.

//This is the target for the package json plugin that maps the
//project package.json to the package.json for the theme
//This needs to be here at the minute so the file is added to the
//webpack watch list. Currently looking into a way of adding this to watch list
//without it being here.
import '../../package.json'
//This is the entry point for all the sass for the site that will be precompiled
//to css for the them. Again this has to be here so is accessible by the loader.
import '../sass/index.scss'