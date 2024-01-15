const { Router } = require('express')
const router = Router();
const Quiz = require('../../database/schemas/Quiz');
//TODO: add fuctions to helper, check the true option, do the truth_nr parameter
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getDistinctRandomNumbers(min, max, count) {
    const result = new Set();
    while (result.size < count) {
        result.add(getRandomNumber(min, max));
    }
    return Array.from(result);
}

router.get('/', async (req, res) => {
    try{
        let check = req.session.account.check;
        const total = await Quiz.countDocuments();
        const question_nr = getRandomNumber(1, total);
        const selected = await Quiz.findOne().skip(question_nr - 1).exec();
        const total_ans = selected.answer.f.length + 1;
        const truth_nr = getRandomNumber(1, total);
       
        
        if(check === false){
            res.render('userAccount/quiz', {
                radioParams: {
                    name: selected.question,
                    label: 'Quiz',
                    options: [
                        { value: selected.answer[x], label: 'Radio Option 1' },
                        { value: selected.answer[y], label: 'Radio Option 2' },
                        { value: selected.answer[z], label: 'Radio Option 3' },
                    ],
                },
            });
            return;
        }
        res.render('userAccount/userAccount');
    } catch (error) {
        console.error('Error counting quiz elements:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;