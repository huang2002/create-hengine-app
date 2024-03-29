const { crtServer } = require('3h-serve'),
    { join } = require('path');

const HOMEPAGE_PATTERN = /^\/(?:index(?:\.html|\/)?)?$/,
    HOMEPAGE_PATH = '/test/index.html',
    INSPECTOR_URL = '/__inspector__.js',
    INSPECTOR_PATH = '/test/inspector.js',
    SRC_PATTERN = /^\/__src__(\/.+)/,
    LIB_URL = '/__lib__.js',
    LIB_PATH = '/node_modules/hengine/dist/hengine.umd.js';

crtServer({
    dir: join(__dirname, '..'),
    port: $port$,
    filter: ({ url }) => {
        if (SRC_PATTERN.test(url)) {
            return `/src${RegExp.$1}`;
        } else if (HOMEPAGE_PATTERN.test(url)) {
            return HOMEPAGE_PATH;
        } else if (url === INSPECTOR_URL) {
            return INSPECTOR_PATH;
        } else if (url === LIB_URL) {
            return LIB_PATH;
        } else {
            return `/dist${url}`;
        }
    }
});
