const joi = require('@hapi/joi');


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

const eyeSchema = joi.object({
    color: joi.string().valid('black','blue','green','brown').required(),
    shape: joi.string()
    //rating: joi.any();
}).pattern(/./, joi.string());

const structSchema = joi.object({
    
    head: joi.any(),
    body: joi.any(),
    arms: joi.any().required(),
    eyes: eyeSchema.required(),
 }
)

const extStructSchema = structSchema.
keys({
    arms: joi.string().optional(),
    legs: joi.string(),
    eyes: eyeSchema.keys({
        color: joi.string().valid('green')
    })
    
});

let bodyData ;//= { head: 'big', body: 'thin', eyes: { color:'brown', shape:'round', rating:'8' }}

let {error,value} = extStructSchema.validate(bodyData);
  
console.log( (error) ? error : 'OK' );
