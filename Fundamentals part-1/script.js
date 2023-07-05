// let js = "amazing";
// console.log(40 + 35 - 10);
// let firstName = 'Nyan';
// console.log(firstName);

/*
// Math operators

const now = 2023;
const ageFelix = now - 2004;
const ageRyan = now - 2007;
console.log(ageFelix, ageRyan);

console.log(ageFelix, ageFelix / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 8

const firstName = "Nyan";
const lastName = "Tun Naing";
console.log(firstName + ' ' + lastName);


// Assignment operators

let x = 10 + 5;
x += 10; // x = x + 10
x++; // x = x + 1
x--; // x = x - 1
console.log(x);


// Comparison operators 

console.log(ageFelix > ageRyan);
console.log(ageRyan >= 18);

const fullAge = ageFelix >= 18;


// template literals (single quote and double quote don't work between `` and can use to write multiple lines without \n\)

const firstName = "Nyan";
const job = "student";
const birthYear = 2004;
const year = 2023;

const felix = "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "."
console.log(felix);

const felixNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}.`
console.log(felixNew);

console.log(`String with
multiple
lines`);


// if else statement control structure

const age = 16;

if (age >= 18) {
    console.log(`You can start driving license.`)
} else {
    const yearLeft = 18 - age;
    console.log(`You are young.Please wait ${yearLeft} years.`)
}

const birthYear = 2004;

let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21
}
console.log(century);


// type conversion

const birthYear = "1991";
console.log(birthYear + 18);
console.log(Number(birthYear) + 18);


//type coercion (normally js changes data types in order to work with the operator that we assign so that + takes number to string and -,*,/ take string to number and also js makes numbers between template literals to strings)

console.log("I'm " + 23 + " years old.");
console.log('23' + '10' - 3);
console.log('23' - '10' - 3);
console.log('23' * 2);
console.log('23' / '2');

let n = '1' + 1;
n--;
console.log(n);


// truthy and falsy values - five falsy values - 0, '', undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Nyan Tun Naing'));
console.log(Boolean(''));
console.log(Boolean({}))

// Most of the time we don't convert boolean values but when js make type coercion it changes values to boolean according to truthy and falsy values 

const money = 0;

if (money) {
    console.log(`Don't spend it all!`)
} else {
    console.log(`You should get a job!`);
}


// Equality operators ( === and !== don't allow to make type coercion (strict) | == and != allow to make type coercion (loose))

const age = '18';
if (age === 18) console.log(`You became an adult (strict)`);
if (age == 18) console.log(`You became an adult (loose)`);


// Logical operators

const hasDriverLicense = true;
const hasGoodVision = true;

console.log(hasDriverLicense && hasGoodVision);
console.log(hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense);

const isTired = false;

if (hasDriverLicense && hasGoodVision && !isTired) {
    console.log(`You can drive.`)
} else {
  console.log(`You can't drive.`)
}


// Switch Statement

const day = 'monday';

switch (day) {
    case 'monday':
    case 'tuesday':
        console.log(`coding challenge`);
        break;
    case 'wednesday':
        console.log(`Hi this is wednesday`);
        break;
    case 'thursday':
        console.log(`Hi this is thursday.`);
        break;
    case 'friday':
        console.log(`yay this is friday`);
        break;
    default:
        console.log(`Enjoy the weekend.`)
}

if (day === 'monday' || day === 'tuesday') {
    console.log(`This is ${day}`);
} else if (day === 'wednesday') {
    console.log(`This is ${day}`);
} else if (day === 'thursday') {
    console.log(`This is ${day}`);
} else if (day === 'friday') {
    console.log(`Yay this is ${day}`);
} else {
    console.log(`Enjoy the weekend.`);
}


// Conditional operator (Ternary operator - mostly uses for defining the variable according to the conditions and can be used in template literals because it is an expression)

const age = 20;

age >= 18 ? console.log(`You can drink wine.`) : console.log(`You can only drink water.`);

const drink = age >= 18 ? 'wine' : 'water';
console.log(drink);

console.log(`I can drink ${age >= 18 ? 'wine' : 'water'}`);
*/

/*
// Assignments
const continent = 'Asia';
const isIsland = false;
const country = 'Myanmar';
let population = 5;
let finlandPopulation = 6;
const avgPopulation = 33;
let language = 'Burmese';
console.log(typeof isIsland);
console.log(typeof country);
console.log(typeof population);
console.log(typeof language);

let halfPopulation = population / 2;
console.log(halfPopulation);
halfPopulation++;
console.log(halfPopulation);
console.log(population > finlandPopulation);
console.log(population < avgPopulation)
console.log(country + ' is in ' + continent + ', and its ' + population + ' million people speaks ' + language);
*/

/*
// Coding challenge 
let markMass = 95;
let markHeight = 1.88;
let johnMass = 85;
let johnHeight = 1.76;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;
const markHigherBMI = markBMI > johnBMI;

if (markBMI > johnBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI}).`)
} else {
    console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI}).`)
}


const avgDolphinsScore = (96 + 108 + 89) / 3;
const avgKoalasScore = (88 + 91 + 110) / 3;

console.log(avgDolphinsScore);
console.log(avgKoalasScore);
if (avgDolphinsScore > avgKoalasScore) {
    console.log(`Dolphins win a trophy.`)
} else if (avgDolphinsScore === avgKoalasScore) {
    console.log(`This is a draw.`)
} else {
    console.log(`Koalas win a trophy.`)
}


const miniScore = 100;
const dScore1 = 97;
const dScore2 = 112;
const dScore3 = 101;
const kScore1 = 109;
const kScore2 = 95;
const kScore3 = 123;

const avgDScore = (dScore1 + dScore2 + dScore3) / 3;
const avgKScore = (kScore1 + kScore2 + kScore3) / 3;

console.log(avgDScore);
console.log(avgKScore);

if (avgDScore > avgKScore && avgDScore >= 100) {
    console.log(`Dolphins win a trophy.`);
} else if (avgDScore < avgKScore && avgKScore >= 100) {
    console.log(`Koalas win a trophy.`);
} else if (avgDScore === avgKScore && avgKScore >= 100 && avgDScore >= 100) {
    console.log(`This is a draw.`)
} else {
    console.log(`Nobody wins a trophy.`);
}

const bill = 275;

const tip = bill >=50 & bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(`Your total bill is ${bill + tip}`);
*/
