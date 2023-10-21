'use strict';

/*
JavaScript Behind the senses

JS is high-level, object-oriented, multi-paradigm programming language.
In details, JS is 
// High-level
- Program with high-level languages are not as fast as one with low-level languages.

// Garbage collections
- It makes memory management for us in order not to clog it with unnecessary stuffs by removing old, used objects for computer memory. (clog = block)

// Interpreted or just-in-time complied
- To take about this topic we need to look at the difference between compilation and interpretation. As a computer can only understand zeros and ones, every programs need to convert the machine code by using compilation and interpretation.
  // compilation
  - Entire code is converted into machine code at once and stores then in a portable file that can be executed on any computer. So we have two steps: (1) machine code is built and (2) it is executed in the CPU. The execution can happen after the compilation.
  // Interpretation
  - Interpreter runs through the source code and executes it line by line. The code is parsed (read) and executed at the same time. The problem with interpreted language is much much slower than compiled languages.

- JS used to be interpreted language. This used to be for JS. So modern JS use a mix between compilation and interpretation instead of simple interpretation. This is called just-in-time compilation: entire code is converted into machine code and then executed immediately. In this case, we still have two steps but we don't need to build a portable file. This is perfect for JS. It is a lot faster than just execution code line by line.
  // just-in-time compilation
  - The first step is to parse (read) the code and during this process, the code is parsed into a data structure called AST or abstract syntax tree. The resulting tree will be used to generate the machine code. AST doesn't relate with DOM. The next step is compilation: takes a generated AST and compiles into machine code. The final step is execution but JS has pretty clever strategies: what they do is to create an optimized version of the machine code at the beginning in order to execute as fast as it is possible and then in the background, the machine code is optimized and recompiled during the already running program and this can be done multiple times. After each optimization, the unoptimized code is simply swept for the new more optimized code without stopping execution. This process is what makes modern JS engine so fast. All parsing, compilation and optimization can be done in special threads inside the engine that we cannot access from code.

// multi-paradigm
- Paradigm is a approach or mindset of structuring codes which will direct your coding style and technique and we can classify them into two kinds: imperative and declarative. JS does three paradigms - 
  // Procedural programming
  // Object-oriented programming
  // Functional programming

// Prototype-based object-oriented
- Almost everything in JS is objects except for primitive vales such as numbers, strings ..., arrays are objects. The reason why we can create arrays and can use push method on it is prototypal inheritance. Basically, we create arrays from an array blueprint like a template (array prototype that contains all array methods) and can inherit those methods.

// First-class functions
- In a language with first-class functions, functions are assumed as regular variables so that we can use as a argument in other functions and return functions from those functions. They allow for functional programming.

// Dynamically-typed
- In JS, we don't assign data types to variables. They only became known when the JS executed the codes and the type of variable can easily be changed as we assign variables. There is strongly-typed on the other hands, typescript.

// Single-threaded and Non-blocking event loop concurrency model
- Concurrency model is how JS engine handles multiple tasks happening at the same time. Since JS is a single-threaded, if there is a long running task to execute, that will block JS engine so that we need this kind of model to handle multiple tasks at the same time. So we can have non-blocking behavior by using event loop: takes long running tasks and executes in the background and put then back in the main thread when they are finished.


// JS engine and runtime

- JS engine is simply a program that executes JavaScript code (eg. V8 engine).JS engine consists of call stack where our JS codes are executed and heap which stores all the objects that our app needs.
We can imagine JS runtime as a box or container which includes all the JS related stuffs we need in order to use JS in the environment that we want to. The first one is JS engine. There is no JS runtime without JS engine and there is no JS at all. In order to work properly, we have web APIS in browser such as DOM, fetch, timer..., C++ bindings and thread pool in nodeJS. Web APIS are functionalities provided to the JS engine so we can get access to them but they are not the part of JS language itself. They are just utilities. Of course, they are the part of JS runtime. The second one is callback queue. This is a data structure that contains all the callback functions (event handler functions) that are ready to be executed. The first thing that happens after the event is the callback function is put into the callback queue. When the call stack is empty, callback function is passed into the stack and it can be executed. This happens by using event loop: basically event loop takes callback functions from callback queue and passed them into the stack.

// Execution Contexts - EC

- After compilation, JS creates a global EC for top-level codes. There is only one global EC. Then, each function or methods creates an EC on its own (One EC per function or method).

- EC is the container that stores all necessary information to be executed. It consists of 
  - Variable environment contains global variables, functions declarations and argument objects
  - Scope chain consists of references to variables outside of the function and every EC has their own scope chain.
  - this

- The contents of EC are generated in creation phase that happens right before execution. EC belonging to arrow functions does not have argument objects and this keywords, instead they can use argument objects and this keywords from their closest parent function.

// Scope Chain

- Scoping is how our's programs are organized and accessed. We can know where variables live, where we can access a variable and where not by using scoping.In JS, we have 
  // lexical scoping (only works upwards, not sideways and downwards)
  - scoping is controlled by the placement of function and block in the code. 

  // Scope (To keep in mind that every scope has access to all variables from all it outer scopes. Look, find and use)
  - It is a certain environment or space in which a certain variable is defined. There are three types of scopes:
    // Global scope
    - The region of global scope is outside of any function or block. It is for top-level code. Variables in global scope can be accessed everywhere.
    // Function Scope - local scope
    - The region of function scope is inside function. For nested functions, inner functions can only be accessed variables from parent function and not vive versa.
    // Block scope - start from ES6
    - Starting from ES6, block also creates scope and act like local scope. But only variables that are declared with let and const inside the block follows the behavior of the local scope. So if we define a variable with var, we can access this variable outside this function and it belongs to the first outer scope not the global scope. Functions are also block scope (only in strict mode).

  // Scope of a variable
  - It is a region of our code where a certain variable can be accessed.

// Scoping in practice

function calcAge(birthYear) {
  const age = 2023 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 2005) {
      const firstName = 'Tun';
      var millennial = true;
      const str = `Oh, you are an millennial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // output = 'NEW output';
      const output = 'NEW output';
    }
    // console.log(str);
    console.log(millennial);
    console.log(output);
    // console.log(add(2, 3));
  }
  printAge();

  return age;
}

const firstName = 'Felix';
calcAge(2004);


// Hoisting in JS

- It basically makes some types of variables accessible/usable in the code before they are actually declared. Variables with declarations are lifted to the top of their scope because of hoisting. Behind the scenes, before execution the codes are scanned for variables declarations and for each variable, a new property is created in variable environment (window object). It also happens in creation phase of EC. There are many ways how hoisting works for many variables.

  // Variable declarations - variables defined with var and function declarations
  - Hoisting does over variable declarations so that we can call variables defined with var and function declarations before declaring them. When we log them to the console, functions return the actual function and variables defined with var give us 'undefined'. It can lead to the unexpected results.

  // Variable initialization - variables or functions defined with let and const and arrow functions
  - Hoisting can't work over variables initializations. variables or functions defined with let and const and arrow functions are set to be uninitialized and placed in the temporary dead zone or TDZ. So we will get an error when we try to log these variable before initialization. The TDZ of variables and functions are from the beginning of the own scope until it is defined. TDZ is introduced in ESG in order to make easier to avoid and catch errors

- In the nutshell, we should define variables and functions with let and const and it's a best practice to declare variables to the top of the code and functions before they used. It can also makes our code more readable and easier to maintain.


// Hoisting and TDZ in practice

console.log(me);
console.log(job);
console.log(year);

var me = 'felix';
let job = 'student';
const year = 2004;

console.log(addDecl(1, 2));
console.log(addArrow2);
console.log(addExp(1, 2));
console.log(addArrow(1, 2));

function addDecl(a, b) {
  return a + b;
}

var addArrow2 = (a, b) => a + b;

if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}


// This keyword

- This keyword/variable is a special variable that is created for every execution context(for every functions). This keyword always takes the value of the owner function in which this keyword is used. We can say that it points to the owner of the function. This keyword is dynamic. It depends on how the function is called, and its value is only assigned when the function is actually called. There are four ways the functions can be called.
  // First way - as a method
  - This keyword is the object that is calling the method. 

  // Second way - as a simple function call
  - This keyword is undefined only in the strict mode. If we are not in strict mode, it is the window object and it can be problematic.

  // Third way - as a arrow function
  - This keyword is the arrow function of the surrounding function and it can be called lexical this keyword because it takes the outer function of the arrow function. In general, arrow function don't get their own this keyword.

  // Fourth way - as a event listener
  - This keyword is DOM element that the event listener is attached to. 

- In the nutshell, this keyword will never point the function in which we are using it and the variable environment of this function.


// This keyword in practice

console.log('this');

const calcAge = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this);
};
calcAge(2004);

const calcAgeArrow = (birthYear) => {
  console.log(2023 - birthYear);
  console.log(this);
};
calcAgeArrow(2003);

const felix = {
  year: 2004,
  calcAge: function () {
    console.log(2023 - this.year);
  },
};
felix.calcAge();

const may = {
  year: 2003,
};

may.calcAge = felix.calcAge; // method borrowing
may.calcAge();


// Regular function and arrow function

- As a best practice, we should never use arrow functions as a method.

var firstName = 'May';

const felix = {
  firstName: 'Felix',
  year: 2004,
  calcAge: function () {
    console.log(2023 - this.year);

    // Solution 1
    // const self = this;
    // const isMillennial = function () {
    //   console.log(self);
    //   console.log(self.year >= 2000);
    // };

    // Solution 2
    const inMillennial = () => {
      console.log(this);
      console.log(this.year >= 2000);
    };

    isMillennial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
felix.greet();
felix.calcAge();


// Arguments keyword - only in normal function

- In normal function, we can use arguments keyword when we want all the arguments but we don't have enough parameters by simply loop arguments.

const addExp = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExp(2, 5);
addExp(2, 5, 8, 12);

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 13);


// Primitive and object

- Primitive values(Number, String, Boolean, Undefined, Null, Symbol, BigInt and we can call primitive types) are stored in call stack and objects(object literal, arrays, functions and many more and we can call reference types) are stored in heap.

- When we declare a variable, JS create a unique identifier with the variable name and a piece of memory will be allocated with a certain address, 0001 as an example and the value will be stored in memory at specified address. These all are happened in the call stack. What's exactly important to understand is that the identifier points to the address and not the value itself. In the following example, in fact, age is equal to the memory address 0001. The oldAge variable also points to the same memory address. When we set age to 31, a new piece of memory will be allocated as the value at a certain address is immutable(can't changed). Then, age variable points to the new memory address 

let age = 30;
let oldAge = age;
age = 31;
console.log(age); // 31
console.log(oldAge); // 30

- When we create a object, such as before there is a memory address such as D30F and value itself. It happens in the heap. But in the call stack, a new piece of memory will be allocated and points to D30F address so that we call objects as the reference types because objects are too large to store in call stack. Call stack just keeps the reference to where the object is actually located in the heap. When we create a new variable may that is equal to the me object, the may identifier has the exact same memory address that will point to the me object and may object is exact same as me object. After we set an age property to 27, an age property of me object in the heap simply changed to 27 even though we declare with const because we aren't changing the value at address D30F. All variable that are declared with const are not immutable (it is true for only primitive values but not for reference types). In the nutshell, if we copy a object, we simply create a new memory address that points to the same object. There is an error if we reassign the object as an empty object or anything else because we change the address.

const me = {
  firsName: 'Felix',
  age: 19,
};

const may = me;
may.age = 20;
console.log(may); // age = 20
console.log(me); // age = 20

may = {}; // Assignment to constant variable(error)

// Primitive and object in practice

const jessica = {
  firsName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('before marriage : ', jessica);
console.log('after marriage : ', marriedJessica);

- We can create a shallow copy (not a deep clone) of the object by using Object.assign function that is essentially merge two objects and return a new one. Behind the scenes, a new object is created in the heap and also a new identifier of the new variable is pointing to that object as jessicaCopy is pointing to the new object in the following example. However, there is still a problem because using Object.assign function only works on the top level code. In other words, if we have a object inside a object, it will not work as we expected. To be a deep clone, we will be use external library such as Lo-Dash.

const jessica2 = {
  firsName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary'); // change inner object, object.assign doesn't work

console.log('before marriage : ', jessica2);
console.log('after marriage : ', jessicaCopy);


// Topics to learn later

- Prototypal inheritance - OOP with JS
- Event loop - Asynchronous JS: Promises, Async/Await and AJAX
- How the DOM really works behind the scenes - Advanced DOM and events

*/
