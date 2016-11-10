const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Orogin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res) =>{
    

    debugger;
    console.log('Input new request ');
    let inputName = req.query.fullname;
    
    if(!inputName || /([0-9_\/])/g.test(inputName)) {
        res.send('Invalid fullname');
        console.log(inputName, '\n--------------------------------------');
        return;
    }

    let arrayName = inputName.split(' ');
    let validNameArray = [];

    arrayName.forEach((el)=>{
        if(el.length) validNameArray.push(el);
    });

    if(validNameArray.length>3 || validNameArray.length == 0){
        res.send('Invalid fullname');
        console.log(inputName, '\n--------------------------------------');
        return;
    } 

    let result1 = '', result2 = '', flagFull = true ;

    for(let i = validNameArray.length-1; i>=0; i--){
        if(flagFull){
            let tempName = validNameArray[i].toLowerCase();
            result1 = tempName[0].toUpperCase()+tempName.slice(1);
            flagFull = false;
        } 
        else{
            result2 = ' ' + validNameArray[i][0].toUpperCase() + '.' + result2;
        }     
    }
    console.log('result:\n ', result1+result2);
    console.log(inputName, '\n--------------------------------------');
    res.send(result1+result2);

})

app.listen(3000, ()=>{
    console.log('Success! 3000 port run');
});