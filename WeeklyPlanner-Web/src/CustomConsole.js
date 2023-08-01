const originalConsoleError = console.error;

console.error = (...args) => {
  // Check if the warning is from Ant Design, if so supress it
  if (args.length > 0 && typeof args[0] === 'string' && args[0].startsWith("Warning: [antd: message]")) {
    return;
  }

  // Call the original console.error function for other warnings/errors
  originalConsoleError(...args);
};