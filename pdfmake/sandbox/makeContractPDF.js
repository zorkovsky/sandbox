// const util = require('util')
// const clog = (obj) => console.log(util.inspect(obj, {showHidden: false, depth: null}));

// constants, params, UI config
// const BLOCK_CONTAINER_PADDING = 2;
//const PAGE_WIDTH = '595.28';
// const PAGE_HEIGHT = '841.89';
const PAGE_MARGINS = [20,20,20,20];

const HEADER_HEIGHT = 75;

const LOGO_WIDTH = 160; //460
const LOGO_HEIGHT = LOGO_WIDTH*146/460; //146

const BLOCK_PADDING = 2;
const BLOCK_FILL_COLOR = '#eeeff2';

const BLOCK_LINE_PADDING = 2;
const BLOCK_LINE_HEIGHT = 13;

const WIDTH_LABEL_SECTION = 75;
const WIDTH_LABEL_SHORT = 25;
const WIDTH_LABEL_MEDIUM = 75;
const WIDTH_LABEL_LONG = 110;


//CONTRACT -> FORM DATA
const contractData = require('../mockdata/readContractClientInfo_mockResponse.json');

let formData = {
    companyDetails: {
        name : ''
    },
    clientProfile: {},
    directors: [],
    owners: [],
    others: [],
    accounts: []
};

// TRANSFORMATION
formData.companyDetails.name = contractData.entityData.clientInfo.companyBasicInfo.companyName;
formData.companyDetails.ICO = contractData.entityData.clientInfo.partyIdentifiers.find(obj => { return obj.partyIdentifierType === 'Ico'}).partyIdentifierValue;
formData.companyDetails.DIC = contractData.entityData.clientInfo.partyIdentifiers.find(obj => { return obj.partyIdentifierType === 'Dic'}).partyIdentifierValue;

formData.directors = [
    {
        name : 'Peter Hora',
        dateOfBirth: '18.12.1978',
        birthId: '781218/9333',
        position: 'jednatel'
    },
    {
        name : 'Zdeněk Kratochvíl',
        dateOfBirth: '18.12.1978',
        birthId: '781218/9333',
        position: 'jednatel'
    }
];

// PDFMAKE INIT
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

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');


// EMPTY DOCDEFINITION
const createDocDefinition = () => { return (
    {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: PAGE_MARGINS,
        content: [],
        styles: {},
        defaultStyle: {
            font: 'Helvetica',
            fontSize: 10
            // alignment: 'justify'
        },
        addContent : function(contentItem) { this.content.push(contentItem)},
        addBlankLine: function() { this.addContent({text: '', margin:[0,5,0,5]}) },
        addStyle : function(name, style) { this.styles[name] = style },
        addStyles : function(styles) { this.styles = styles}
    }
)};

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
    headerLabel: {
        paddingLeft: function(i, node) { return 20 ; },
		paddingRight: function(i, node) { return 20; },
		paddingTop: function(i, node) { return 5; },
        paddingBottom: function(i, node) { return 5; },
        defaultBorder: false
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

const styles = {
    normal: {
        font: 'Roboto',
        fontSize: 7,
        margin: [0,10,0,10]
    },
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
    },
    headerLabel: {
        font: 'Roboto',
        color: '#fefefe',
        fontSize: 12,
        alignment: 'right'
    }
};

// BLOCK TEMPLATES
const header = {
    stack:[
        {
            absolutePosition: {x:0,y:0},
            fillColor: BLOCK_FILL_COLOR,
            layout: 'headerLabel',
            table: {
                widths: [ 340, 172],
                heights: [5, 'auto',5],
                body: [
                    [{text:'', colSpan:2},{}],
                    ['',{text: 'Rámcová smlouva\no poskytování platebních služeb', style: 'headerLabel',fillColor:'#636b70', margin: [0,0,0,0]}],
                    [{text:'', colSpan:2},{}],
                ]
            }
        },
        {
            image: 'src/img/CZ ACZ logo.png',
            width: LOGO_WIDTH,
            absolutePosition: { x: PAGE_MARGINS[0], y: ( HEADER_HEIGHT - LOGO_HEIGHT )/2 }
        },
        {text: '', margin:[0,65,0,0]}
    ]
};


const companyDetailsBlock = (companyDetails) => { return(
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
                                       {text: companyDetails.name , style: 'value', border: [true,true,true,true]}
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_LONG,'*','auto',50,'auto',50],
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_MEDIUM,'*',25, 139 ],
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT,'*','auto', '*' ],
                            body: [
                                   [
                                       {text: '', style: 'sectionLabel'},
                                       {text: 'IČ:', style: 'label'},
                                       {text: companyDetails.ICO , style: 'value', border:[true,true,true,true]},
                                       {text: 'DIČ:', style: 'label'},
                                       {text: companyDetails.DIC, style: 'value', border:[true,true,true,true]}
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_MEDIUM,'*','auto', 137 ],
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT,'*','auto', '*','auto', '*' ],
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT, '*','auto', 40 ,'auto', 40 ,'auto', 40 ],
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
                            widths: [ WIDTH_LABEL_SECTION, WIDTH_LABEL_SHORT, '*','auto', '*','auto', '*' ],
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
                            widths: [ WIDTH_LABEL_SECTION,WIDTH_LABEL_SHORT,'*','auto', 40 ,'auto', 40 ,'auto', 40 ],
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
                            widths: [ WIDTH_LABEL_SECTION,WIDTH_LABEL_SHORT,'*','auto', '*'],
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
)};


const directorBlock = (director) => { return(
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
                            widths: [ WIDTH_LABEL_SECTION , '*', 'auto', 70,'auto',60],
                            body: [
                                   [
                                       {text: 'Jméno a přijmení:', style: 'sectionLabel', italics:false, bold:false},
                                       {text: director.name , style: 'value', border: [true,true,true,true]},
                                       {text: 'Rodné číslo:', style: 'label', italics:false, bold:false},
                                       {text: director.birthId , style: 'value', border: [true,true,true,true]},
                                       {text: 'Datum narození:', style: 'label', italics:false, bold:false},
                                       {text: director.dateOfBirth , style: 'value', border: [true,true,true,true]},
                                    ]
                                ]
                        },
                        layout: 'blockLine'
                    }
                ],
                [
                    {
                        // border: [true,true,true,true],
                        table: {
                            heights: BLOCK_LINE_HEIGHT,
                            widths: [ WIDTH_LABEL_SECTION , '*'],
                            body: [
                                   [
                                       {text: 'Funkce:', style: 'sectionLabel', italics:false, bold:false},
                                       {text: director.position , style: 'value', border: [true,true,true,true]},
                                    ]
                            ]
                        },
                        layout: 'blockLine'
                    }
                ],
            ]
        }
    }
)};


// --------- START CONSTRUCTION
const docDefinition = createDocDefinition();
docDefinition.addStyles(styles);

docDefinition.addContent(header);
docDefinition.addContent({text: 'Smluvní strany:'});
docDefinition.addBlankLine();
docDefinition.addContent(companyDetailsBlock(formData.companyDetails));
docDefinition.addContent({text: ['(dále jen ',{text: '„Klient”', bold: true},') na straně druhé'], style: 'normal', margins: [0,10,0,10]});

formData.directors.map( (d) => {
    docDefinition.addContent(directorBlock(d));
    docDefinition.addBlankLine();
});
docDefinition.addBlankLine();

// TABLE EXAMPLE AS REQUESTED BY Zdenek
docDefinition.addContent(
    {
        table: {
            headerRows: 1,
            body: [
                ['Account No.', 'Account name','Currency','BIC','Country'],
                ['123456789/5500', 'dig-it-ally','CZK','CEKOCZPP','CZ'],
                ['987654321/1100', 'dig-it-ally','USD','IRVTUS33','US'],
            ]
        }
    }
);


// --------- END OF CONSTRUCTION

// clog(docDefinition);

var pdfDoc = printer.createPdfKitDocument(docDefinition,{tableLayouts: myTableLayouts});
pdfDoc.pipe(fs.createWriteStream('pdfs/mytables2.pdf'));
pdfDoc.end();
