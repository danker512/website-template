# Template for Website

=========================

## Structure
`/dev` folder - contains source files.  
`/public` folder - contains production files.

### Source folder
* `/sass`
    * `/components` - contains components files.  
    * `/functions` - contains scss function files.  
    * `/generics` - contains basic files. ex. reset, normalize  
    * `/layouts` - contains pages layout files. ex.header, footer, main  
        * `/pages` - contains files for each pages.   
    * `/lib` - contains library files. ex.bootstrap  
    * `/mixin` - contains scss mixin files.  
    * `/utility` -contains utility scss files.  
    * `_settings.css` - sets variables.  
    * `style.css`

## How to use
* exec `./setup.sh`
    * download dependencies.
    * required *npm*, *gulp*, *tsd*, *typings*.
* exec `npm start`
    * launch server
* exec `npm test`
    * karma start
    * required *karma*, *mocha*, *chai*