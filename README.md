#grunt-typo3flow-xliff-json

Grunt task to convert TYPO3 Flow xliff files to json files. The generated JSON files can be used with Pascal Prechts [angular-translate](https://github.com/PascalPrecht/angular-translate).

## Getting Started
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.0`.

If you haven't used grunt checkout the [Getting Started](http://gruntjs.com/getting-started) guide to learn how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile). 

##Installing the plugin

Place this in your package.json dependencies or devDependencies
```js
{
	...
	"dependencies" {
		"grunt-typo3flow-xliff-json": "git://github.com/pAlpha627/grunt-typo3flow-xliff-json.git"
	}
	...
}
```

Once the plugin has been installed, you can enable it inside your Gruntfile with this line:

```js
grunt.loadNpmTasks('grunt-typo3flow-xliff-json');
```

## Usage Examples
In your project's Gruntfile, add a section named `xliff` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  xliff: {
    acmedemo: {
      files: {
        'Packages/Application/Acme.Demo/Resources/Public/Javascript/i18n/': 'Packages/Application/Acme.Demo/Resources/Private/Translations/**/*.xlf'
      }
    },
    acmedemo2: {
      files: {
        'Packages/Application/Acme.Demo2/Resources/Public/Javascript/i18n/': 'Packages/Application/Acme.Demo2/Resources/Private/Translations/**/*.xlf'
      }
    }
  }
});
```
## Run a certain target
```js
$ grunt xliff:acmedemo
```

## Run all tragets at once
```js
$ grunt xliff
```