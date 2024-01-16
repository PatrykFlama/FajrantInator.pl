const { Router } = require('express')
const router = Router();
const Quiz = require('../../database/schemas/Quizzes');
const User = require('../../database/schemas/Users');
//TODO: add fuctions to helper, fix correct option

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

router.post('/submit-quiz', async (req, res) => {
    try {
        const selectedOption = req.body.Option; 
        const correctOption = req.body.tOption; 
        const user = await User.findOne({ username: req.session.account.username});
        user.check = true;
        await user.save();
        
        if (selectedOption === correctOption) {
            user.seller = true;
            await user.save();
            res.redirect('/account');
        } else {
            res.render('userAccount/userAccount_D');
        }
    } catch (error) {
        console.error('Error handling quiz submission:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try{
        let check = req.session.account.check;
        const total = await Quiz.countDocuments();
        const question_nr = getRandomNumber(1, total);
        const selected = await Quiz.findOne().skip(question_nr - 1).exec();
        const total_ans = selected.answer[0].f.length + 1;
        const truth_nr = getRandomNumber(1, total_ans);
       
        if(check === false){
            res.render('userAccount/quiz', {
                radioParams: {
                    name: selected.question,
                    label: 'Are you smart enough to be a seller?',
                    nr: truth_nr,
                    t_option: selected.answer[0].t,
                    f_option: selected.answer[0].f,
                },
            });
        }
        return;
    } catch (error) {
        console.error('Error counting quiz elements:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;