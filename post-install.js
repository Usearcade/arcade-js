const jsonfile                              = require('jsonfile');
const write                                 = require('write');
const { defaultLocalConfig, stringify }     = require('@usearcade/arcade-libs');
const fs                                    = require('fs').promises;


// This is needed because of a bug with local testing
// Solution + more discussion here: https://github.com/npm/npm/issues/16990#issuecomment-349731142
const projectDir = process.env.INIT_CWD || path.resolve("../../", __dirname);


// Arcade will have to be the package name
// File that handles running scripts
const executableFile = `const Arcade = require('@usearcade/arcade-js');
const config = require('../arcade-config.json');

if (process.argv[2] === 'update=true') {
    Arcade.updateTokens(config, {});
} else {
    Arcade.buildTokens(config, {});
}
`;


// This file gets triggered after install
(async () => {
    try {

        // Write test.js file with our operations
        console.log('Executing arcade-js postinstall...');

        // Make sure config is there, generate one if not
        await handleConfig();

        // Write our executable scripts
        write(`${projectDir}/.arcade/execute.js`, executableFile, { newline: true, overwrite: true });

        // Add script to scripts part of package that will specify actions
        await addScriptToPackage({ key: "arcade-update",    value: "node ./.arcade/execute.js update=true", force: true });
        await addScriptToPackage({ key: "arcade-build",     value: "node ./.arcade/execute.js",             force: true });

        console.log('\nInstall success.');
        console.log('Ensure arcade-config.json contains your project details.');
        console.log('\n          npm run arcade-build');
        console.log('                     to build your tokens in their current configuration.');
        console.log('\n          npm run arcade-update');
        console.log('                     to update your tokens and rebuild them.');
        console.log('\n\n');

    } catch (err) {
        process.exitCode = 1;
        console.log('Error: ', err);
        return err;
    }
})();


// Quick way to modify scripts section of the package we're installing to
async function addScriptToPackage ({ key, value, force }) {
    const file = `${projectDir}/package.json`;
    const package = await jsonfile.readFile(file);
    if (!package.scripts) { package.scripts = {} }
    if (package.scripts[key] && !force) { return Promise.reject(`Script with key ${key} already exists. Specify force=true to overwrite.`) }
    package.scripts[key] = value;
    await jsonfile.writeFile(`${projectDir}/package.json`, package);
    return package;
}


// Make sure config is there, generate one if not
async function handleConfig () {
    // See if config exists...
    try {
        const file = `${projectDir}/arcade-config.json`;
        const config = await jsonfile.readFile(file);
        if (config) { return config }

    // If not, reading the file will fail and will be sent down here...
    } catch (err) {
        const config = defaultLocalConfig();
        config.access_token = "";
        await fs.writeFile(`${projectDir}/arcade-config.json`, stringify(config));
        return config;
    }
}
