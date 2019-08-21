var path = require("path");
var fs = require("fs");


try {
    var custPth = require(`../bin-extra/vjuh-pty-${process.platform}`).path;
    var pty_module = false;
    var last_module = 0;

    var modules = fs.readdirSync(custPth).filter(e => fs.statSync(path.join(custPth, e)).isDirectory());
    for (const module of modules) {
        if (module == `${process.arch}_m${process.versions.modules}`) {
            pty_module = module;
            break;
        }
        var parsed = module.split("_m");
        last_module = (parsed[0] == process.arch && parseInt(parsed[1]) > 0) ? parseInt(parsed.pop()) : last_module;
    }

    if (!pty_module) {
        pty_module = `${process.arch}_m${last_module}`;
    }

    pty_path = path.join(custPth, pty_module, 'pty.node');
    try {
        if (fs.lstatSync(pty_path + '.bak').isFile()) {
            fs.renameSync(pty_path + '.bak', pty_path)
        }
    } catch (err) {
        console.error(err);
    }
    console.log(pty_path);
} catch (e) {
    console.error(e);
}