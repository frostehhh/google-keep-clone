import crypto from 'crypto'; // should have webcrypto.getRandomValues defined

let context;

if (typeof global !== 'undefined') {
  context = global;
} else if (typeof window !== 'undefined') {
  context = window;
}

if (typeof context.crypto !== 'object') {
  context.crypto = crypto;
}

if (typeof context.crypto.getRandomValues !== 'function') {
  context.crypto.getRandomValues = getRandomValues;
}

function getRandomValues(array) {
  return crypto.webcrypto.getRandomValues(array);
}