const orders = require('./schemas/Orders');
const products = require('./schemas/Products');
const users = require('./schemas/Users');
const { hashPassword } = require('../utils/helpers');

const path = require('path');
console.log(path.resolve(__dirname, '../.env'));
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('./index');

// -------------- CLEAR DB ---------------
orders.deleteMany({});
products.deleteMany({});
users.deleteMany({});

// ------------- PRODUCTS -------------
products.insertMany([
    {
        name: 'C++ task',
        price: 100,
        courseName: 'Extended C++ course',
        listNumber: 1,
        taskNumber: 1,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!";\n\treturn 0;\n}',
        ratings: [],
    },
    {
        name: 'Python task',
        price: 50,
        courseName: 'Basics with Python',
        listNumber: 2,
        taskNumber: 1,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'print("Hello World!")',
        ratings: [],
    },
    {
        name: 'Java problem',
        price: 200,
        courseName: 'Corporate Java',
        listNumber: 1,
        taskNumber: 2,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}',
        ratings: [],
    },
    {
        name: 'C++ task 2',
        price: 130,
        courseName: 'Extended C++ course',
        listNumber: 1,
        taskNumber: 2,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World 2!";\n\treturn 0;\n}',
        ratings: [],
    },
    {
        name: "WEPPO beginner's task",
        price: 30,
        courseName: 'WEPPO',
        listNumber: 1,
        taskNumber: 1,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'console.log("Hello World!")',
        ratings: [],
    },
    {
        name: "WEPPO next task",
        price: 30,
        courseName: 'WEPPO',
        listNumber: 1,
        taskNumber: 2,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'console.log("Hello World 2!")',
    },
    {
        name: "WEPPO ouch",
        price: 50,
        courseName: 'WEPPO',
        listNumber: 1,
        taskNumber: 3,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'console.log("Hello World 3!")',
    },
    {
        name: "WEPPO next list",
        price: 100,
        courseName: 'WEPPO',
        listNumber: 2,
        taskNumber: 1,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'console.log("Hello next list (2) task 1!")',
    },
    {
        name: "WEPPO next list 2",
        price: 100,
        courseName: 'WEPPO',
        listNumber: 2,
        taskNumber: 2,
        description: 'What goes here?',
        solutionFileName: '',
        soulutionCode: 'console.log("Hello next list (2) task 2!")',
    }
]);

// -------------- USERS ---------------
users.insertMany([
    {
        username: 'admin',
        password: 'admin',
        email: 'em@i.l',
        type: 'admin',
    },
    {
        username: 'user1',
        password: hashPassword('user1'),
        email: 'em@i.l',
        type: 'user',
    },
    {
        username: 'user2',
        password: hashPassword('user2'),
        email: 'em@i.l',
        type: 'user',
    },
    {
        username: 'user3',
        password: hashPassword('user3'),
        email: 'em@i.l',
        type: 'user',
    }
]);

// process.exit(0);