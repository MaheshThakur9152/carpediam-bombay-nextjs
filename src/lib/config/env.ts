export type CommerceMode = 'mock' | 'medusa';

export interface AppConfig {
  commerceMode: CommerceMode;
  medusaBackendUrl?: string;
  medusaPublishableKey?: string;
  siteUrl: string;
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export function getConfig(): AppConfig {
  const commerceModeRaw = process.env.COMMERCE_MODE || process.env.NEXT_PUBLIC_COMMERCE_MODE || 'mock';
  const commerceMode: CommerceMode = commerceModeRaw === 'medusa' ? 'medusa' : 'mock';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const medusaBackendUrl = process.env.MEDUSA_BACKEND_URL;
  const medusaPublishableKey = process.env.MEDUSA_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

  if (commerceMode === 'medusa') {
    if (!medusaBackendUrl || !medusaPublishableKey) {
      throw new ConfigurationError(
        'COMMERCE_MODE is configured as "medusa", but MEDUSA_BACKEND_URL or MEDUSA_PUBLISHABLE_KEY is not defined. ' +
        'Please define both variables in your environment or set COMMERCE_MODE=mock for local fixture development.'
      );
    }
  }

  return {
    commerceMode,
    medusaBackendUrl,
    medusaPublishableKey,
    siteUrl,
  };
}
