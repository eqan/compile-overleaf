const compileOverleaf = require('./src');

try {
    //https://www.overleaf.com/read/vbwkxyryybkd
    const token = 'vbwkxyryybkdI';
    compileOverleaf(token).then((res) => {
        /**
         * {
         *  name: 'projectName',
         *  link: {pdf: 'https://compiles.overleaf.com/....'}
         * }
         **/
        console.log(res);
    });
} catch (e) {
    /**
     *     status: e.statusCode, <response from server>
     *     stage: e.message, <where error happens>
     **/
    console.log(e);
}
