const fs = require('fs').promises;
const { getDefaultTemplateJSON, stringify } = require('@usearcade/arcade-libs');

const build = require('./build');
const getExports = require('./get-exports');

const buildTokens = async (config, options = {}) => {
    try {

        await ensureValidConfig({ config });

        // BUILD HERE
        const res = options.skip_build
            ? await getExports({ config, token: config.access_token, options })
            : await build({ config, token: config.access_token, options });

        if (options.return_response) { return res }

        // Will only return the first format if this option is specified
        // Usually for JSON objects
        if (options.return_output) {
            const exportKeys = Object.keys(res.exports);
            const exportObj = res.exports[exportKeys[0]];
            if (exportObj.group === 'json') { return JSON.parse(exportObj.output) }
            return exportObj.output;
        }

        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}

const updateTokens = async (config, options = {}) => {
    try {
        console.log('Updating tokens...');
        const res = await buildTokens({ ...config, version: 'live' }, config.access_token, { ...options, return_response: true });
        config.version = res.version;
        await fs.writeFile(`${__dirname}/../arcade-config.json`, stringify(config));
        console.log(`Successfully updated tokens to version ${res.version}.`);

        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}

const ensureValidConfig = async (config) => {
    if (!config.access_token) {
        process.exitCode = 1;
        console.error('No access_token supplied in arcade-config.json');
    }
    
    if (!config.project_id) {
        process.exitCode = 1;
        console.error('No project_id supplied in arcade-config.json');
    }

    if (!config.version) {
        process.exitCode = 1;
        console.error('No version supplied in arcade-config.json');
    }

    if (!config.formats) {
        process.exitCode = 1;
        console.error('No formats supplied in arcade-config.json');
    }
}


module.exports = { buildTokens, getDefaultTemplateJSON, stringify, updateTokens }
