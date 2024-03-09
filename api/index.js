import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import patientRoute from "./routes/patient.route.js";
import medecinRoute from "./routes/medecin.route.js";
import questionRoute from "./routes/question.route.js";
import questionnaireRoute from "./routes/questionnaire.route.js";
import answerRoute from "./routes/answer.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import alertRoute from "./routes/alert.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "YOUR_CLIENT_URL");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.set("trust proxy", 1);
app.use(cors({origin:"http://localhost:5173", credentials:true}));

//MIDDLE WARES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/patient", patientRoute);
app.use("/api/medecin", medecinRoute);
app.use("/api/question", questionRoute);
app.use("/api/questionnaire", questionnaireRoute);
app.use("/api/answer", answerRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/alert", alertRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went Wrong!!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(5000, () => {
  console.log("Connected to server successfully!");
});
