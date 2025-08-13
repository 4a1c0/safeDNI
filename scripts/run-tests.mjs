#!/usr/bin/env node
import { spawn } from 'child_process';

// Remove proxy-related npm config env vars to avoid warnings
delete process.env.npm_config_http_proxy;
delete process.env.npm_config_https_proxy;

const child = spawn('npx', ['vitest', 'run'], {
  stdio: 'inherit',
  env: process.env,
});

child.on('close', (code) => process.exit(code));
