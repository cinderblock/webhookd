

var config = {
  server: {
    listen: process.env.npm_package_config_socket || process.env.npm_package_config_port || 9000,
    hostname: process.env.npm_package_config_hostname,
    socketMode: process.env.npm_package_config_socketmode || process.env.socketmode,
  },
  endpointsFile: process.env.npm_package_config_endpointsFile,
};


module.exports = config;
