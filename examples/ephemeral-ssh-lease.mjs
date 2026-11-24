#!/usr/bin/env node
import { generateKeyPairSync } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function encodeSshString(buf) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(buf.length, 0);
  return Buffer.concat([len, buf]);
}

/**
 * Generates an in-memory Ed25519 keypair in OpenSSH public key format (`ssh-ed25519 AAAA...`)
 * using Node's built-in `node:crypto` without external binaries.
 */
export function generateEphemeralEd25519Keypair(comment = 'sau-ephemeral') {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const spkiDer = publicKey.export({ type: 'spki', format: 'der' });
  const rawPubKey = spkiDer.subarray(spkiDer.length - 32);
  const sshBlob = Buffer.concat([
    encodeSshString(Buffer.from('ssh-ed25519', 'ascii')),
    encodeSshString(rawPubKey),
  ]);
  return {
    publicKeyLine: `ssh-ed25519 ${sshBlob.toString('base64')} ${comment}`,
    privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString('utf8'),
  };
}

export async function requestEphemeralSshLease({
  instanceId,
  apiToken,
  apiBase = 'https://serversareup.com',
  publicKeyLine,
  leaseSeconds = 1800,
}) {
  if (!instanceId || !apiToken) {
    throw new Error('Both instanceId and apiToken are required.');
  }
  const cleanBase = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
  const res = await fetch(
    `${cleanBase}/api/v1/instances/${encodeURIComponent(instanceId)}/ssh-leases`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `lease-${instanceId}-${Date.now()}`,
      },
      body: JSON.stringify({
        publicKey: publicKeyLine,
        leaseSeconds: Math.max(60, Math.min(3600, Math.round(leaseSeconds))),
      }),
    },
  );
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body?.error || `HTTP ${res.status}`);
  }
  return body;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const instanceId = process.argv[2];
  const leaseSeconds = Number(process.argv[3] || 1800);
  const apiToken = process.env.SAU_API_TOKEN;
  if (!instanceId || !apiToken) {
    console.error('Usage: SAU_API_TOKEN=sau_... node examples/ephemeral-ssh-lease.mjs <instance-id> [lease-seconds]');
    process.exit(1);
  }
  const kp = generateEphemeralEd25519Keypair();
  const lease = await requestEphemeralSshLease({
    instanceId,
    apiToken,
    publicKeyLine: kp.publicKeyLine,
    leaseSeconds,
  });
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sau-ssh-'));
  const knownHostsPath = path.join(tmpDir, 'known_hosts');
  if (lease.knownHosts) {
    await fs.writeFile(knownHostsPath, `${lease.knownHosts}\n`, { mode: 0o600 });
  }
  console.log(JSON.stringify({ lease, knownHostsPath }, null, 2));
}
