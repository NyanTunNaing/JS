"use strict";

/*
// Problem 1

// We work for a company building a smart home thermometer. Our most recent task is this: "Given a array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// What is temperature amplitude: difference between highest and lowest temperature
// How to compute max and min temperature
// What's a sensor error? and what to do?

// 2) Breaking up into sub-problems
// How to ignore errors?
// Find max and min temperature in temperature array
// Subtract min from max (amplitude) and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// Problem 2

// Functions should now receive two arrays of temp

// 1) Understanding the problem
// With two arrays , should we implement the functionality twice? No! we need to marge this two arrays

// 2) Breaking up into sub-problems
// How to merge two arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 6], [8, 9, 10]);
console.log(amplitudeNew);


// Debugging

const measureKelvin = function () {
  const measurement = {
    type: "temperature",
    unit: "celsius",

    // C) fix
    // value: prompt('Temperature Celsius : ')
    value: Number(prompt("Temperature Celsius : ")),
  };

  // B) find
  console.table(measurement);

  console.warn(measurement.value);
  console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};

// A) identify
console.log(measureKelvin());
*/

// Coding challenge

let data = "";

const printForecast = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    data += `...${arr[i]} Celsius in ${i + 1} days`;
  }
  console.log(data);
};

printForecast([12, 5, -5, 0, 4]);
