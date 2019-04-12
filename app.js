const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});


// drill 1
app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const results = `The sum of ${a} and ${b} is ${a + b}.`
    res.send(results);
});


// drill 2
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseInt(req.query.shift);
    // query shift must be a number
    // query shift cannot be 0
    // if character is Z or z, loop back to A or a (respectively)


    // create an array of letters in query text
    // convert the letters into their utf character code
    const charCodes = text.toLowerCase().split('').map(letter => letter = letter.charCodeAt(0));

    // add value of shift to each code in letter array
    const charShift = charCodes.map(num => num + shift);

    // convert utf codes to letters
    // join the the resulting array of letters
    const cipher = charShift.map(nums => String.fromCharCode(nums)).join('');

    res.send(cipher);
})

app.get('/lotto', (req, res) => {

  // get arr of nums from req
  let { arr } = req.query;
  let userNums = arr.map(str => parseInt(str));

  let arr1 = [1, 2, 3, 4, 5, 6];
  let arr2 = [3, 2, 6, 7, 8, 0];

  // generate 6 random numbers between 1 and 20
  const randomArr = Array.from({length: 6}, () => Math.floor(Math.random() * 20));
  // const randomArr = Array(6).fill().map(() => Math.round(Math.random() * 20))
  
//   let count = 0;

//   userNums.forEach((userNum) => randomArr.forEach((randomNum) => {
//     if (userNum === randomNum) {
//         count++;
//     }
//   }));

//   const matchingNums = userNums.filter(num => num === randomArr.find(randomNum => randomNum === num));
  const matchingNums2 = userNums.filter(num => randomArr.includes(num));
  
  let lottoMessage = 'Sorry, you lose!';
  if (matchingNums2.length === 4) {
      lottoMessage = 'Congratulations, you win a free ticket!';
  }
  
  if (matchingNums2.length === 5) {
      lottoMessage = 'Congratulations! You win $100!';
  }

  if (matchingNums2.length === 6) {
      lottoMessage = 'Wow! Unbelievable! You could have won the mega millions!';
  }
  
  res.send(matchingNums2);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});