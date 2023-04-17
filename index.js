const superAgent = require('superagent');
const fs = require('fs');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        // executer funtion here
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) reject('I could not find that file!');
            resolve(data);
            
        });
    });
}

const writeFilePro = (file, content) => {
    return new Promise((resolve, reject) => {
        //executer function here
        fs.writeFile(file, content, err => {
            if (err) reject('could not write file');
            resolve('Write file successful');
        });
    });
}

// example of callback hell
// this is how we did things prior to ES6
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//     if(err) return console.log(err.message);
//     console.log(`Breed: ${data}`);

//     superAgent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             if(err) return console.log(err.message);
//             console.log(res.body.message);

//             fs.writeFile(`${__dirname}/new-file.txt`, res.body.message, (err) => {
//                 if(err) return console.log(err.message);
//                 console.log('File write complete');
//             });
//     });
// });


// now for promises
// when promises are sent out to get the data it is called a 'pending promise'
// when a promise returns with the data it is called a 'resolved promise'
// a resolved promise can either be 'fulfilled' or 'rejected' depending on wether it has a error or not.

// this is Promise chaining
// this is how we did things come ES6

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superAgent
//             .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro(`${__dirname}/new-file.txt`, res.body.message)
//     })
//     .then(res => console.log(res))
//     .catch(err => {
//         console.log(err.message);
// });



// async await
// this was introduced in ES8
// try/catch is a standard js feature. It has nothing exclusivly to do with async code.
// async await is just syntactic sugar
// async functions always return a promise
/*
const getDogPic = async () => {
    try{
        const breed = await readFilePro(`${__dirname}/dog.txt`);
        const imgURL = await superAgent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        const saveImg = writeFilePro(`${__dirname}/new-file22.txt`, imgURL.body.message);
    } catch (err) {
        console.log(err.message);
        // we use this to show the high level code that there is an error in this code. It does not pass on to the high level code on its own. It is self contained.
        throw (err);
    }
    return '2: ready';
}
*/
// introducing Promise.all
const getDogPic = async () => {
    try{
        const breed = await readFilePro(`${__dirname}/dog.txt`);
        const res1Pro = superAgent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        const res2Pro = superAgent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        const res3Pro = superAgent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message).join('\n');
        console.log(imgs);
        const saveImg = writeFilePro(`${__dirname}/new-file22.txt`, imgs);
    } catch (err) {
        console.log(err.message);
        // we use this to show the high level code that there is an error in this code. It does not pass on to the high level code on its own. It is self contained.
        throw (err);
    }
    return '2: ready';
}
/*
console.log('1');
getDogPic().then(data => {
    console.log(data);
    console.log('3');
})
.catch(err => {
    console.log('ERROR');
});
*/

// IEFE means Immediatly Envoked Function Expression
// I guess this is a way of creating an anonomyous function and calling it instantly without having to name it?
// this is a cool little piece of syntax actually.
(async () => {
    try{
        console.log('1');
        const x = await getDogPic();
        console.log(x);
        console.log('3');
    }catch(err){
        console.log('ERROR');
    }
})();