const { GETrequestWithToken } = require('@usearcade/arcade-libs').requestPrototypes;
const { API_AUTHENTICATE_TOKEN } = require('@usearcade/arcade-libs').endpoints;

const ensureValidToken = async ({ token, projectId }) => {
    try {
        // Get array of formats for endpoint
        const endpoint  = API_AUTHENTICATE_TOKEN({ projectId });

        // Get our styles
        const res       = await GETrequestWithToken({ endpoint, token });
        return res;
    } catch (err) {
        return Promise.reject('Invalid Arcade access token.');
    }
}

module.exports = ensureValidToken;
