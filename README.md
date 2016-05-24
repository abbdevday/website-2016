DevDay
==================

DevDay is a Front-end project created with [XH Generator](https://github.com/xfiveco/generator-xh), a [Yeoman](http://yeoman.io) generator for scaffolding web projects.

## Table of contents

- [Prerequisites](#prerequisites)
    - [Node.js](#1-nodejs)
    - [Grunt](#2-grunt)
    - [Bower](#3-bower)
- [Usage](#usage)
    - [Project Structure](#1-project-structure)
    - [Getting Started](#2-getting-started)
    - [Development](#3-development)
    - [WordPress Development](#4-wordpress-development)
- [Tips & Tricks](#tips--tricks)
    - [Working with Files in the dist Folder](#working-with-files-in-the-dist-folder)
    - [Writing Syles](#writing-styles)
    - [LibSass Notices](#libsass-notices)
    - [Adding 3rd-party Dependency via Bower](#adding-3rd-party-dependency-via-bower)

## Prerequisites

The following software needs to be installed if you want to use develop & build project created with XH Generator. These installations need to be done just once so you can skip this section if you have the software already installed.

(Note: As a command line replacement at Windows we recommend [ConEmu](https://code.google.com/p/conemu-maximus5/).)

### 1) Node.js

Install [Node.js](http://nodejs.org/) so you can work with `npm`, Node package manager.

### 2) Grunt
Then install [Grunt](http://gruntjs.com/)'s command line interface (CLI) globally:

```
npm install -g grunt-cli
```

### 3) Bower
For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io/), another package manager. Install it from the command line too:

```
npm install -g bower
```

Also make sure that [git](http://git-scm.com/) is installed as some bower packages require it to be fetched and installed. On Windows ensure that Git is installed in your PATH by selecting *Run Git from the Windows Command Prompt* option during installation (check this [screenshot](http://wiki.team-mediaportal.com/@api/deki/files/3808/=Git_Setup_-_Run_from_Windows_Command_Prompt.PNG)).

## Usage

### 1) Project Structure

The meaning of files and folders in generated project structure are as follows:

- **dist** - production / preview files are automatically generated here, this is where you check your work in a browser.
- **node_modules** - Node.js modules for various Grunt tasks, usually you don’t have to do anything about this folder
- **src** - source files, development is done here
   - **bower_components** - 3rd party libraries managed via [Bower](http://bower.io/)
   - **grunt** - atomic grunt tasks configuration
   - **includes** - HTML partials like `head.html`, `scripts.html`, etc.
   - **scss** - Sass files
     - `main.scss` - main file where other stylesheets are imported
     - **common** - common styles for most of pages
     - **components** - styles for page modules/components; this is where most of your styles will go
     - **setup** - various configurations and preprocesor helpers
     - **vendor** - styles overwriting/replacing library ones
   - **js**
     - `main.js` is a main JS file in project
   - `home.html`, etc. - HTML files composed from HTML partials
- `index.html` - project index with project pages listed
- `Gruntfile.js` - [Grunt](http://gruntjs.com/) file with various automation tasks defined in it
- `bower.json` - Bower dependencies in the project
- `package.json` - npm packages dependencies
- `.yo-rc.json` - Yeoman generator configuration file
- `.bowerrc` - configuration file for Bower
- `.editorconfig` - [EditorConfig](http://editorconfig.org/) configuration file to achieve consistent coding style
- `.gitattributes` - [Git](http://git-scm.com/) configuration file to force Unix line ending in all text files
- `.gitignore` - default Git ignore files and folders
- `.jshitrc` - [JSHint](http://www.jshint.com/) configuration


On a typical project, you will work in `src` folder and check your work in `dist` folder so you don’t have to touch other files. For more info about working with styles structure go to [Writing styles section](#writing-styles).

### 2) Getting Started

If you are joining an existing project which was set up using XH Generator (assuming that you have all [prerequisites](#prerequisites) installed), all you need to do is to clone the existing repository and install Bower and npm dependencies.

Let's imagine you have cloned/unpacked DevDay project into `dev-day` directory.

First, change the directory to your cloned project:

```
cd dev-day
```

After that install Bower depedencies:

```
bower install
```

Then install npm dependencies:

```
npm install
```

Finally, (re)generate preview files in the dist folders:

```
grunt build
```

If everything went ok, the preview files will be generated and you will be able to check your work in the `dist` folder.

Now the project is set up and you can continue like described in the [Development](#3-development) section.

### 3) Development

When you have the basic setup done, you can start development. To re-compile HTML / scss file in real time you can use default task. Type

```
grunt
```

and this will start a task that will watch for changes in files and recompile them as needed. Additionaly, development server will be started and BrowserSync scripts injected.

To rebuild the whole project, use the grunt build task again

```
grunt build
```

To validate HTML, use the following task

```
grunt validate
```




## Tips & Tricks

### Working with Files in the `dist` Folder

In general, it’s not recommended that you work directly with files in the `dist`. The files in `dist` folder are automatically generated from the source files in `src` folder and by default `dist` folder is ignored in version control system.

HTML and CSS files are prettified for consistent formatting and a table of contents from imported Sass stylesheets is generated at the beginning of `main.css` for better overview.

### Writing Styles

The following source files are generated in `src/scss` folders:

- `main.scss` - main file where other stylesheets are imported
- **common** - common styles for most of pages
  - `base.scss` - normalized base styles
  - `layout.scss` - main page structure
  - `utilities.scss` - utility classes (image replacement, hide, etc.)
- **components** - styles for page modules/components; this is where most of your styles will go
- **setup** - various configurations and preprocesor helpers
  - `variables.scss` - variables file
  - `mixins.scss` - mixins file
- **vendor** - styles overwriting/replacing library ones

The following approach is recommended when creating styles:

1. Use `main.scss` only for importing other stylesheets. Do not write styles directly in this file!
2. Use variables and mixins files to store your variables and mixins.
3. Depending on your preferences for styles organization, you can organize them according modules & components (recommended, use **components** folder), or pages. A good practice is to name file the same as main class used for that component, for example if you create a component representing an article with `.article` as a main CSS class followed by `.article-title`, `.article-meta`, etc. and with `.article--featured` variant that will have slightly different color scheme, you will do everyone a favour by placing it in `scss/components/_article.scss` file instead of ~~`scss/components/_text.scss`~~.
4. If you find yourself overwriting/replacing default library styles, put them into **vendor** folder. A good examples of that are replacing library custom select or lightbox styles with your own or overwriting some Bootstrap styles that were not configurable.
5. Comment [main sections and subsections](https://github.com/xfiveco/css-coding-standards#comments) appropriately.
6. By default [autoprefixer](https://github.com/postcss/autoprefixer) is enabled in project, which mean that you don't need to write prefixes for the standard CSS3 properties. It uses [Can I Use](http://caniuse.com/) database. However, please note that some popular properties (like `-webkit-appearance` or `-webkit-font-smoothing` are not a part of standard and need to be written with prefixes by you).

### Adding 3rd-party Dependency via Bower

Let’s say you want to add [Colorbox](http://www.jacklmoore.com/colorbox/) to your project. The following example shows how you can add it as a Bower package and merge its JS file into common `plugins.min.js` file.

1. First, install it via Bower

    ```
    bower install jquery-colorbox --save-dev
    ```

2. Then link it in `src/includes/scripts.html`. This will ensure that the library will be added to `plugins.min.js` file

    ```html
    <!-- build:js js/plugins.min.js -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/jquery-colorbox/jquery.colorbox-min.js"></script>
    <!-- endbuild -->
    <script src="js/main.js"></script>
    ```

3. Go to `src/bower_components/jquery-colorbox` and copy images from `example1/images` folder to `src/img/colorbox` folder.

4. Get `example1/colorbox.css` from the same dir, rename it to `_colorbox.scss`, store it in `src/scss/vendor` folder and adjust to your needs if needed.

5. Import `_colorbox.scss` in `main.scss`

    ```css
    @import "vendor/colorbox";
    ```

6. Replace all instances of `images/` in `_colorbox.scss` with `../img/colorbox/`

7. Run the `grunt build` task or `grunt` task

8. Now you can use Colorbox in your HTML files and initiate it from `src/js/main.js`
