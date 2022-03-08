const joi = require('@hapi/joi');
const enumConfig = require('./enums.json');

// ENUM METADATA TRANSFORMATION FOR EASY USE IN SCHEMAS

const enums = enumConfig.map( (enm) => { return { [enm.id] : enm.values.map( v => v.key ) }} );

//console.log(enums)

// USAGE
// enums.colors = ['red','green','blue']
const colorSchema = joi.string().required().valid(...enums[0].colors)

// TEST
let { error, value } = colorSchema.validate('black');
console.log( error ? error.details[0].message : 'OK' );




// OLDER RUBBISH BELOW


/*

const baseSchema = joi.object({

    a: joi.string().valid('Lister','Rimmer','Cryten').required(),
    b: joi.any().required()

})

const extSchema = baseSchema.keys({
    a: joi.valid('Rimmer','Cat')
})

var td = [
    { a:"Lister", b: 123},
    { a:"Lister"},
    { a:"Cat", b:"ahoj"},
    { a:"Rimmer", b:"ahoj"},
    { b:123}
];

/*
let i=0;
for ( let testcase of td ) {

    console.log(++i,')', JSON.stringify(testcase));

    let {error,value} = extSchema.validate(testcase);
    
    console.log( (error) ? error : 'OK' );

}*/

//--------------------------------
/*
const eyeSchema = joi.object({
    color: joi.string().valid('red','black','blue','green','brown').required(),
    shape: joi.string()
    //rating: joi.any();
}).pattern(/./, joi.string());

const structSchema = joi.object({
    
    head: joi.any(),
    body: joi.any(),
    arms: joi.any(),
    eyes: eyeSchema.required(),
    rating: joi.any().required
 }
)





// const extStructSchema = structSchema.
// keys({
//     arms: joi.string().optional(),
//     legs: joi.string(),
//     eyes: eyeSchema.keys({
//         color: joi.string().required().valid(...enums.colors.values.map( ( val ) => {return val.key;}))
//     })
    
// });

// let bodyData = { head: 'big', body: 'thin', eyes: { color:'brown', shape:'round', rating:'8' }}

// const schemas = [structSchema,extStructSchema];

// schemas.map( ( s ) => {

// let {error,value} = s.validate(bodyData);
// console.log( (error) ? error : 'OK' );

// });





*/
