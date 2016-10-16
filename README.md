# Webhookd
Another simple server to host webhook endpoints

***Work in Progress:*** *This readme currently describes the intended interface. It's not done yet.*

## Install

```
git clone git@github.com:cinderblock/webhookd.git
cd webhookd
npm install
```

## Config

We use the npm package [config](https://www.npmjs.com/package/config) to parse configuration files.
Files are loaded from `config/` based on hostname or other parameters in [this order](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order).

### `server.listen` `Integer|String`
Sets the port or path for a unix socket to listen on.

### `server.hostname` `String` *optional*
Sets the hostname to listen on when listening over IP.

### `server.socketMode` *optional*
Sets the socket file permissions with fs.chmod().

### `hooks` `String|Object` *optional*
Technically optional, but this is required for this program to do anything.

#### `hooks` `String` File Notation
If hooks is a `String`, we will load that file and expect to load an object that has the properties of the `Object` notation.

The leading `./` is important if using a relative path.

#### `hooks` `Object` Notation
If hooks is an `Object`, each property is a hook path.
```
{
  "hook/path": hook
}
```

### `hooks.*` `Object|String|Array`
Each hook will follow the following object format.
If a `String` is passed, it is shorthand for the `namespace` `type` loading a file.
If a `Array` is passed, it is shorthand for the `sequence` `type`.

### `hooks.*.type` `String`
Defines the type of hook this is.

#### `namespace` type
Requires a `hooks` parameter and loads new hooks in a sub-path.
Handled like the root level `hooks`.

#### `echo` type
Two optional parameters

##### `response` `String` *optional*
Send a response to the client

##### `log` `String` *optional*
Print to `console.log`

#### `git-pull` type
Runs a `git pull` on the specified working directory.

##### `localBranch` `String`
##### `remoteBranch` `String`
##### `localWorkDir` `String`

#### `sequence` type

##### `sequence` `Array`
A list of actions to make in order.
This is an `Array` of `hook` `Objects`.
Cannot contain a `namespace` `type` hook.

### `key` `String`
If a `key` is specified for the hook, it must be found in one of a couple places:
 - The last part of the path, before the query string
 - Be the entire query string
 - Match the `key` of the query string
 - Match a header specified with `keyHeader`

### `keyHeader` `String`
The name of the header that should match the key

### `name` `String`
Human readable name for the hook for use in logs

## Update

```
git pull
npm install
```

Nodegit needs to be built locally to work on some machines.
Run this to install nodegit correctly: `BUILD_ONLY=true npm install nodegit`.
This only needs to be run when first installing or when updating nodegit.

## Run

```
npm run server
```

## Dev Server

For development, we use nodemon to automatically watch for file changes and reload the server as appropriate.

```
npm run server-dev
```
