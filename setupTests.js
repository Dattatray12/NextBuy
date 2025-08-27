require('@testing-library/jest-dom');

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Mock import.meta for Vite environment variables
global.import = global.import || {};
global.import.meta = global.import.meta || {};
global.import.meta.env = global.import.meta.env || {};
global.import.meta.env.VITE_API_BASE_URL = 'http://localhost:3000';

// Polyfill TextEncoder and TextDecoder for React Router compatibility
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Polyfill other browser APIs that might be needed
global.URL = require('url').URL;
global.URLSearchParams = require('url').URLSearchParams;