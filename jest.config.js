module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Use babel-jest for all JS and JSX files
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],  // Ensure Jest understands the file extensions
    testEnvironment: 'jsdom',  // For React, jsdom is the default environment
  };
  