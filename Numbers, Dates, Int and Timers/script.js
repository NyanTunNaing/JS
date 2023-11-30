'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-11-26T17:01:17.194Z',
    '2023-11-27T23:36:17.929Z',
    '2023-11-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const eurToUsd = 1.1;

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

const formatMovementDate = function (locale, date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const days = calcDaysPassed(new Date(), date);

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days <= 7) return `${days} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = (acc, value) => {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(acc.locale, date);

    // Format Movement
    const formatMov = formatCurrency(currentAccount, mov);

    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formatMov}</div>
          </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  // Format Balance
  labelBalance.textContent = formatCurrency(acc, acc.balance);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(acc, incomes);

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(acc, outcomes);

  const interests = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(acc, interests);
};

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc);
  // Display Balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, log out the user
    if (time === 0) {
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
      clearInterval(timer);
    }

    // Decrease 1s
    time--;
  };

  // Set timer
  let time = 300;

  // Call setInterval every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event Handler
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent page reload when click summit button
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Display current Date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Checking timer exist or not
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Resetting timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);

    // Resetting timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }

  // Clear input fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value &&
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === inputCloseUsername.value
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

let sorted = false; // state variable
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/*

// Numbers
- In JS, all numbers are represented internally as floating point numbers(decimal numbers). The format of numbers is 64 base 2 format(stored in binary format). When we converting string to number, we used to use Number method but we can also use + operator. We can also do parsing for converting to number by using parseInt method. The first argument can contain letter but it must be started with the number in otherwise it will return NaN. The second one is called regex for which we should pass 10(base we are using) for it because it can avoid some situations. We can also use these two functions without Number Object because they are global functions. But in modern JS, we should also call from the Number Object because it provides some namespace. These two functions (parseInt and parseFloat) are useful when we want to get number from css units.


console.log(0.1 + 0.2);

console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('e23'));
console.log(Number.parseInt('2.5rem'));
console.log(Number.parseFloat('2.5rem'));

console.log(Number.isNaN(23));
console.log(Number.isNaN('23'));
console.log(Number.isNaN(+'23X'));
console.log(Number.isNaN(23 / 0));

// Checking if a value is a number or not
console.log(Number.isFinite(23));
console.log(Number.isFinite(23.4));
console.log(Number.isFinite('23'));
console.log(Number.isFinite(+'23X'));
console.log(Number.isFinite(23 / 0));
//----------------------------//


// Math and Rounding
- max function do type coercion but don't do parsing. Methods in Rounding integers also do type coercion. Methods in Rounding decimals return only STRINGS.

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(2, 56, 33, 44));
console.log(Math.max(2, '56', 33, 44));
console.log(Math.max(2, '56px', 33, 44));

console.log(Math.min(2, 56, 33, 44));

console.log(Math.PI);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20));

// Rounding integer
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((23).toFixed(0));
console.log((23.7).toFixed(4));
console.log((23.356).toFixed(2));
console.log(+(23.356).toFixed(2));
//----------------------------//


// Numeric separator
- We can use _ in order to separate numbers by thousands to be more readable. But we can only use _ in integer, not in decimal numbers. If we want to convert those to strings by using Number method and + operator, it won't work and will return NaN. If we convert by using parseInt method, it will only return numbers in front of _.
//----------------------------//


// BigInt
- For changing decimal numbers to binary numbers, only 53 bits are used to store the digits themselves and the rest are used for decimal part and sign. So there is a limit we can store. In ES 2020, we have a new primitive type BigInt. In order to do operations, we have to use BigInt type. We can't mix with other types (regular numbers). We add n at the end of the big number to be a BigInt type. But there are two exceptions. In division, BigInt will cut of the decimal part and only shows integer.

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(20n == 20);

const huge = 10497859802092589020982785990285n;
console.log(huge + ' is REALLY BIG!!'); // BigInt coverts to string

console.log(10n / 3n);
console.log(10 / 3);
//----------------------------//


// Working with dates
- There are exactly four ways to create Date. In using method, we never use getYear, we must use getFullYear all the time. There are also set methods. Months are zero base so that we have to add 1 in order to correct.

const now = new Date();
console.log(now);

console.log(new Date('December 15, 2023'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 33, ));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // timestamp

console.log(Date.now()); // current timestamp
//----------------------------//


// Operations with date

const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

console.log(calcDaysPassed(new Date(2037, 10, 19), new Date(2037, 10, 15)));
//----------------------------//


// Internationalization API
- options is completely independent from locale.

// Format Dates
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
const locale = navigator.language;
console.log(locale);

console.log(new Intl.DateTimeFormat(locale, options).format(now));

// Format Numbers
const num = 82902952.452;
const options = {
  style: 'unit',
  unit: 'mile-per-hour',
};

console.log('US : ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany : ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Japan : ', new Intl.NumberFormat('jp', options).format(num));
//----------------------------//


// Timers
- One thing that is important to know about setTimeout is that it simply register a callback function in order to do at a specific time and doesn't stop executing other codes. It just set a delayed time for the callback function to run. This mechanism is called Asynchronous JS. In the callback function of setTimeout function, we can't pass arguments into the callback functions but as a solution, we have to pass arguments after delayed time and can get as arguments of the callback functions.

// setTimeout
const ingredients = ['mushrooms'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1}, ${ing2}.`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
//----------------------------//







*/
