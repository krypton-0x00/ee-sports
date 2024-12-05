// jest.setup.js
import { jest } from '@jest/globals';

// Global mock for jest.fn() to improve type inference
global.mockFn = (implementation) => jest.fn(implementation);
