const ibantools = require('ibantools');
const npmiban = require('iban');
// const iban = ibantools.electronicFormatIBAN('NL91 ABNA 0517 1643 00'); // 'NL91ABNA0517164300'
// ibantools.isValidIBAN(iban);
// ibantools.isValidBIC('ABNANL2A');

// console.log(iban);

//  console.log(ibantools.isSEPACountry('CZ'));
// let bankAccount = '55000000005170013771';
// let bankAccount = '55000001230456789654'
const country = 'RO';
// const bankAccount = '5500 123 0456789654'
const bankAccount = '0000000012345678';
const bankCode = 'ABCD';

console.log(ibantools.getCountrySpecifications().RO);
console.log(bankCode + bankAccount);
let iban = npmiban.fromBBAN(country, bankCode + bankAccount);
let bban = npmiban.toBBAN(iban);

console.log(bankAccount);
console.log(iban);
console.log(bban);
