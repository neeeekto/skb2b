const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Orogin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res) =>{
    let inputName = req.query.fullname.trim();
    let error = false;
    if(!inputName || /([0-9_\/])/g.test(inputName)) {
        error = true;
    }

    let validNameArray = inputName.split(/\s* \s*/);
    if(validNameArray.length>3 || !validNameArray.length){
        error = true;
    } 

    if(!error){
        let surname = '', initials = '', flagFirst = true ;
        for(let i = validNameArray.length-1; i>=0; i--){
            if(flagFirst){
                let tempName = validNameArray[i].toLowerCase();
                surname = tempName[0].toUpperCase()+tempName.slice(1);
                flagFirst = false;
            } 
            else{
                initials = ' ' + validNameArray[i][0].toUpperCase() + '.' + initials;
            }     
        }
        res.send(surname+initials);
    }
    else{
        res.send('Invalid fullname');
    }
})


app.listen(3000, ()=>{
    console.log('Success! 3000 port run');
});