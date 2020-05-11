//Extra-Terrestrials
/*
function etConvert(howdy)
{
    let ydwoh = "";
    for (char of howdy)
    {
        ydwoh=char+ydwoh;
    }
    return ydwoh;    
}

console.log(etConvert("Kecka"))

*/

//Summations Calculator

function sumations(floor, ceil, formula) {
    if (floor == ceil) return 0;
    //    istr = toString(i);

    let sum = 0;
    for (let i = floor; i <= ceil; i++) {
        //calc = i.concat(i, formula);

        try {
            sum += eval(`${i}${formula}`);
        }
        catch (error)
        {
             console.error(`Error: ${formula} is wrong`)
             return
            }
    }

    return sum;
}

console.log(sumations(2, 10, '+12'))
