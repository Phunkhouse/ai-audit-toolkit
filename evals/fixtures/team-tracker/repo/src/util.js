const blocked = new Set(['__proto__', 'constructor', 'prototype']);

// Recursively copies plain-object properties from source into target.
export function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (blocked.has(key)) continue;
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

// Linear-time check; no nested quantifiers.
export function looksLikeEmail(value) {
  return typeof value === 'string' && value.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export function pick(object, keys) {
  const out = {};
  for (const key of keys) if (key in object) out[key] = object[key];
  return out;
}
