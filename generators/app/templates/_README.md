# How to run

## In development

```bash
$ sudo npm install -g grunt-cli
$ npm install
$ grunt dev
```

This is for the first time only, then you'll be good to go with just a `grunt dev`, unless someone updates Node.js dependencies.  
Bower dependencies are automatically taken care of by Grunt.

Anyway. It will do its things, run some tests, fire up a local server, then watch for changes (i.e. if you edit a file, it will run proper tasks to update the app. Just refresh your browser when it's done).

I'm not sure the same applies when you *create* a new file, instead of *editing* one that's already there.

URL is [http://localhost:9091](http://localhost:9001).

It expects a local backend on [http://localhost:1337](http://localhost:1337).

## In production

Though some work and preparations have been put in place for a proper *build --> dist --> deploy* cycle, **that cycle is not ready, yet**.
