const fs = require('fs')

var pdf = require('../service/voilab').create();

pdf.pipe(fs.createWriteStream('outputs/voilab.pdf'));
pdf.end();
   