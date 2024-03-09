import { useSelector } from 'react-redux';
import QuizQuestion from '../../components/QuizQuestion';
import newRequest from '../../utils/newRequest';
import './Quiz.css'
import { useState } from 'react';
import AlertMessage from '../../components/Alert';
import { useNavigate } from 'react-router-dom';


function QuizPage() {
    const [questionnaireID, setQuestionnaireID] = useState(null);
    const [open, setOpen] = useState(false);
    const [openRestart, setOpenRestart] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const user = useSelector((state) => state.user);
    const userBirth = user?.currentUser?.userInfo.birth_date;
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        const formattedDate = `${year}-${month}-${day}`;
        try {
            newRequest.post("/questionnaire", { date: formattedDate }).then((res) => {
                if (res.data && res.data.ID_questionnaire) {
                    setQuestionnaireID(res.data.ID_questionnaire);
                    console.log(questionnaireID)
                    nextDiv();
                }
            }).catch((err) => {
                if (err.response.status === 406) {
                    setOpen(true);
                    setMessage("You have already took the quiz!");
                    setType("error");
                    setOpenRestart(true)
                }

                if (err.response.status === 401) {
                    setOpen(true)
                    setMessage("Please login or register to start the quiz");
                    setType("error");
                    setTimeout(() => {
                        navigate("/sign");
                    }, 2000);
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    const handleRestart = async () => {
        try {
            newRequest.post("questionnaire/retest").then((res) => {
                console.log(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const nextDiv = () => {
        if (document.getElementById('Int').classList.contains('active') == true) {
            document.getElementById('Int').classList.remove('active');
            setTimeout(() => {

                document.getElementById('Str').classList.add('active');
            }, 400)

        } else {
            if (document.getElementById('Str').classList.contains('active')) {
                document.getElementById('Str').classList.remove('active');
                document.getElementById('Str').classList.add('nonactive');
                setTimeout(() => {
                    document.getElementById('Str').style.display = 'none';
                    document.getElementById('Qst').classList.add('active');
                }, 400)
            }
        }
    }


    return (
        <>
            <main className='Quiz'>
                <h1>Video Game Addiction Test for Gamers </h1>
                <h3>Are you concerned about your gaming?</h3>
                <p>Take our short quiz below (36 questions) to learn if you meet criteria for problematic use/addiction:</p>
                <section className='QuizSec' >
                    <progress value={0} max={350} id='prog'></progress>
                    <div className='Intro active' id='Int'>
                        <h2>Video Game Addiction Quiz for Gamers</h2>
                        <p>Answer these 36 quick questions to find out if gaming is taking over your life</p>
                        <div className="buttons">
                            <button type='Start' onClick={handleSubmit} > Start The Quiz</button>
                            {openRestart && <>
                                <span> or </span>
                                <button onClick={handleRestart} className='Restart'> Re-test The Quiz</button>
                            </>
                            }
                        </div>
                    </div>

                    <div className='Start' id='Str'>
                        <h2>Welcome To Video Game Addiction Quiz For Gamers</h2>
                        <p>Please note this is an informal screening tool. For a proper assessment, please seek the support of a professional.</p>
                        <button type='Ok' onClick={nextDiv}>I Understand</button>
                    </div>
                    <div className='Questions' id='Qst'>
                        <QuizQuestion questionnaireID={questionnaireID} />

                    </div>
                </section>
                <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
            </main>
        </>
    )
}

export default QuizPage