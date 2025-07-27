// This script updates .env.local with the current version from package.json
const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, '../package.json');
const envPath = path.resolve(__dirname, '../.env.local');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  // Remove any existing NEXT_PUBLIC_APP_VERSION line
  envContent = envContent.replace(/^NEXT_PUBLIC_APP_VERSION=.*$/m, '');
}
// Add the version line
envContent = envContent.trim() + `\nNEXT_PUBLIC_APP_VERSION=${version}\n`;
fs.writeFileSync(envPath, envContent.trim() + '\n');
console.log(`.env.local updated with NEXT_PUBLIC_APP_VERSION=${version}`);
