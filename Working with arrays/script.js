'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interests = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interests}€`;
};

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent page reload when click summit button
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
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

    updateUI(currentAccount);
  }

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI();
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
    Number(inputClosePin.value) === currentAccount.pin
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/*

const arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['k', 'j', 'i'];

// Slice method - doesn't not mutate
- We can create a shallow copy of an array. We can also use spread operator to create a shallow copy of an array. The only time you have to use slice method is when we want to use multiple methods together(method chaining).

console.log(arr.slice());
//----------------------------//


// Splice method - mutate
- This method is mostly the same as slice method. The big difference is that it actually changes the original array.
//----------------------------//


// Reverse method - mutate
- It also mutates the original array.
//----------------------------//


// Concat method - doesn't mutate
- We can also do this with spread operator.
const letters = arr.concat(arr2) // [...arr, ...arr2]
//----------------------------//


// At method
- The common use case of at method is in order to get the last element of an array. It also works on strings.

const arr3 = [23, 11, 64];

// Traditional ways
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
// Modern way
console.log(arr3.at(-1));
console.log('Felix'.at(-1));
//----------------------------//


// Looping arrays with forEach
- forEach method is a high-order functions. What it does is that it simply loops over an array and in each iteration, it will simply call the callback function and also it will receive the current element of an array as an argument. forEach method passes three arguments into the callback function: the first one is current element, the second one is current index and the last one is the entire array. The one difference between for - of loop and forEach loop is that continue and break don't work at all in forEach loop.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}.`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}.`);
  }
}

console.log('---- forEach ----');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}.`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}.`);
  }
});
//----------------------------//


// forEach with Maps and Sets
- In maps, the parameters are value, key and entire map. In sets, the parameters are value, _ and entire set. In sets, we don't have key and index so that the second one is the same as value.

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//----------------------------//


// Data transformation with map, filter and reduce
- All three methods are high-order functions. In modern language, there is a push in a direction of functional programming. There are also 3 arguments with same order in the callback function of the first two methods.

// Map - doesn't mutate
- Map method returns a new array containing the results of applying an operation on all original array elements.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUsd = movements.map((mov) => mov * eurToUsd);
console.log(movements);
console.log(movementsUsd);

// Filter - doesn't mutate
- Filter method returns a new array containing the array elements that passed a specified test condition.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);
console.log(deposits);
console.log(withdrawals);

// Reduce - doesn't mutate
- Reduce method boils(reduces) all array elements down to one single value (eg. adding all elements together). Then the reduced value returns from this method and there is no array in this case.In the reduce method, the first argument is the callback function and the second one is the value of an accumulator. In the callback function of the reduce method, first argument is the accumulator that is the sum of all array elements and will be the return value. The lasts are original three arguments in same order.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((acc, cur, i, array) => {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

// Maximum value
const max = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur), // callback function
  movements[0]
);
console.log(max);
//----------------------------//


// Method chaining
- In method chaining, it will be hard to know when there is an error or do the debugging. In this case, we can use arr parameter and can see the result of an array that is got from the previous method.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const totalDepositUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);
//----------------------------//


// Find method
- This method is same like array method and it takes a callback function and finds and returns the first element of the array that matches the given condition. In objects, we can find an object based on some property of that object.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);

// Finding object based on the property of that object suing find method
console.log(accounts);

const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log(account);
//----------------------------//


// Some and every methods
- These two methods are also high-order functions and need callback function and return boolean value based on the condition. Incldes method is a little bit similar but it checks only for equality and those methods can check both equality and a specific condition.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.includes(-130));

// Some
console.log(movements.some((mov) => mov > 0));
console.log(movements.some((mov) => mov === -130));
console.log(movements.some((mov) => mov > 1500));
console.log(movements.some((mov) => mov > 5000));

// Every
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));
//----------------------------//


// Flat and FlatMap methods - mutate
- Flat method goes one level deep when flattening an array. If we want to go deeper, we can simple add the element of the array from the nested array. FlatMap method combines flat and map methods for a better performance. In flatMap method, we can go one level deep.

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const overAllBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

const overAllBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overAllBalance, overAllBalance2);
//----------------------------//


// Sort method - mutate
- Sort method just sort the strings by default. In order of working with other types, we need a callback function. Sort method is also a high-order function and the callback function of that method need two arguments.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// return < 0 will be A, B (keep order)
// return > 0 will be B, A (switch order)

// Ascending order
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
// movements.sort((a, b) => a - b);
console.log(movements);

// Descending order
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
// movements.sort((a, b) => b - a);
console.log(movements);
//----------------------------//


// Creating and filling arrays
- new Array method creates the equal length of an array that is same with the number passed into the function as an argument. Over array that is created with Array constructor, we can't use array method on it, it won't work. But we can use only fill method on this kind of method. Fill method also mutates the original array. We can also create array by using Array.from method. In this method, the first argument is the length of an array and the last one is the callback function. In JS, we can simply use _ as a throwable variable(variable that doesn't use). Array.from method is also used for converting other iterables to arrays eg. Elements from the querySelectorAll method is like an array(nodeList) but it is not an real array. In this case, we can't use map method on noteList, so we can simply convert this to an array by using Array.from method. We can also use spread operator to do the same way.

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);
// x.fill(1);
x.fill(1, 3, 6);
console.log(x);
arr.fill(23, 3, 5);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // creating an array containing 1 to 7
console.log(z);

const dice = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(dice);

// Real Use case - getting data from UI
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (el) => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // converting array with spread operator
});
//----------------------------//


// Which method to use when

?? To mutate the original array
?? Want a new array
?? Want an array index
?? Want an array element
?? want to know if array includes
?? Want a new string
?? Want to transform to value
?? Want to just loop array
//----------------------------//


// Array methods practice
- In this case, we can also use reduce method instead of map, filter methods.

// for flatMap(movements) using reduce method
const movs = accounts
  .reduce((acc, cur) => {
    acc.push(cur.movements);
    return acc;
  }, [])
  .reduce((acc, cur) => {
    if (typeof cur === 'object') {
      cur.forEach((el) => acc.push(el));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
console.log(movs);

// 1.
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);
// Using reduce method
const bankDepositSum2 = movs
  .reduce((acc, cur) => {
    if (cur > 0) acc.push(cur);
    return acc;
  }, [])
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum2);

// 2.
const Deposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000);
console.log(Deposit1000.length);
// More advanced with reduce method
const Deposit10002 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc + 0), 0);
console.log(Deposit10002);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (acc, mov) => {
      // mov > 0 ? (acc.deposits += mov) : (acc.withdrawals += mov);
      acc[mov > 0 ? 'deposits' : 'withdrawals'] += mov; // refactoring codes
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4.
// this is a nice title case - This Is a Nice Title Case

const string = (str) => {
  const expectations = ['a', 'an', 'and', 'but', 'with', 'the', 'or', 'in'];
  const capitalize = (el) => el[0].toUpperCase() + el.slice(1);

  const titleCase = str
    .toLowerCase()
    .split(' ')
    .map((cur) => (expectations.includes(cur) ? cur : capitalize(cur)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(string('this is a nice title case'));
console.log(string('this is a LONG title but not too LONG'));
console.log(string('and here is another title with an EXAMPLE'));


*/

/*

// Coding challenges

// No 1

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(); // create a shallow copy cause it is a bad practice to mutate parameter
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-1);

  const dogs = [...dogsJuliaCorrected, ...dogsKate];
  dogs.forEach(function (dog, i) {
    const x = dog >= 3 ? 'adult' : 'puppy';
    console.log(`Dog number ${i} is an ${x}, and is ${dog} years old.`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
//----------------------------//


// No 2

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const filterHumanAge = humanAges.filter((age) => age >= 18);
  console.log(filterHumanAge);
  // const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4)).filter((age) => age >= 18); // Method chaining
  // const avgHumanAge =
  //   filterHumanAge.reduce((acc, age) => acc + age, 0) / filterHumanAge.length;
  const avgHumanAge = filterHumanAge.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  ); // [2, 3] - (2+3)/2 === 2/2 + 3/2

  return avgHumanAge;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// No 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.map((cur) => (cur.recommendedFood = Math.trunc(cur.weight ** 0.75 * 28)));
console.log(dogs);

const sarahDogs = dogs.find((cur) => cur.owners.includes('Sarah'));
console.log(sarahDogs);

console.log(
  `Sarah's dogs eat too ${
    sarahDogs.curFood > sarahDogs.recommendedFood ? 'much' : 'little'
  }.`
);

const ownersEatTooMuch = dogs
  .filter((cur) => cur.curFood > cur.recommendedFood)
  .flatMap((cur) => cur.owners);
const ownersEatTooLittle = dogs
  .filter((cur) => cur.curFood < cur.recommendedFood)
  .flatMap((cur) => cur.owners);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much.`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much.`);

const exact = dogs.some((cur) => cur.curFood === cur.recommendedFood);
console.log(exact);

const okay = dogs.filter(
  (cur) =>
    cur.curFood > cur.recommendedFood * 0.9 &&
    cur.curFood < cur.recommendedFood * 1.1
);
console.log(okay);

const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);
*/
