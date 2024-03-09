import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { Check } from "@mui/icons-material";
import AlertMessage from "./Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizQuestion({ questionnaireID }) {
  const [position, setPosition] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const user = useSelector((state) => state.user);
  const userBirth = user?.currentUser?.userInfo.birth_date;
  const navigate = useNavigate();

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate)
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  }

  const age = calculateAge(userBirth)



  const handleAnswerClick = (answerIndex, answer) => {
    if (selectedAnswerIndex === -1) {
      setSelectedAnswerIndex(answerIndex);

      const points = (answerIndex + 1) * 0.25;


      newRequest.post("/answer", { ID_questionnaire: questionnaireID, ID_question: questions[position].ID_Question, answer: answer, points: points })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        });
    }


    if (position < questions.length - 1) {
      setSelectedAnswerIndex(-1);
      document.getElementById('Ads').classList.add('Ads');
      document.getElementById("prog").value = position * 10;
      setTimeout(() => {

        setPosition(position + 1)
        document.getElementById('Ads').classList.remove('Ads');
        document.getElementById('Ads').classList.add('BackAds');
        setTimeout(() => {
          document.getElementById('Ads').classList.remove('BackAds');
        }, 500)
      }, 490)

    }


  }


  const handleSubmit = () => {
    if (position < questions.length - 1) {
      setOpen(true)
      setMessage("You must answer all the questions!")
      setType("info")
    } else {
      newRequest.post("/questionnaire/submit", { age: age }).then((res) => {
        setOpen(true)
        setMessage("You have submitted your answers, Please wait for a doctor to contact you!")
        setType("success")
        navigate("/profile")
      })
    }
  }

  useEffect(() => {
    newRequest.get("/question").then((res) => {
      setQuestions(res.data)
    });

  }, [])



  return (
    <div id="Ads">
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      <div>{questions[position]?.answer_options && <h3 className="order">{questions[position]?.ID_Question}-</h3>}<h2>{questions[position]?.question_text} : </h2></div>
      {questions[position]?.answer_options &&
        <ol type="A">
          {questions[position]?.answer_options.split(',').map((answer, index) => (
            <li className="answer" key={index} onClick={() => handleAnswerClick(index, answer)}>{answer}</li>
          ))}
        </ol>
      }
      <button type="Submit" onClick={handleSubmit}><Check sx={{ color: "white" }} /> Submit</button>


    </div>
  );
}
