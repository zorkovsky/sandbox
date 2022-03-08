const util = require('util')
const clog = (obj) => console.log(util.inspect(obj, {showHidden: false, depth: null}));


var fonts = {
	Roboto: {
		normal: 'examples/fonts/Roboto-Regular.ttf',
		bold: 'examples/fonts/Roboto-Medium.ttf',
		italics: 'examples/fonts/Roboto-Italic.ttf',
		bolditalics: 'examples/fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

const BLOCK_CONTAINER_PADDING = 2;
const BLOCK_PADDING = 5;

// Declaring layouts
var myTableLayouts = {
    sampleLayout: {
            hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            }
    },
    blockContainerPadding: {
        paddingLeft: function(i, node) { return BLOCK_CONTAINER_PADDING; },
		paddingRight: function(i, node) { return BLOCK_CONTAINER_PADDING; },
		paddingTop: function(i, node) { return BLOCK_CONTAINER_PADDING; },
		paddingBottom: function(i, node) { return BLOCK_CONTAINER_PADDING; },
    },
    blockPadding: {
        paddingLeft: function(i, node) { return BLOCK_PADDING; },
		paddingRight: function(i, node) { return BLOCK_PADDING; },
		paddingTop: function(i, node) { return BLOCK_PADDING; },
		paddingBottom: function(i, node) { return BLOCK_PADDING; },
    }
};


const blockContainer = {
    table: {
        widths: '*',
        body:[
            [
                {
                    fillColor:'#eeeff2',
                    // margin: [-3,-1,-3,-1],
                    // border: [false,false,false,false],
                    table: {
                        body: []
                    },
                    layout: 'blockPadding'
                }
            ]
        ]
        },
        layout: 'blockContainerPadding',
        addLine: function(line) { this.table.body[0][0].table.body.push(JSON.parse(JSON.stringify(line)))}
    };

blockContainer.addLine(['s','x']);
blockContainer.addLine([{ text:'a', colSpan:2},{}]);
blockContainer.addLine([1,2]);
blockContainer.addLine([{ text: '', colSpan:2, lineHeight:1,margin:[-5,-5,-5,-5]},{}]);
blockContainer.addLine([1,2]);



const docDefinition = {
    content: [

    ],
    styles: {},
    defaultStyle: {
		// alignment: 'justify'
	},
    addContent : function(contentItem) { this.content.push(JSON.parse(JSON.stringify(contentItem)))},
    addStyle : function(name, styleObject) { this.styles[name] = styleObject }
};



docDefinition.addStyle('header',{ fontSize: 28, bold: true, margin: [0, 0, 0, 10] });
docDefinition.addStyle('tableExample',{margin: [0, 5, 0, 15]});

docDefinition.addContent(blockContainer);
docDefinition.addContent(blockContainer);

clog(docDefinition);

var docDefinition2 = {
	content: [
		{
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
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				}
			}
		}
    ],
    addLine: function(line) { this.table.body[0][0].table.body.push(JSON.parse(JSON.stringify(line)))}
};


var pdfDoc = printer.createPdfKitDocument(docDefinition,{tableLayouts: myTableLayouts});
pdfDoc.pipe(fs.createWriteStream('pdfs/mytables.pdf'));
pdfDoc.end();
