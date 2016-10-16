var Git = require('nodegit');

function gitPull(options, body) {
  if (options.remoteRef && !body.ref.match(options.remoteRef)) {
    return;
  }
  if (options.remoteRepoSshUrl && !body.repository.git_ssh_url.match(options.remoteRepoSshUrl)) {
    return;
  }
  if (options.remoteRepoHttpUrl && !body.repository.git_http_url.match(options.remoteRepoHttpUrl)) {
    return;
  }
  console.log('Updating repo:', options.name);
  var repository;
  Git.Repository.open(options.localWorkDir).then(repo => {
    repository = repo;
    return repo.fetchAll({
      callbacks: {
        credentials: (url, userName) => {
          return options.privateKeyFile ?
            Git.Cred.sshKeyNew(
              userName,
              options.publicKeyFile || (options.privateKeyFile + '.pub'),
              options.privateKeyFile,
              options.keyFilePassphrase || ''
            ) :
            Git.Cred.sshKeyFromAgent(userName);
        }
        // certificateCheck: () => 1,
      },
    }, true);
  }).then(() => {
    return repository.mergeBranches(options.localBranch, options.remoteBranch);
  }).then(() => {
    console.log('Updated');
  }).catch(err => {
    console.log('git error:', err);
  });
}

module.exports = gitPull;
