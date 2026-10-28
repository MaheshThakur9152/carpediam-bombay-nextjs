import Medusa from '@medusajs/js-sdk';
import { getConfig } from '../config/env';

let medusaClientInstance: Medusa | null = null;

export function getMedusaClient(): Medusa {
  const config = getConfig();

  if (config.commerceMode !== 'medusa') {
    throw new Error(
      'Cannot initialize Medusa client when COMMERCE_MODE is not "medusa". ' +
      'Please check your COMMERCE_MODE environment setting.'
    );
  }

  if (!medusaClientInstance) {
    medusaClientInstance = new Medusa({
      baseUrl: config.medusaBackendUrl!,
      publishableKey: config.medusaPublishableKey!,
    });
  }

  return medusaClientInstance;
}
