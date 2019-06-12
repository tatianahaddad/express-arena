const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'))
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/sum', (req, res) => {
  const a = req.query.a
  const b = req.query.b

  const c = +a + +b

  const sum = `The sum of ${a} and ${b} is ${c}`
  res.send(sum)
})

app.get('/cipher', (req, res) => {
  const text = req.query.text
    .toUpperCase()
    .split('')
    .map(n => {
      const code = n.charCodeAt(0)
      return code
    })
  const shift = req.query.shift

  console.log(String.fromCharCode(1,1,6), 'string')

  const message = `sending message ${text}`
  res.send(message)
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}
`;
res.send(responseText);
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/pizza/pepperoni', (req, res) => {
  console.log(req.baseUrl, 'req url')
  res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
  res.send("We don't serve that here. Never call again!")
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});