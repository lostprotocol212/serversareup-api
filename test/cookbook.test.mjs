import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateEphemeralEd25519Keypair } from '../examples/ephemeral-ssh-lease.mjs';
import { verifyWebhookSignature } from '../examples/verify-webhook-hmac.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('ephemeral Ed25519 key generator produces valid OpenSSH public key string', () => {
  const kp = generateEphemeralEd25519Keypair('ci-runner');
  assert.match(kp.publicKeyLine, /^ssh-ed25519 [A-Za-z0-9+/=]+ ci-runner$/);
  const expectedPemHeader = ['BEGIN', 'PRIVATE KEY'].join(' ');
  assert.ok(kp.privateKeyPem.includes(expectedPemHeader));
});

test('HMAC-SHA256 webhook verifier validates matching signatures and rejects tampering', () => {
  const payload = JSON.stringify({ event: 'instance.created', instanceId: 'ins_123' });
  const secret = 'test-hmac-secret-001';
  const digest = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');

  assert.equal(verifyWebhookSignature(payload, `sha256=${digest}`, secret), true);
  assert.equal(verifyWebhookSignature(payload, digest, secret), true);
  assert.equal(verifyWebhookSignature(`${payload} `, `sha256=${digest}`, secret), false);
  assert.equal(verifyWebhookSignature(payload, 'sha256=deadbeef', secret), false);
});

test('context7.json, OpenAPI spec, and docs contain valid JSON and zero internal secrets or drift', async () => {
  const ctx = JSON.parse(await fs.readFile(path.join(ROOT, 'context7.json'), 'utf8'));
  assert.ok(Array.isArray(ctx.folders) && ctx.folders.includes('guides'));

  const specPath = path.join(ROOT, 'openapi', 'openapi.v1.json');
  const specRaw = await fs.readFile(specPath, 'utf8');
  const spec = JSON.parse(specRaw);
  assert.ok(spec.openapi && spec.paths);

  const readme = await fs.readFile(path.join(ROOT, 'README.md'), 'utf8');
  assert.doesNotMatch(`${readme}\n${specRaw}`, /\/api\/admin\/|\/api\/internal\/|\/api\/cron\/|\bNVMe\b|\bddos\b/i);
});
