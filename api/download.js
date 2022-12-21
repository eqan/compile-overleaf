const axios = require('axios');
const buildHeader = (filename) => {
    return {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${filename}`,
    };
};

module.exports = async (req, res) => {
    let { link = '', filename = 'Eqan Resume.pdf' } = req.query;
    try {
        link = new URL(link);
    } catch (e) {
        res.status(404).send(`Invaild Link: ${link}`);
        return;
    }
    if (link.hostname === 'compiles.overleaf.com') {
        axios({
            url: link.href,
            responseType: 'stream',
        }).then((file) => {
            res.writeHead(200, buildHeader(filename));
            file.data.pipe(res);
        });
    } else {
        res.status(404).send('hostname not matched');
    }
};
