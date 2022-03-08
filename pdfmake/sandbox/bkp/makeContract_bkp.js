const util = require('util')
const clog = (obj) => console.log(util.inspect(obj, {showHidden: false, depth: null}));

var fonts = {
	Roboto: {
		normal: 'examples/fonts/Roboto-Regular.ttf',
		bold: 'examples/fonts/Roboto-Medium.ttf',
		italics: 'examples/fonts/Roboto-Italic.ttf',
		bolditalics: 'examples/fonts/Roboto-MediumItalic.ttf'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
};

var PdfPrinter = require('../../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

// const BLOCK_CONTAINER_PADDING = 2;

const BLOCK_PADDING = 2;
const BLOCK_FILL_COLOR = '#eeeff2';

const BLOCK_LINE_PADDING = 2;
const BLOCK_LINE_HEIGHT = 13;

const WIDTH_LABEL_SECTION = 75;
const WIDTH_LABEL_SHORT = 25;
const WIDTH_LABEL_MEDIUM = 75;
const WIDTH_LABEL_LONG = 110;


// EMPTY DOCDEFINITION
const createDocDefinition = () => { return {
    // background: function (page) {
	// 	if (page !== 2) {
	// 		return [
    //             {text:'', margins:[10,10,10,10]},
    //             {
    //                 image: 'src/img/CZ ACZ logo.png',
    //             },
    //             'Background paragraph on page ' + page,
	// 			'Another background paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	// 		];
	// 	}
    // },
    header: function(currentPage, pageCount,pageSize) {
        return [
            { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
            { canvas: [ { type: 'rect', color:'red', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
        ]
        },
    content: [],
    styles: {},
    defaultStyle: {
        font: 'Helvetica'
        // alignment: 'justify'
	},
    addContent : function(contentItem) { this.content.push(contentItem)},
    addBlankLine: function() { this.addContent({text: '', margin:[0,5,0,5]}) },
    addStyle : function(name, style) { this.styles[name] = style },
    addStyles : function(styles) {this.styles = styles}
}
};

// Layouts
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
    block: {
        paddingLeft: function(i, node) { return BLOCK_PADDING ; },
		paddingRight: function(i, node) { return BLOCK_PADDING; },
		paddingTop: function(i, node) { return (i === 0 ? BLOCK_PADDING : BLOCK_PADDING) },
        paddingBottom: function(i, node) { return (i=== node.table.body.length ? BLOCK_PADDING : BLOCK_PADDING) },
        defaultBorder: false
    },
    blockLine: {
        defaultBorder: false,
        paddingLeft: function(i, node) { return BLOCK_LINE_PADDING; },
		paddingRight: function(i, node) { return BLOCK_LINE_PADDING; },
		paddingTop: function(i, node) { return 0; },
        paddingBottom: function(i, node) { return 0; },
        hLineWidth: function (i, node) { return 0.5; },
        vLineWidth: function (i, node) { return 0.5; }
    }
};


// Styles
styles = { styles: {
    header: {
        fontSize: 18,
        // bold: true,
        margin: [0, 0, 0, 10]
    },
    tableExample: {
        margin: [0, 5, 0, 15]
    },
    label: {
        fontSize: 12
    },
    value: {
        fontSize: 16,
        // bold: true
    }
}};

// docDefinition.addStyle('header',{ fontSize: 28, bold: true, margin: [0, 0, 0, 10] });
// docDefinition.addStyle('tableExample',{margin: [0, 5, 0, 15]});
// docDefinition.addStyle('label', {fontSize: 12});
// docDefinition.addStyle('value', {fontSize: 16, bold: true});



const docDefinition = createDocDefinition();
docDefinition.addStyles(styles);

// TEMPLATES
const header = [
    // absolutePosition: { x: 30, y:30 }
        // fillColor: BLOCK_FILL_COLOR,
        // border: [false,false,false,false],
        // // absolutePosition: { x: 0, y:0 },
        // relativePosition: { x: -30, y:0 },
        // table: {
        //     widths: ['*'],
        //     body: [
        //         [{image: 'src/img/CZ ACZ logo.png', width: 230, height: 73,alignment: 'left' }],
        //     ]
        // }
    { text: 'x', margins:[0,40,0,40], background: 'gray', absolutePosition:{ x:0, y:0 }},
    { text: 'b'}
];



// --------- START CONSTRUCTION
docDefinition.addContent(header);
docDefinition.addBlankLine();

companyDetails = companyDetailsBlock();

companyDetails.addLine(['LABEL','VALUE']);
companyDetails.addLine(newField('a','b'));
companyDetails.addLine([{ text: 'a', colSpan:2, lineHeight:3},{}]);
companyDetails.addLine([1,2]);
companyDetails.addLine([1,2]);

docDefinition.addContent(companyDetails);
docDefinition.addBlankLine();

// companyDetails.clear();
directors = [];
directors.push(newBlockContainer());

directors[0].addLine([1,2]);
directors[0].addLine([
        { text: 'Obchodní firma/Název:', style: 'label' },
        { text:'RAGEN, spol.s.r.o.', style: 'value'}
    ]);

docDefinition.addContent(directors[0]);


// --------- END OF CONSTRUCTION

docDefinitionBlockStructure = {
    content: [
        {
            fillColor: BLOCK_FILL_COLOR,
            layout: 'block',
            table: {
                widths: '*',
                body: [
                    [
                        {
                            // border: [true,true,true,true],
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION + 4 + WIDTH_LABEL_SHORT,'*'],
                                body: [
                                       [
                                           {text: 'Obchodní firma/Název:', style: 'sectionLabel', italics:false, bold:false},
                                           {text: 'RAGEN, spol.s.r.o.', style: 'value', border: [true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_LONG,'*','auto',50,'auto',50], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: 'Zapsaná u', style: 'sectionLabel'},
                                           {text: 'Krajský soud, obchodní rejstřík v:', style: 'label'},
                                           {text: 'Trenčín', style: 'value', border:[true,true,true,true]},
                                           {text: 'Oddíl:', style: 'label'},
                                           {text: 'Sro', style: 'value', border:[true,true,true,true]},
                                           {text: 'Vložka:', style: 'label'},
                                           {text: '12311/R', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_MEDIUM,'*',25, 139 ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: '', style: 'sectionLabel'},
                                           {text: 'Živnostenský úřad v:', style: 'label'},
                                           {text: '', style: 'value', border:[true,true,true,true]},
                                           {text: 'Č.j.:', style: 'label'},
                                           {text: '', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT,'*','auto', '*' ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: '', style: 'sectionLabel'},
                                           {text: 'IČ:', style: 'label'},
                                           {text: '36315281', style: 'value', border:[true,true,true,true]},
                                           {text: 'DIČ:', style: 'label'},
                                           {text: '2020177764', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_MEDIUM,'*','auto', 137 ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: '', style: 'sectionLabel'},
                                           {text: 'Daňový domicil:', style: 'label'},
                                           {text: 'SK', style: 'value', border:[true,true,true,true]},
                                           {text: 'Daňové číslo (US/TIN):', style: 'label'},
                                           {text: '2020177764', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT,'*','auto', '*','auto', '*' ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: 'Sídlo', style: 'sectionLabel'},
                                           {text: 'Obec:', style: 'label'},
                                           {text: 'Trenčín', style: 'value', border:[true,true,true,true]},
                                           {text: 'Část obce:', style: 'label'},
                                           {text: '', style: 'value', border:[true,true,true,true]},
                                           {text: 'Stát:', style: 'label'},
                                           {text: 'Slovensko', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT, '*','auto', 40 ,'auto', 40 ,'auto', 40 ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: '', style: 'sectionLabel'},
                                           {text: 'Ulice:', style: 'label'},
                                           {text: 'Zlatovská', style: 'value', border:[true,true,true,true]},
                                           {text: 'Č.p.:', style: 'label'},
                                           {text: '27', style: 'value', border:[true,true,true,true]},
                                           {text: 'Č.o.:', style: 'label'},
                                           {text: '', style: 'value', border:[true,true,true,true]},
                                           {text: 'PSČ:', style: 'label'},
                                           {text: '91105', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT, '*','auto', '*','auto', '*' ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: 'Korespondenční adresa', style: 'sectionLabel'},
                                           {text: 'Obec:', style: 'label'},
                                           {text: 'Trenčín', style: 'value', border:[true,true,true,true]},
                                           {text: 'Část obce:', style: 'label'},
                                           {text: '', style: 'value', border:[true,true,true,true]},
                                           {text: 'Stát:', style: 'label'},
                                           {text: 'Slovensko', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION,WIDTH_LABEL_SHORT,'*','auto', 40 ,'auto', 40 ,'auto', 40 ], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: '', style: 'sectionLabel'},
                                           {text: 'Ulice:', style: 'label'},
                                           {text: 'Zlatovská', style: 'value', border:[true,true,true,true]},
                                           {text: 'Č.p.:', style: 'label'},
                                           {text: '27', style: 'value', border:[true,true,true,true]},
                                           {text: 'Č.o.:', style: 'label'},
                                           {text: '', style: 'value', border:[true,true,true,true]},
                                           {text: 'PSČ:', style: 'label'},
                                           {text: '91105', style: 'value', border:[true,true,true,true]}
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ],
                    [
                        {
                            table: {
                                heights: BLOCK_LINE_HEIGHT,
                                widths: [ WIDTH_LABEL_SECTION,WIDTH_LABEL_SHORT,'*','auto', '*'], // BLOCK_FIRST_COLUMN_WIDTH
                                body: [
                                       [
                                           {text: 'Kontaktní údaje', style: 'sectionLabel'},
                                           {text: 'Tel.:', style: 'label'},
                                           {text: '+421326401254', style: 'value', border:[true,true,true,true]},
                                           {text: 'E-mail:', style: 'label'},
                                           {text: 'ragen.tn@gmail.com', style: 'value', border:[true,true,true,true]},
                                        ]
                                ]
                            },
                            layout: 'blockLine'
                        }
                    ]
                ]
            }
        }
    ],
    styles: {
        sectionLabel: {
            fontSize: 7,
            margin: [0,2.5,2,0],
            font: 'Roboto',
            italics: true,
            bold: true
        },
        label: {
            fontSize: 7,
            margin: [5,2.5,2,0],
            font: 'Roboto'
        },
        value: {
            font: 'Roboto',
            fillColor: 'white',
            fontSize: 11,
            // bold: true
        }
    },
    defaultStyle: {
        font: 'Helvetica',
        // alignment: 'justify'
    }
}

// docDefinitionBlockStructure.content[0].table.body[0][0].table.body[0].push('e');
// docDefinitionBlockStructure.content[0].table.body[0][0].table.body[0].push('f');
// docDefinitionBlockStructure.content[0].table.body[0][0].table.widths.push('auto');
// docDefinitionBlockStructure.content[0].table.body[0][0].table.widths.push('*');

// clog(docDefinitionBlockStructure.content[0].table.body[0][0]);


clog(docDefinitionBlockStructure);

var pdfDoc = printer.createPdfKitDocument(docDefinitionBlockStructure,{tableLayouts: myTableLayouts});
pdfDoc.pipe(fs.createWriteStream('pdfs/mytables.pdf'));
pdfDoc.end();
