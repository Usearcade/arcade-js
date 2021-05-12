const getExports = require('./get-exports');
const fs = require('fs').promises;

const log = () => console.log;

const build = async ({ config, token = '', options }) => {

    // Get exports
    const res = await getExports({ config, token, options });
    const compiledFormats = Object.keys(res.exports).map(format => res.exports[format]);

    // Create a map based on file name to easily get export properties
    let formatsMap = {}
    config.formats.map(f => formatsMap[f.format_name] = f);

    // Write some shit
    log({ msg: '\n----------\n', options });
    log({ msg: `Building token files from version ${res.version}...`, options });

    // Loop through formats and write files
    for (const format of compiledFormats) {
        const { output_target, file_name } = formatsMap[format.name];
        const fileString = format.output;
        const outputPath = `${output_target}${file_name}.${format.fileExtension}`;
        await fs.writeFile(outputPath, fileString);
        log({ msg: `\nSuccessfully built ${format.displayName} at ${outputPath}!`, type: 'success', options });
    }
    log({ msg: '\n----------\n', options });

    return res;
}

module.exports = build;
