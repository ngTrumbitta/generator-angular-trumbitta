# How to use this app

This AngularJS application stub was generated using [the angular-trumbitta Yeoman generator](https://github.com/ngTrumbitta/generator-angular-trumbitta), made with <3 by [William Ghelfi a.k.a. trumbitta](https://github.com/trumbitta).

More details and a fairly complete guide are in the [generator's README](https://github.com/ngTrumbitta/generator-angular-trumbitta/blob/master/README.md).

The following short paragraphs sum up what you need to get started right now if you are in a hurry.

## In development

```bash
$ npm install -g bower grunt-cli
$ npm install # optional, the generator should have run this
$ grunt serve
```

This is for the first time only, then you'll be good to go with just a `grunt serve`, unless you update Node.js dependencies.  
Bower dependencies are automatically taken care of by Grunt thanks to the `wiredep` plugin.

Anyway. It will do its things, run some tests, fire up a local server, then watch for changes (i.e. if you edit a file, it will run proper tasks to update the app. It will also try to refresh your browser if you have a LiveReload extension installed in the browser).

I'm not sure the same applies when you *create* a new file, instead of *editing* one that's already there. Stop and restart grunt, just in case.

URL is [http://localhost:9001](http://localhost:9001).

## In production

Run `grunt dist` and grab the content of the `dist` directory.
