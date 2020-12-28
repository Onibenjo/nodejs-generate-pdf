// import PDFDocument from 'pdfkit';
// 'use strict';
const PDFDocument = require('pdfkit');
// export type PDFTable = {
//   headers: string[];
//   rows: string[][];
// };

// export type PDFTableOptions = {
//   columnSpacing?: number;
//   rowSpacing?: number;
//   width?: number;
//   prepareHeader?: () => void;
//   prepareRow?: (row: string[], index: number) => void;
// };

// export class PDFDocumentWithTables extends PDFDocument {
//   constructor(options: PDFKit.PDFDocumentOptions) {
//     super(options);
//   }

//   table(
//     table: PDFTable,
//     arg0?: number | PDFTableOptions,
//     arg1?: number | PDFTableOptions,
//     arg2?: number | PDFTableOptions,
//   ) {
//     let startX = this.page.margins.left,
//       startY = this.y;
//     let options = {} as PDFTableOptions;

//     if (typeof arg0 === 'number' && typeof arg1 === 'number') {
//       startX = arg0;
//       startY = arg1;

//       if (typeof arg2 === 'object') options = arg2;
//     } else if (typeof arg0 === 'object') {
//       options = arg0;
//     }

//     const columnCount = table.headers.length;
//     const columnSpacing = options.columnSpacing || 15;
//     const rowSpacing = options.rowSpacing || 5;
//     const usableWidth =
//       options.width ||
//       this.page.width - this.page.margins.left - this.page.margins.right;

//     const prepareHeader = options.prepareHeader || (() => {});
//     const prepareRow = options.prepareRow || (() => {});
//     const computeRowHeight = (row: string[]) => {
//       let result = 0;

//       row.forEach((cell) => {
//         const cellHeight = this.heightOfString(cell, {
//           width: columnWidth,
//           align: 'left',
//         });
//         result = Math.max(result, cellHeight);
//       });

//       return result + rowSpacing;
//     };

//     const columnContainerWidth = usableWidth / columnCount;
//     const columnWidth = columnContainerWidth - columnSpacing;
//     const maxY = this.page.height - this.page.margins.bottom;

//     let rowBottomY = 0;

//     this.on('pageAdded', () => {
//       startY = this.page.margins.top;
//       rowBottomY = 0;
//     });

//     // Allow the user to override style for headers
//     prepareHeader();

//     // Check to have enough room for header and first rows
//     if (startY + 3 * computeRowHeight(table.headers) > maxY) this.addPage();

//     // Print all headers
//     table.headers.forEach((header, i) => {
//       this.text(header, startX + i * columnContainerWidth, startY, {
//         width: columnWidth,
//         align: 'left',
//       });
//     });

//     // Refresh the y coordinate of the bottom of the headers row
//     rowBottomY = Math.max(startY + computeRowHeight(table.headers), rowBottomY);

//     // Separation line between headers and rows
//     this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
//       .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
//       .lineWidth(2)
//       .stroke();

//     table.rows.forEach((row, i) => {
//       const rowHeight = computeRowHeight(row);

//       // Switch to next page if we cannot go any further because the space is over.
//       // For safety, consider 3 rows margin instead of just one
//       if (startY + 3 * rowHeight < maxY) startY = rowBottomY + rowSpacing;
//       else this.addPage();

//       // Allow the user to override style for rows
//       prepareRow(row, i);

//       // Print all cells of the current row
//       row.forEach((cell, i) => {
//         this.text(cell, startX + i * columnContainerWidth, startY, {
//           width: columnWidth,
//           align: 'left',
//         });
//       });

//       // Refresh the y coordinate of the bottom of this row
//       rowBottomY = Math.max(startY + rowHeight, rowBottomY);

//       // Separation line between rows
//       this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
//         .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
//         .lineWidth(1)
//         .opacity(0.7)
//         .stroke()
//         .opacity(1); // Reset opacity after drawing the line
//     });

//     this.x = startX;
//     this.moveDown();

//     return this;
//   }
// }



class PDFDocumentWithTables extends PDFDocument {
    constructor (options) {
        super(options);
    }

    table (table, arg0, arg1, arg2) {
        let startX = this.page.margins.left, startY = this.y;
        let options = {};

        if ((typeof arg0 === 'number') && (typeof arg1 === 'number')) {
            startX = arg0;
            startY = arg1;

            if (typeof arg2 === 'object')
                options = arg2;
        } else if (typeof arg0 === 'object') {
            options = arg0;
        }

        const columnCount = table.headers.length;
        const columnSpacing = options.columnSpacing || 15;
        const rowSpacing = options.rowSpacing || 5;
        const usableWidth = options.width || (this.page.width - this.page.margins.left - this.page.margins.right);

        const prepareHeader = options.prepareHeader || (() => {});
        const prepareRow = options.prepareRow || (() => {});
        const computeRowHeight = (row) => {
            let result = 0;

            row.forEach((cell) => {
                const cellHeight = this.heightOfString(cell, {
                    width: columnWidth,
                    align: 'left'
                });
                result = Math.max(result, cellHeight);
            });

            return result + rowSpacing;
        };

        const columnContainerWidth = usableWidth / columnCount;
        const columnWidth = columnContainerWidth - columnSpacing;
        const maxY = this.page.height - this.page.margins.bottom;

        let rowBottomY = 0;

        this.on('pageAdded', () => {
            startY = this.page.margins.top;
            rowBottomY = 0;
        });

        // Allow the user to override style for headers
        prepareHeader();

        // Check to have enough room for header and first rows
        if (startY + 3 * computeRowHeight(table.headers) > maxY)
            this.addPage();

        // Print all headers
        table.headers.forEach((header, i) => {
            this.text(header, startX + i * columnContainerWidth, startY, {
                width: columnWidth,
                align: 'left'
            });
        });

        // Refresh the y coordinate of the bottom of the headers row
        rowBottomY = Math.max(startY + computeRowHeight(table.headers), rowBottomY);

        // Separation line between headers and rows
        this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
            .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
            .lineWidth(2)
            .stroke();

        table.rows.forEach((row, i) => {
            const rowHeight = computeRowHeight(row);

            // Switch to next page if we cannot go any further because the space is over.
            // For safety, consider 3 rows margin instead of just one
            if (startY + 3 * rowHeight < maxY)
                startY = rowBottomY + rowSpacing;
            else
                this.addPage();

            // Allow the user to override style for rows
            prepareRow(row, i);

            // Print all cells of the current row
            row.forEach((cell, i) => {
                this.text(cell, startX + i * columnContainerWidth, startY, {
                    width: columnWidth,
                    align: 'left'
                });
            });

            // Refresh the y coordinate of the bottom of this row
            rowBottomY = Math.max(startY + rowHeight, rowBottomY);

            // Separation line between rows
            this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
                .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
                .lineWidth(1)
                .opacity(0.7)
                .stroke()
                .opacity(1); // Reset opacity after drawing the line
        });

        this.x = startX;
        this.moveDown();

        return this;
    }
}

function createTable(doc, rows, fontName, fontSize) {
    doc.font(fontName || 'Helvetica', fontSize || 10);
  
    const pageWidth = Math.round(doc.page.width - doc.page.margins.left - doc.page.margins.right);
    const textSpacer = 10;
  
    let { y } = doc;
    const { x } = doc;
  
    rows.forEach(row => {
      // table border
      const arr = row.map(column => doc.heightOfString(column.text, { width: column.width * pageWidth }));
  
      const cellHeight = Math.max(...arr) + textSpacer * 2;
      doc.lineWidth(0.3);
      doc.strokeColor('lightgrey');
  
      doc
        .lineJoin('miter')
        .rect(x, y, pageWidth, cellHeight)
        .stroke();
  
      let writerPos = x;
      for (let i = 0; i < row.length - 1; i++) {
        writerPos += row[i].width * pageWidth;
  
        doc
          .lineCap('butt')
          .moveTo(writerPos + textSpacer, y)
          .lineTo(writerPos + textSpacer, y + cellHeight)
          .stroke();
      }
  
      // table text
      let textWriterPos = x;
      for (let i = 0; i < row.length; i++) {
        doc.text(row[i].text, textWriterPos + textSpacer, y + textSpacer, {
          continued: false,
          width: row[i].width * pageWidth - (textSpacer + 5),
        });
        textWriterPos += row[i].width * pageWidth + (textSpacer - 5);
      }
  
      y += cellHeight;
    });
  
    doc.moveDown(2);
    doc.text('', doc.page.margins.left);
  }

  module.exports = {PDFDocumentWithTables,createTable};