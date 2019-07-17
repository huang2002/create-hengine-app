// @ts-check
const CLI = require('3h-cli'),
    // @ts-ignore
    packageInfo = require('./package.json'),
    { init, getLatestVersion, log } = require('./lib');

const cli = CLI.create({
    name: packageInfo.name,
    title: packageInfo.description,
    lineGapSize: 1
}).first({
    name: 'name',
    help: 'Your app name'
}).arg({
    name: 'h',
    alias: ['-help'],
    help: 'Show help info'
}).arg({
    name: 'd',
    alias: ['-dir'],
    val: 'dir',
    help: 'The directory to create\n' +
        'Default: the app name'
}).arg({
    name: 'v',
    alias: ['-ver'],
    val: 'ver',
    help: 'The version of `hengine` to use\n' +
        'Default: the latest'
}).on('exec', args => {
    if (args.has('h')) {
        cli.help();
    } else {
        (async () => {
            const appName = args.get('name')[0];
            init({
                dirName: args.has('d') ? args.get('d')[0] : appName,
                appName,
                libVersion: args.has('v') ? args.get('v')[0] : await getLatestVersion(),
            });
        })().catch(error => {
            log(`An error occurred: ${error}`);
            process.exit(1);
        });
    }
}).exec(process.argv);
