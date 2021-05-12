const { GETrequestWithToken } = require('@usearcade/arcade-libs');
const { API_STYLE_STRINGS } = require('@usearcade/arcade-libs').endpoints;

const getExports = async ({ config, token, options }) => {
    // Get array of formats for endpoint
    const formats   = config.formats.map(f => f.format_name);
    const endpoint  = API_STYLE_STRINGS({ projectId: config.project_id, version: config.version, formats });

    // Get our styles
    const res       = await GETrequestWithToken({ endpoint, token });
    return res;
}

module.exports = getExports;
