async function populateDatabase() {
    const orders = require('./schemas/Orders');
    const products = require('./schemas/Products');
    const users = require('./schemas/Users');
    const quizzes = require('./schemas/Quizzes')
    const { hashPassword } = require('../utils/helpers');

    // -------------- CLEAR DB ---------------
    await orders.deleteMany({});
    await products.deleteMany({});
    await users.deleteMany({});
    await quizzes.deleteMany({});

    // ------------- PRODUCTS -------------
    await products.insertMany([
        {
            name: 'C++ task',
            price: 100,
            courseName: 'Extended C++ course',
            listNumber: 1,
            taskNumber: 1,
            description: 'What goes here?',
            imageFileName: '',
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
            imageFileName: '',
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
            imageFileName: '',
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
            imageFileName: '',
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
            imageFileName: '',
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
            imageFileName: '',
            soulutionCode: 'console.log("Hello World 2!")',
        },
        {
            name: "WEPPO ouch",
            price: 50,
            courseName: 'WEPPO',
            listNumber: 1,
            taskNumber: 3,
            description: 'What goes here?',
            imageFileName: '',
            soulutionCode: 'console.log("Hello World 3!")',
        },
        {
            name: "WEPPO next list",
            price: 100,
            courseName: 'WEPPO',
            listNumber: 2,
            taskNumber: 1,
            description: 'What goes here?',
            imageFileName: '',
            soulutionCode: 'console.log("Hello next list (2) task 1!")',
        },
        {
            name: "WEPPO next list 2",
            price: 100,
            courseName: 'WEPPO',
            listNumber: 2,
            taskNumber: 2,
            description: 'What goes here?',
            imageFileName: '',
            soulutionCode: 'console.log("Hello next list (2) task 2!")',
        }
    ]);

    // -------------- USERS ---------------
    await users.insertMany([
        {
            username: 'admin',
            password: hashPassword('admin'),
            email: 'em@i.l',
            type: 'admin',
        },
        {
            username: 'krzys',
            password: hashPassword('dupa'),
            email: 'sex@sex.sex',
            type: 'user',
        },
        {
            username: 'user1',
            password: hashPassword('user1'),
            email: 'ema@i.l',
            type: 'user',
        },
        {
            username: 'user2',
            password: hashPassword('user2'),
            email: 'emb@i.l',
            type: 'user',
        },
        {
            username: 'user3',
            password: hashPassword('user3'),
            email: 'emc@i.l',
            type: 'user',
        }
    ]);
    // -------------- QUIZ ---------------
    await quizzes.insertMany([
        {
          question: "Jaka flaga odpowiada za globalne zainstalowanie modułu?",
          answer:[
            {
              t: "-g",
              f: [
                "--save", 
                "-wszendzie"
            ],
            },
          ],
        },
        {
          question: "Który z języków jest typowany?",
          answer:[
            {
              t: "TypeScript",
              f: [
                "JavaScript",
                "HTML"
            ],
            },
          ],
        },
        {
          question: "Która z pętli przyjmuje instrukcje początkową?",
          answer:[
            {
              t: "for",
              f: [
                "while", 
                "switch"
            ],
            },
          ],
        },
        {
          question: "Który z modułów służy do stworzenia servera?",
          answer:[
            {
              t: "express",
              f: [
                "pośpieszny", 
                "osobowy"
            ],
            },
          ],
        },
        {
          question: "Czy javascript obsługuje zdarzenia asynchroniczne?",
          answer:[
            {
              t: "Tak",
              f: [
                "Nie", 
                "Tylko w dawnych czasach za pomocą piekła callbacków, więc usunięto"
            ],
            },
          ],
        },
        {
          question: "Co wypisze podany kod? : (console.print('debug'))",
          answer:[
            {
              t: "Wywoła błąd",
              f: [
                "Wypisze tekst \"debug\"", 
                "Wypisze tekst \"debug\", ale  tylko wtedy gdy konsola jest w trybie debugowania."
            ],
            },
          ],
        },
        {
          question: "Jak długo będzie działała pętla while(true)?",
          answer:[
            {
              t: "Tak długo jak nasze dni są policzone",
              f: [
                "20 sekund, ale można zmienić w konfiguracji projektu", 
                "Pętla zapyta nas o to przed rozpoczęciem działania"
            ],
            },
          ],
        },
        {
          question: "Czy wszystkie obiekty w javascript mają ten sam prototyp?",
          answer:[
            {
              t: "Tak",
              f: [
                "Nie", 
                "Kiedyś miały, ale prowadziło to do wycieków pamięci"
            ],
            },
          ],
        },
    ]);
}


module.exports = { populateDatabase };
