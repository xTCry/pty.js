
const Fs = require("fs");
const Path = require("path");

const b64Loader = require("b64-loader").custom;

const tempDir = "blessed-pty";

const folders = Fs.readdirSync('./bin/').filter(e => Fs.statSync(Path.join('./bin/', e)).isDirectory());

for (const os of folders) {
    const res = b64Loader(
        `./bin/${os}/TARGET_FOLDER`,
        null, // No source
        {
            resourceDir: os,
            tempDir,
            dirs: {
                'TARGET_FOLDER': [
                    '.',
                ]
            }
        }
    );
    Fs.writeFileSync(`./bin-extra/vjuh-pty-${os}.js`, res);
}