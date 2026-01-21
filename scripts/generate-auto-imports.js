const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

/**
 * Generates auto-imports for config/ and plugins/ index files.
 */
async function generateAutoImports() {
    // Scan for index files in config/ and plugins/
    const configPatterns = ['src/config/**/index.ts', 'src/config/**/index.tsx', 'src/config/**/index.js'];
    const pluginPatterns = ['plugins/**/index.ts', 'plugins/**/index.tsx', 'plugins/**/index.js'];

    const configFiles = await glob(configPatterns, { cwd: path.join(__dirname, '..') });
    const pluginFiles = await glob(pluginPatterns, { cwd: path.join(__dirname, '..') });

    // Generate import statements
    const imports = [...configFiles, ...pluginFiles].map(file => {
        const importPath = file.replace(/^src\//, '').replace(/\\/g, '/').replace(/\.ts$/, '').replace(/\.js$/, '');
        return `import '@/${importPath}';`;
    });

    // Create the content
    const content = `// Auto-generated - do not edit
// Generated on ${new Date().toISOString()}

${imports.join('\n')}
`;

    // Write to src/auto-imports.ts
    const outputPath = path.join(__dirname, '..', 'src', 'auto-imports.ts');
    fs.writeFileSync(outputPath, content);
    console.log(`Auto-imports generated: ${imports.length} files`);
}

generateAutoImports().catch(console.error);