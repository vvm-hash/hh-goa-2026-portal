const fs = require('fs');
const path = require('path');
const b64 = fs.readFileSync(path.join(__dirname, 'public', 'hhgoalogo.jpg')).toString('base64');
const fileContent = 'export const HH_LOGO_BASE64 = "data:image/jpeg;base64,' + b64 + '";\n';
fs.writeFileSync(path.join(__dirname, 'lib', 'logo-base64.ts'), fileContent);
console.log('Fixed logo-base64.ts');
