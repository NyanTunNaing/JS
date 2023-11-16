'use strict';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  // third enhanced object literals
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // First enhanced object literals
  openingHours,

  // second enhanced object literals
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // old writing method
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = '20:00',
    location,
  }) {
    console.log(
      `order delivery!. ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will delivery to ${location} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here The delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/* 

// Destructuring arrays

- It is an ES6 feature and basically a way of unpacking values from an array or a object into separate variables. In other words, it is to break a complex data structure down into smaller data structure. In this case, the original array does not break. We just unpack and store values to the variables. we can unpack value we want and don't need to unpack all the values. If we want to skip the value, we can use black for that. If we have a function that returns array, we can get multiple return value by using array destructuring. Setting default value is useful when we don't know the length of the array (eg. getting data from API). In the nutshell, the orders of the elements are important in array destructuring.

let [main, , secondary] = restaurant.categories;

// Mutating variables without destructuring (Mutating = switching)
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// Switching variables with destructuring
[secondary, , main] = [main, , secondary];
console.log(main, secondary);

// Receiving 2 return values from function
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

// Nested arrays destructuring
const nested = [1, 2, [3, 4]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Setting default values
const [p = 2, q = 2, r = 2] = [6, 7];
console.log(p, q, r);


// Destructuring Objects

- In objects, the orders of the elements are not important. But we need to give variable names that exactly match property names. In real world, we need to give default values. In mutating objects, JS always assume as a code block whenever it see curly braces, so we need to wrap the code with parenthesis. If we have a function with a lot of parameters and it is hard to know the order of the parameters, we can pass an object as an argument and within the function we can destructure this object.

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Changing variable name and giving default values
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
  menu = [],
} = restaurant;
console.log(restaurantName, hours, tags, menu);

// Mutating variables
let a = 100;
let b = 200;
const obj = { a: 23, b: 7, c: 30 };

({ a, b } = obj);
console.log(a, b);

// Nested objects destructuring
const {
  fri: { open, close },
} = restaurant.openingHours;
console.log(open, close);

// Functions with lots of parameters by using destructuring
restaurant.orderDelivery({
  time: '21:30',
  location: 'Yangon',
  mainIndex: 1,
  starterIndex: 2,
});


// Spread operator

- It spreads all the elements of the array. In the example, it takes all the elements out of the array and writes them manually. Generally, we can use this operator wherever we write multiple values separated by commas. There are two situations, first: when we write array literal and second: when we pass arguments into functions. It takes all the elements out of the array and doesn't create new variables whereas in destructuring we can take individual element that we want from the array. It works on all iterables such as arrays, maps, strings and sets except objects. Most built-in data structures are iterables not objects. We can't use this in template literal.

const arr = [4, 5, 6];
const newArr = [1, 2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

// Create a shallow copy
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Function with many arguments
const ingredients = [
  prompt("Let's make pasta! ingredient 1? : "),
  prompt('ingredient 2? : '),
  prompt('ingredient 2? : '),
];
restaurant.orderPasta(...ingredients);

// Strings
const str = 'felix';
const letters = [...str];
console.log(letters);
// console.log(`${...str}`);

// Objects
const newRestaurant = { founder: 'Felix', ...restaurant };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };


// Rest patterns and parameters

- It exactly looks like spread but is the opposite of the spread operator. It is to pack the individual elements into an array. It basically collects unused elements in destructuring assignment. In the following example array destructuring, it takes all the elements after the last variable but it basically doesn't take all the remaining elements. So, the rest syntax must be the last in array destructuring assignment and also there is only one rest assignment. In object destructuring, It takes all the remaining elements. Rest parameters serves like object destructuring.

// SPREAD, ... is on the RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, ... is on the LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// Array destructuring
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Object destructuring
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Functions - rest parameters
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(3, 2);
add(2, 5, 63);

const arr = [23, 4];
add(...arr);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');


// Short-circuiting

- Logical operators have three properties: Use any data type, return any data type and do short-circuiting(short circuit evaluation). We can think short-circuiting as the condition: OR operator will return true and truthy value if the one condition is true and AND operator will return false and falsy value if the one condition is false. We can use OR operator in setting default values over ternary operator. We can use AND operator to execute in the second operand if the first one is true(calling functions and also want to test the function exists). In the nutshell, OR operator return the first truthy vale or the last value if all of them are falsy values and AND operator return the falsy value.

// ---- OR ----
- OR operator returns the first operand if the first operand is truthy vale and JS doesn't look at the second operand. If the first operand is falsy value, it will return the second operand. Basically in many operands, JS returns the first truthy value.

console.log(3 || 'Felix');
console.log('' || 'Felix');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 19 || null);

restaurant.numGuests = 23; // 0 doesn't work for this cause it is falsy value
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);

// ---- AND ---
- For AND operator, it will return only falsy value of the operands.

console.log(0 && 'Felix');
console.log(1 && 'Felix');
console.log('Hello' && 23 && null && 'Felix');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spanish');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spanish');

// Nullish coalescing operator: null and undefined (not include 0 and '')
- In nullish operator, short-circuiting will work for null and undefined. Tt is the solution for OR operator in setting default values.

restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);


// Three new assignment operator - ||=, ??=, &&=

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator - it still has a problem with 0 value
rest1.numGuests ||= 10; // rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests ||= 10; // rest2.numGuests = rest2.numGuests || 10;

// Nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
rest1.owner &&= '<ANONYMOUS>'; // rest1.owner = rest1.owner && 10;
rest2.owner &&= '<ANONYMOUS>'; // rest2.owner = rest2.owner && 10;

console.log(rest1);
console.log(rest2);


// New for-of loop

- One advantage in for-of loop is that we can still use continue and break. If we want index in this loop, we have to use entries method in array and counter variable will be an array with index and element. Generally, we can use array destructuring in this case.

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

for (const item of menu) console.log(item);

// Getting index
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}


// Enhanced object literals

- There are three new enhanced object literals, first(setting property): we can write object and can use in another object as a property by taking the exact same name, second(writing method): if we have to use function expression in object as a method before ES6, in ES6 we can simply write function declaration, third(property name): we can also use [] brackets and template literals to compute, basically it means we can set the property name as like print to the console.


// Optional chaining

- In real word data, we don't know what property of the object exists. With the old ways, we have to test those exist or not. Now, we can solve this problem by using optical chaining(?.). If the property doesn't exist(nullish concept only null or undefined(will exist in (0 and ''))) before the quotation mark, it will show undefined and will not read existing codes.

// Property
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On the ${day}, we open at ${open}.`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? `Method doesn't exist.`);
console.log(restaurant.orderRisotto?.(0, 1) ?? `Method doesn't exist.`);

// Arrays
const users = [{ name: 'Felix', email: 'nyantunnaing52@gmail.com' }];
// const users = [];

// if (users.length > 0) {
//   console.log(users[0].name);
// } else {
//   console.log('User array empty.');
// }
console.log(users[0]?.name ?? 'User array empty.');


// Looping Objects using for-of loop - over object keys, over object values and both

// With Object keys
- Object.keys method returns an array containing the property names of the argument object.

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// With Object values

const values = Object.values(openingHours);
console.log(values);

// Both
- In Objects, entries method returns an array with key and value.

const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  // [key, value]
  console.log(`On ${day}, we open at ${open} and close at ${close}.`);
}


// Sets

- Set is a collection of unique values. So it never have duplicate values. We can use set in cases: whether the certain element is in the set or not(has method in set - include method in array), add and delete element(method name are straightforward), counting how many letters in a word. In sets, there are no indexes. If our goal is to store values in order and retrieve it, the best use case is to use an array. But looping is working.In real, the main use case of set is to remove duplicate values of arrays. In converting set to array, we can simply use spread operator.

const orderSet = new Set(['pizza', 'pasta', 'pizza', 'risotto', 'pasta']);
console.log(orderSet);
console.log(new Set('Felix'));

console.log(orderSet.size);
console.log(orderSet.has('pizza'));
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('risotto');
console.log(orderSet);
orderSet.clear(); // delete all values

// Example
const staff = ['Waiter', 'Chef', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);

console.log(new Set('Hello').size);


// Maps

- It is a data structure to map values to keys.Just like a object, data is stored in keys values pairs in maps. The big difference between objects and maps is that in maps, the key can have any type(keys in objects must be always strings). Set method not only adds the data into the map but also returns the updated map. One thing to keep in mind is that we need to write same data type with the key name we want to get.

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Italy');
console.log(rest.set(2, 'Portugal'));
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :('); // using set method on updated map
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get('1'));

const time = 24;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // Don't use this, it is not readable

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();
console.log(rest);
console.log(rest.size);

// Arrays and objects as a key
- if we don't store array in a variable, the output will be undefined because the two arrays in methods will refer different places in the memory(explain in JS behind the scenes). In objects, it looks exactly the same.

const arr = [1, 2];
rest.set(arr, 'test');
rest.set(document.querySelector('h1'), 'Heading');
rest.get({ a: 1, b: 2 }, 'object');
console.log(
  rest.get(arr),
  rest.get(document.querySelector('h1')),
  rest.get({ a: 1, b: 2 })
);

// Objects to maps
- In objects, entries method give an array of arrays so that we can change objects to maps.

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);
console.log(question);

const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = Number(prompt('Enter your answer: '));
const answer = 3;
console.log(
  answer === question.get('correct') ? question.get(true) : question.get(false)
); // mine
console.log(question.get(answer === question.get('correct'))); // Hum

// Converting map back to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);


// What data structure should use in what situations

- Three sources of data
1. From program itself: Data written directly in the source code (eg. status messages(display messages))
2. From the UI: Data input into the forms from the user or data written in the DOM (eg. task in todo app)
3. From external sources: Data fetched from web API (eg. recipe objects, current weather in a city, data about movies) - most common way to get data.
- We need to store these collections of data somewhere. That is why we need data structures. 

// for arrays and sets - want a simple list of values, general things (fruits, places, etc..)

// for objects and maps - need a key value pairs and for individual value (in key value pairs, we can describe values with keys)

- Data from web API are in the JSON format. We can easily change this to Objects.

// Arrays
- 1) when we need ordered list of values (might contain duplicate data), 2) when we want to manipulate data because arrays have ton of useful methods.

// Sets
- 1) when we need to work with unique values, 2) when high-performance is important because operations in sets are faster than in arrays, 3) when we want to delete duplicate values from an array

// Objects
- more traditional data structure (most of the programmers will know, readable) but using objects as key value stores has a couple of technical advantages, objects are easy to write and access data using . and [].
- 1) when we need function as values (methods) because this keyword does not work in maps, 2) working with JSON data.

// Maps
- better suited for key value stores, better performance, key can be any data types, easy to iterate and easy to compute size but not easy to write and not readable for other language programmers.
- 1) when we want key to be any data types (eg. setting boolean value as a key and make decisions)


// Strings

- To check in slice method, the size of a new string is equal to end - start parameter. The reason why we can use methods on strings, whenever we use methods on strings, JS change string primitive to sting object with the same content behind the scenes. This process is called boxing. The return value from all string method is string primitive. Whenever we works with the string input from a user, we must change that string to the lowercase.

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log(airline.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4)); // slice and return new string
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);

  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat.');
  } else {
    console.log('You got lucky');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Fix capitalization passenger name
const passenger = 'fEliX';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing Emails
const email = 'hello@felix.io';
const loginEmail = '  Hello@Felix.Io  \n';

const normalizedEmail = email.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing strings
const priceGB = '267,89';
const priceUS = priceGB.replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23, Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); // using regular expression

// Three string methods that return boolean
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Air') && plane.endsWith('neo')) {
  console.log('Part of the new Airbus family');
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome board!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// Split and Join methods
console.log('a+vary+nice+string'.split('+'));
console.log('NyanTun Naing'.split(' '));

const [firstName, lastName] = 'NyanTun Naing'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const newNames = [];

  for (const n of names) {
    newNames.push(n[0].toUpperCase() + n.slice(1));
    // newNames.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(newNames.join(' '));
};

capitalizeName('felix july ryan');

// Padding a string - adding a number of characters to the string until this string has a certain desired length

const message = 'Go to gate 23';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Felix'.padStart(20, '+').padEnd(30, '+'));

// masking number
const maskCreditCard = function (number) {
  const str = String(number);

  const n = str.slice(-4);
  return n.padStart(str.length, '*');
};

console.log(maskCreditCard(428689202));
console.log(maskCreditCard('2015762094823590924520509285'));

// Repeat string
const planeInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planeInLine(3);
planeInLine(6);
planeInLine(9);


// String methods practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = (str) => str.slice(0, 3).toUpperCase();

const checkFlights = function (str) {
  const flights = str.split('+');

  for (const flight of flights) {
    const [status, start, end, time] = flight.split(';');
    const outputStatus = `${status.includes('Delayed') ? '🔴' : ' '} ${status
      .replaceAll('_', ' ')
      .trimStart()}`;
    const outputTime = time.replace(':', 'h');
    const output = `${outputStatus.padStart(20)} from ${getCode(
      start
    )} to ${getCode(end)} (${outputTime})`;
    console.log(output);
  }
};

checkFlights(flights);

*/

/*
// Coding challenges

// No 1
const [player1, player2] = game.players;
const [gk1, ...fieldPlayers1] = player1;
const [gk2, ...fieldPlayers2] = player2;
const allPlayers = [...player1, ...player2];
const playersFinal1 = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;

game.printGoals(...game.scored);

team1 < team2 && console.log(`team1 is more likely to win`);
team2 < team1 && console.log(`team2 is more likely to win`);

// No 2
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}.`);
}

let totalOdds = 0;
for (const odd of Object.values(game.odds)) {
  totalOdds += odd;
}
const avgOdds = totalOdds / Object.values(game.odds).length;
console.log(`${avgOdds}`);

for (const [team, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[team] ? `victory ${game[team]}` : 'draw'}: ${odd}.`
  );
}

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

// No 3
const events = [...new Set(gameEvents.values())];
gameEvents.delete(64);
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes.`
);

for (const [key, value] of gameEvents) {
  console.log(`[${key <= 45 ? `First` : `Second`} Half]${key}: ${value}`);
}


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...scoredPlayers) {
    console.log(scoredPlayers);
    console.log(`${scoredPlayers.length} : 0`);
  },
};

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);


// No 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');
const arr = [];

button.addEventListener('click', function () {
  const input = document.querySelector('textarea').value;
  const arr = input.split('\n');

  for (const [i, str] of arr.entries()) {
    const [firstWord, lastWord] = str.toLowerCase().trim().split('_');
    const output = `${firstWord}${
      lastWord[0].toUpperCase() + lastWord.slice(1)
    }`; // lastWord.replace(lastWord[0], lastWord[0].toUpperCase())
    console.log(`${output.padEnd(20, ' ')} ${'✅'.repeat(i + 1)}`);
  }
});
*/
