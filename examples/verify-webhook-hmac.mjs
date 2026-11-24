import crypto from 'node:crypto';

/**
 * Verifies an HMAC-SHA256 webhook signature header (`X-SAU-Signature` / `sha256=<hex>`)
 * using constant-time comparison.
 */
export function verifyWebhookSignature(rawBody, signatureHeader, webhookSecret) {
  if (!rawBody || !signatureHeader || !webhookSecret) return false;
  const providedHex = String(signatureHeader).replace(/^sha256=/i, '').trim();
  if (!/^[a-f0-9]{64}$/i.test(providedHex)) return false;

  const expectedHex = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody, 'utf8')
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(providedHex.toLowerCase(), 'hex'),
    Buffer.from(expectedHex.toLowerCase(), 'hex'),
  );
}
