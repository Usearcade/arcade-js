const fs                                            = require('fs').promises;
const { getDefaultTemplateJSON, stringify, log }    = require('@usearcade/arcade-libs');
const build                                         = require('./build');
const getExports                                    = require('./get-exports');
const ensureValidToken                              = require('./ensure-valid-token');

const buildTokens = async (config, options = {}) => {
    try {

        await ensureValidConfig({ config });
        await ensureValidToken({ token: config.access_token, projectId: config.project_id });

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
        process.exitCode = 1;
        log({ msg: '\n' });
        log({ msg: err, type: 'error' });
        log({ msg: '\n' });
    }
}

const updateTokens = async (config, options = {}) => {
    try {
        log({ msg: 'Updating tokens...' });
        const res = await buildTokens({ ...config, version: 'live' }, config.access_token, { ...options, return_response: true });
        config.version = res.version;
        await fs.writeFile(`${__dirname}/../arcade-config.json`, stringify(config));
        log({ msg: `Successfully updated tokens to version ${res.version}.`, type: 'success' });
        
        return res;
    } catch (err) {
        process.exitCode = 1;
        log({ msg: '\n' });
        log({ msg: err, type: 'error' });
        log({ msg: '\n' });
    }
}

const ensureValidConfig = async ({ config }) => {
    if (!config.access_token) {
        return Promise.reject('No access_token supplied in arcade-config.json');
    }
    
    if (!config.project_id) {
        return Promise.reject('No project_id supplied in arcade-config.json');
    }

    if (!config.version) {
        return Promise.reject('No version supplied in arcade-config.json');
    }

    if (!config.formats) {
        return Promise.reject('No formats supplied in arcade-config.json');
    }

    return config;
}


module.exports = { buildTokens, getDefaultTemplateJSON, stringify, updateTokens }
