# Webhookd
Another simple server to host webhook endpoints


## Install

```
git clone git@github.com:cinderblock/webhookd.git
cd webhookd
npm install
```

## Setup

We use npm config to set a bunch of settings:

### Listen

By default, the server will listen on port 9000 on all interfaces.

To change the port: `npm config set webhookd:port 9001`

To change the interface: `npm config set webhookd:hostname localhost`

To use a socket instead: `npm config set webhookd:socket path/to/file.sock`

If using a socket, set file mode: `npm config set webhookd:socketmode 660`

### Endpoints File

Create an endpoints file. See [`endpoints.sample.json`](endpoints.sample.json). Use npm config to tell it which file to use:

```
npm config set webhookd:endpointsFile ./endpoints.json
```

The leading `./` is important if using a relative path.

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
