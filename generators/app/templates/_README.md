# How to run

## In development

```bash
$ sudo npm install -g grunt-cli
$ npm install
$ grunt serve
```

This is for the first time only, then you'll be good to go with just a `grunt serve`, unless someone updates Node.js dependencies.  
Bower dependencies are automatically taken care of by Grunt thanks to the `wiredep` plugin.

Anyway. It will do its things, run some tests, fire up a local server, then watch for changes (i.e. if you edit a file, it will run proper tasks to update the app. It will also try to refresh your browser if you have a LiveReload extension installed in the browser).

I'm not sure the same applies when you *create* a new file, instead of *editing* one that's already there. Stop and restart grunt, just in case.

URL is [http://localhost:9001](http://localhost:9001).

## In production

Run `grunt dist` and grab the contents of the `dist` directory.

# How to customize

Inside `gui/app/shared/config` you'll find two files:

* `dev.config.json` for the development phase
* `dist.config.json` for the production phase

Use them (carefully and at your own risk) to customize some  bits of the application, notably:

* `ENV.FRONTEND.PAGE_SIZE`: n. of items in paginated lists
* `ENV.BACKEND.URL.HOSTNAME`: just the hostname or IP of the server, used for example to point at the WebSocket server
* `ENV.BACKEND.URL.FULL`: the full base URL of the REST backend, optionally complete with port number and subpath. No trailing slash!

The `dev.` file will be automagically used at every `grunt serve`.  
The `dist.` file will be automagically used at avery `grunt dist`.
