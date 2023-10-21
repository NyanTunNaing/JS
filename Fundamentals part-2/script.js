// strict mode in js (It can show us visible errors, don't allow words that they want to use in the future of js to declare as a variable and we have to declare the following statement at the beginning of the script file)

"use strict";

/*
// Testing strict mode

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log(`You can drive.`);


// Functions 

function logger() {
    console.log('I am felix.')
}

// running / calling / invoking function (we can call function as many as we want)
logger();
logger();
logger();

function fruitsProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const orangesJuice = fruitsProcessor(0, 4);
console.log(orangesJuice);

const appleOrangeJuice = fruitsProcessor(3, 5);
console.log(appleOrangeJuice);


// Functions statements - we can call function statements before declaring this function

const age1 = calcAge1(2004);

function calcAge1(birthYear) {
    return 2023 - birthYear;
}

console.log(age1);

// Functions expressions - we can only call function expression after declaring this functin

const calcAge2 = function (birthYear) {
    return 2023 - birthYear;
}

const age2 = calcAge2(2004);
console.log(age2);


// Arrow functions

const calcAge3 = birthYear => 2023 - birthYear;
const age3 = calcAge3(2004);
console.log(age3);

const ageUntilRetirement = (birthYear, firstName) => {
    const age = 2023 - birthYear;
    const retirement = 60 - age;
    // return retirement;
    return `${firstName} will retire next ${retirement} years`;
}

console.log(ageUntilRetirement(2004, 'Felix'));


// Functions calling other functions

const cutFruitPieces = function (fruit) {
    return fruit * 4;
}

const fruitsProcessor = function (apples, oranges) {
    const applesPieces = cutFruitPieces(apples);
    const orangesPieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applesPieces} apples-pieces and ${orangesPieces} oranges-pieces`;
    return juice;
}

console.log(fruitsProcessor(3, 5));

const calcAge = function (birthYear) {
    return 2023 - birthYear;
}

const ageUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);

    const retirement = 60 - age;

    if (retirement > 0) {
        console.log(`${firstName} will retire next ${retirement} years.`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired.`);
        return -1;
    }
}

console.log(ageUntilRetirement(2004, 'Felix'));
console.log(ageUntilRetirement(1950, 'Bob'));


// Arrays

const friends = ['Micheal', 'bob', 'Ryan'];

console.log(friends);
console.log(friends[0]);
console.log(friends[2]);

console.log(friends[friends.length - 1]);
friends[2] = 'Jonas';
console.log(friends);


// Arrays built-in functions

const friends = ['micheal', 'bob', 'Ryan'];

// Add Elements

const newLength = friends.push('John'); // last
console.log(friends);
console.log(newLength);

friends.unshift('Felix'); // first
console.log(friends);

// Remove elements

const popped = friends.pop(); // last
console.log(popped);
console.log(friends);

friends.shift(); // first
console.log(friends);

friends.push(23);
console.log(friends.indexOf('micheal'));
console.log(friends.indexOf('John'));
console.log(friends.indexOf('23'));

console.log(friends.includes('micheal'));
console.log(friends.includes('John'));
console.log(friends.indexOf(23));

if (friends.includes('micheal')) {
    console.log(`You have a friend called Micheal.`);
}


// Objects

const felixArray = [
    'Nyan',
    'Tun Naing',
    'Student',
    18,
    ['Ryan', 'John']
]

const felix = {
    firstName: 'Nyan',
    lastName: 'Tun Naing',
    job: 'Student',
    age: 18,
    friends: ['Ryan', 'John']
}

console.log(felix.firstName);
console.log(felix['lastName']);

const nameKey = 'Name';
console.log(felix['first' + nameKey]);
console.log(felix['last' + nameKey]);

const interestedIn = prompt('What do you want to know about felix?, Choose firstName, lastName, age, job and friends');
console.log(felix[interestedIn]);


// Objects Methods

const felix = {
    firstName: 'Nyan',
    lastName: 'Tun Naing',
    job: 'Student',
    birthYear: 2004,
    friends: ['Ryan', 'John'],
    hasDriverLicense: false,


    // calcAge: function (birthYear) {
    //     return 2023 - birthYear;
    // }

    // calcAge: function () {
    //     return 2023 - this.birthYear;
    // }

    calcAge: function () {
        this.age = 2023 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `Felix is a ${this.calcAge()} year-old student, he has ${this.hasDriverLicense ? 'a' : 'no'} driver license.`
    }
}

console.log(felix.calcAge());
console.log(felix.getSummary());


// For loop - keeps running until the condition is true

for (let rep = 1; rep <= 10; rep++) {
    console.log(`lifting weights repetition ${rep}.`);
}

const felix = [
    'Nyan',
    'Tun Naing',
    18,
    'Student',
    ['Ryan', 'John']
]

const types = [];

for (let i=0; i < felix.length; i++) {
    console.log(felix[i]);

    // types[i] = typeof felix[i];
    types.push(typeof felix[i]);
}

console.log(types);

const years = [1998, 1967, 2005, 2010, 1977];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2023 - years[i]);
}

console.log(ages);

// Continue and break

console.log('--- ONLY STINGS ---');
for (let i = 0; i < felix.length; i++) {
    if (typeof felix[i] !== 'string') continue;

    console.log(felix[i], typeof felix[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < felix.length; i++) {
    if (typeof felix[i] === 'number') break;

    console.log(felix[i], typeof felix[i]);
}


// Looping backwards and nested loops

const felix = [
    'Nyan',
    'Tun Naing',
    18,
    'Student',
    ['Ryan', 'John'],
    true
]

for (let i = felix.length - 1; i >= 0; i--) {
    console.log(i, felix[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`--------- Starting exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep++) {
        console.log(`Exercise ${exercise} Lifting weights repetitions ${rep}`);
    }
}


// While loop - we normally use while loop when we want one true condition to stop the loop

let rep = 1;
while (rep <= 10) {
    console.log(`lifting weights repetition ${rep}.`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;

    if (dice === 6) {
        console.log(`The loop is about to end.`);
    }
}
*/

/*
// Coding challenges

const calcAvg = (score1, score2, score3) => {
    return (score1 + score2 + score3) / 3;
}

const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= (avgKoalas * 2)) {
        return `Dolphins win (${avgDolphins} vs ${avgKoalas}).`;
    } else if (avgKoalas >= (avgDolphins * 2)) {
        return `Koalas win (${avgKoalas} vs ${avgDolphins}).`;
    } else {
        return `No one wins.`
    }
}

const dolphinsAvg = calcAvg(85, 54, 41);
const koalasAvg = calcAvg(23, 34, 27);

console.log(dolphinsAvg, koalasAvg);
console.log(checkWinner(dolphinsAvg, koalasAvg));


const calcTip = function (bill) {
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15; 
    } else {
        return bill * 0.2;
    }
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [(bills[0] + tips[0]), (bills[1] + tips[1]), (bills[2] + tips[2])];
console.log(tips);
console.log(totals);


const Mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

const John = {
    firstName: 'John',
    lastName: 'Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

if (Mark.calcBMI() > John.calcBMI()) {
    console.log(`${Mark.firstName}'s BMI(${Mark.bmi}) is higher than ${John.firstName}'s BMI(${John.bmi})!`);
} else if (Mark.calcBMI() === John.calcBMI()) {
    console.log(`They have equal BMI.`)
} else {
    console.log(`${John.firstName}'s BMI(${John.bmi}) is higher than ${Mark.firstName}'s BMI(${Mark.bmi})!`);
}

console.log(Mark.bmi, John.bmi);


const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = (bill) => {
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15; 
    } else {
        return bill * 0.2;
    }
}

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(tips[i] + bills[i]);
}

console.log(tips, totals);

const calcAverage = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    let avg = sum / arr.length;
    console.log(avg);
}

calcAverage(totals);
*/
