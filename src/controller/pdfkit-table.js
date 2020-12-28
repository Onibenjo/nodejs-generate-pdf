const { PDFDocumentWithTables, createTable } = require("../service/pdfKitTable");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocumentWithTables()

const table0 = {
    headers: ['Word', 'Comment', 'Summary'],
    rows: [
        ['Apple', 'Not this one', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra at ligula gravida ultrices. Fusce vitae pulvinar magna.'],
        ['Tire', 'Smells like funny', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra at ligula gravida ultrices. Fusce vitae pulvinar magna.']
    ]
};

doc.table(table0, {
    prepareHeader: () => doc.font('Helvetica-Bold'),
    prepareRow: (row, i) => doc.font('Helvetica').fontSize(12)
});

const table1 = {
    headers: ['Country', 'Conversion rate', 'Trend'],
    rows: [
        ['Switzerland', '12%', '+1.12%'],
        ['France', '67%', '-0.98%'],
        ['England', '33%', '+4.44%']
    ]
};

doc.moveDown().table(table1, 100, 350, { width: 300 });

doc.end();
doc.pipe(fs.createWriteStream(`outputs/invoice-table-class-${(Math.random() * 1000).toFixed()}.pdf`));





const testData = [
    [
        {
            text: 'row1 column1',
            width: 0.3,
        },
        {
            text: 'row1 column2',
            width: 0.7,
        },
    ],
    [
        {
            text: 'row2 column1',
            width: 0.3,
        },
        {
            text: 'row2 column2',
            width: 0.7,
        },
    ],
];

const doc22 = new PDFDocument();

createTable(doc22, testData);
doc22.end();
doc22.pipe(fs.createWriteStream(`outputs/invoice-table-${(Math.random() * 1000).toFixed()}.pdf`));