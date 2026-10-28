import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getConfig, ConfigurationError } from '../../src/lib/config/env';

describe('Environment & Commerce Mode Configuration', () => {
  const origEnv = process.env;

  beforeEach(() => {
    process.env = { ...origEnv };
  });

  afterEach(() => {
    process.env = origEnv;
  });

  it('defaults to mock mode when COMMERCE_MODE is unset', () => {
    delete process.env.COMMERCE_MODE;
    delete process.env.NEXT_PUBLIC_COMMERCE_MODE;

    const config = getConfig();
    expect(config.commerceMode).toBe('mock');
  });

  it('throws ConfigurationError when COMMERCE_MODE=medusa and credentials are missing', () => {
    process.env.COMMERCE_MODE = 'medusa';
    delete process.env.MEDUSA_BACKEND_URL;
    delete process.env.MEDUSA_PUBLISHABLE_KEY;

    expect(() => getConfig()).toThrow(ConfigurationError);
    expect(() => getConfig()).toThrow(/COMMERCE_MODE is configured as "medusa", but MEDUSA_BACKEND_URL/);
  });

  it('accepts valid medusa configuration without error', () => {
    process.env.COMMERCE_MODE = 'medusa';
    process.env.MEDUSA_BACKEND_URL = 'https://api.medusa-store.com';
    process.env.MEDUSA_PUBLISHABLE_KEY = 'pk_test_1234567890';

    const config = getConfig();
    expect(config.commerceMode).toBe('medusa');
    expect(config.medusaBackendUrl).toBe('https://api.medusa-store.com');
    expect(config.medusaPublishableKey).toBe('pk_test_1234567890');
  });
});
