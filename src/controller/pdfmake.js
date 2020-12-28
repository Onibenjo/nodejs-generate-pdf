var fonts = {
	Roboto: {
		normal: 'src/assets/fonts/Roboto/Roboto-Regular.ttf',
		bold: 'src/assets/fonts/Roboto/Roboto-Medium.ttf',
		italics: 'src/assets/fonts/Roboto/Roboto-Italic.ttf',
		bolditalics: 'src/assets/fonts/Roboto/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
	content: [
		{ text: 'Tables', style: 'header' },
		'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
		{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
		'The following table has nothing more than a body array',
		{
			style: 'tableExample',
			table: {
				body: [
					['Column 1', 'Column 2', 'Column 3'],
					['One value goes here', 'Another one here', 'OK?']
				]
			}
		},
		{ text: 'Defining column widths', style: 'subheader' },
		'Tables support the same width definitions as standard columns:',
		{
			bold: true,
			ul: [
				'auto',
				'star',
				'fixed value'
			]
		},
		{
			style: 'tableExample',
			table: {
				widths: [100, '*', 200, '*'],
				body: [
					['width=100', 'star-sized', 'width=200', 'star-sized'],
					['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
				]
			}
		},
		{
			style: 'tableExample',
			table: {
				widths: ['*', 'auto'],
				body: [
					['This is a star-sized column. The next column over, an auto-sized column, will not wrap to accomodate all the text in this cell, because it has been given the noWrap style.', { text: 'I am auto sized.', noWrap: true }],
				]
			}
		},
		'With height from function:',
		{
			style: 'tableExample',
			table: {
				heights: function (row) {
					return (row + 1) * 25;
				},
				body: [
					['row 1', 'column B'],
					['row 2', 'column B'],
					['row 3', 'column B']
				]
			}
		},
		{ text: 'Column/row spans', pageBreak: 'before', style: 'subheader' },
		'Each cell-element can set a rowSpan or colSpan',
		{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: [200, 'auto', 'auto'],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
					[{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
					[{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					[{ rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3'],
					['', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, ''],
					['Sample value 1', '', ''],
				]
			}
		},
		{ text: 'Headers', pageBreak: 'before', style: 'subheader' },
		'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
		{ text: ['It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here'], color: 'gray', italics: true },
		{
			style: 'tableExample',
			table: {
				headerRows: 1,
				// dontBreakRows: true,
				keepWithHeaderRows: 1,
				body: [
					[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
					[
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					]
				]
			}
		},
		{ text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
		{
			style: 'tableExample',
			table: {
				headerRows: 1,
				body: [
					[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
				]
			},
			layout: 'noBorders'
		},
		{ text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
		{
			style: 'tableExample',
			table: {
				headerRows: 1,
				body: [
					[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
				]
			},
			layout: 'headerLineOnly'
		},
		{ text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
		{
			style: 'tableExample',
			table: {
				headerRows: 1,
				body: [
					[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
				]
			},
			layout: 'lightHorizontalLines'
		},
		{ text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8] },
		{
			style: 'tableExample',
			table: {
				headerRows: 1,
				body: [
					[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
				]
			},
			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				},
				// hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
				// vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
				// paddingLeft: function(i, node) { return 4; },
				// paddingRight: function(i, node) { return 4; },
				// paddingTop: function(i, node) { return 2; },
				// paddingBottom: function(i, node) { return 2; },
				// fillColor: function (rowIndex, node, columnIndex) { return null; }
			}
		},
		{ text: 'zebra style', margin: [0, 20, 0, 8] },
		{
			style: 'tableExample',
			table: {
				body: [
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
				]
			},
			layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
				}
			}
		},
		{ text: 'handling fill color opacity...', margin: [0, 20, 0, 8] },
		{ text: '... just hardcoding values in the second row', margin: [0, 20, 0, 8] },
		{
			style: 'tableExample',
			table: {
				body: [
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					[
						{text: 'Sample value 1',fillOpacity:0.15,fillColor:'blue'},
						{text: 'Sample value 2',fillOpacity:0.60,fillColor:'blue'},
						{text: 'Sample value 3',fillOpacity:0.85,fillColor:'blue'},
					],
					['Sample value 1', 'Sample value 2', 'Sample value 3']
				]
			},
		}		
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableOpacityExample: {
			margin: [0, 5, 0, 15],
			fillColor: 'blue',
			fillOpacity: 0.3
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('outputs/pdfmake-tables.pdf'));
pdfDoc.end();