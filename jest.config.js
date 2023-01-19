/** @type {import('jest').Config} */
const config = {
  verbose: true,
  // setupFiles: ['./src/setup.js'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
};

module.exports = config;
