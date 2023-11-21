'use strict';

/*
a shallow copy(that copy the properties in the first level), deep clone(that copy everything)

// Setting default value in parameters

- We can set any expression: some calculations, even parameters that are defined before this.We can't skip arguments. If we want to do, we can write undefined.

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH213');
createBooking('LH213', 2, 800);
createBooking('LH213', 3);
createBooking('LH213', undefined, 3);
//----------------------------//


// How arguments pass parameters into functions

- It looks like creating a new variable that is equal to the argument value. We need to be careful when objects pass into functions because it behaves like reference types. There are two terms: pass by value and pass by reference. In JS, we don't have pass by reference, all the things happening are by pass by value.

const flight = 'LH234';
const felix = {
  name: 'Felix',
  passport: 2307692952,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 2307692952) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

// checkIn(flight, felix);
// console.log(felix);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(felix); // change passport
checkIn(flight, felix);
//----------------------------//


// First-class & high-order functions

// First-class functions
- JS treats function as first-class citizens. This means that functions are simply values. Also, functions are another type of objects. It is just a feature that all the functions are value, just a concept.

// High-order functions
- They can receive another function as an argument and return a new function or both. This is only possible because of first-class functions. We call functions that pass into another function as a callback function because it will be called after the high-order function is called.


// Hight-order functions in practice

- Callback functions allow us to create abstraction. That means we hide the detail code implementation. About abstraction in details will be in OOP section.

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by ${fn.name}`);
};

transformer('Javascript is the best', upperFirstWord);
transformer('Javascript is the best', oneWord);
//----------------------------//


// Function returning functions

const greet = function (greeting) {
  return function (person) {
    console.log(`${greeting} ${person}`);
  };
};

const greetHey = greet('Hey');
greetHey('Felix');
greetHey('May');

greet('Hello')('Felix');

const greet1 = (greeting) => {
  return (person) => {
    console.log(`${greeting} ${person}`);
  };
};

greet1('Hello')('Felix');
//----------------------------//


// Call and apply methods

- In call method, the first argument is this keyword(object we want to call) and the lasts are the arguments of the function. In apply method, it takes two arguments: the first argument is object we want to call and the second one is an array containing the arguments of the function. In modern JS, we rarely use apply method, we simply use call method and use spread operator to get the arguments from the array.

const ygn = {
  airline: 'Yangon',
  iataCode: 'YGN',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

ygn.book(235, 'Felix');
ygn.book(368, 'May');
console.log(ygn.bookings);

const mdy = {
  airline: 'Mandalay',
  iataCode: 'MDY',
  bookings: [],
};

const book = ygn.book;

book.call(mdy, 45, 'Harry');
console.log(mdy);

const flightsData = [87, 'Ryan'];
book.apply(ygn, flightsData);

book.call(mdy, ...flightsData);
//----------------------------//


// Bind method

- Bind method allows us to manually set this keyword for any function call just like call and apply. The difference is that bind method simply calls the function instead it returns a new function. In case that we want to call the function on one object many time, we can simply use bind method and store a new function into a variable. Then, we can call this function just like a normal function call because this function has reference for this keyword. In bind method, it looks like setting default parameters in call method, the arguments in bind method are stored to use them in the functions. Specifying parts of the arguments beforehand is a common pattern called partial application(means application that some of its arguments are already applied or set).

const bookMDY = book.bind(mdy);
bookMDY(34, 'Aron');
console.log(mdy);

const bookMDY23 = book.bind(mdy, 23);
bookMDY23('Joe');

// With EventListener
- In this case, we don't need to call this method if we use call method, it will be called one time. All we need is to manually set this keyword so we can use bind method as we know it doesn't call the function but returns a new function.

ygn.planes = 300;
ygn.buyPlane = function () {
  console.log(this); // will be NaN because this keyword is DOM element that the event listener is attached to.
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', ygn.buyPlane.call(ygn)); // use bind method to manually set this keyword

// Partial applications
- In normal function, we don't need value for this keyword so just use null as a standard.

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const ygnVAT = addTax.bind(null, 0.23);
console.log(ygnVAT(400));

// Using function returning function
const addTax = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};
addTax(0.1)(200);
//----------------------------//


// Immediately invoked function expressions (IIFE)

- Scopes are a great tool for protecting variables. In modern JS, we simply create block and define variables inside it. It is more useful than IIFE. But we want to call the function only once, IIFE is the best way to go.

(function () {
  console.log(`This wil never run again.`);
})();

(() => console.log(`This will also never run again.`))();

{
  const isPrivate = 19;
  var notPrivate = 19;
}
// console.log(isPrivate);
console.log(notPrivate);
//----------------------------//


// Closures

- We don't create closures manually. All we need to know is to know about situations when the closures are happened. A function has access to the variable environment of parent EC in which it is created even after this EC is gone. All the closure is that it makes VE attached to the function, exactly when the function was created. When the booker function executes, it does look up to the closure before looking scope chain to find the passengerCount variable because closure has higher priority. Even through there is a passengerCount variable in the global scope from the scope chain, it will use the variable from the closure. A closure makes sure that a function doesn't loose a connection to variables that existed at the function's birth place. We don't have to manually create closures, this is a JS feature that happens automatically. We can't even access closed-over variables explicitly. A closure is not a tangible JS object. It is just an internal property of the functions. We can look this property by logging to the console using dir. Dir is used to log the properties of the functions. [[]] means that it is an internal property that we can't access from our code.

// First situation -function returning function
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// Second situation --reassigning function
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 20;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Reassigning f value
h();
f();
console.dir(f);

// Third situation - timer
const boardPassengers = function (n, wait) {
  const perGp = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGp} passengers.`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

const perGp = 180; // test for priority
boardPassengers(150, 5);



*/

/*
// Coding challenges

// No 1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // let optionStr = '';

    // for (const option of this.options) {
    //   optionStr += `${option}\n`;
    // }
    const input = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write opinion number)`
      )
    );

    // if (typeof input === 'number' && input < this.answers.length) {
    //   this.answers[input]++;
    // } else {
    //   alert('Please write the correct number.');
    // }
    typeof input === 'number' &&
      input < this.answers.length &&
      this.answers[input]++; // Using short-circuiting

    this.displayPollResults([5, 2, 3]);
  },

  displayPollResults(type = 'array') {
    if (typeof type === 'array') {
      console.log(type);
    } else if (typeof type === 'string') {
      const answers = [...type];
      console.log(`Poll results are ${answers.join(', ')}.`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
//----------------------------//


// No 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/
