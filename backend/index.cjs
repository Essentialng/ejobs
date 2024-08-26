import('./server.js').then(module => {
    // The default export from server.js will be available as module.default
    const server = module.default;
    server();
  }).catch(err => {
    console.error('Error importing server.js:', err);
  });