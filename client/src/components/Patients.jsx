


import { Avatar, Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Step, StepLabel, Stepper, SvgIcon } from "@mui/material"
import "./patientProfile/PatientProfile.css"
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import DoghnutChart from "./Bar";
import { Addicted } from "../Data/Addicted";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Timeline2 from "./TimeLine";
import { useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";

export default function Patients() {
  const [year, setYear] = useState("");
  const [patient, setPatient] = useState([]);
  const [scores, setScores] = useState([]);
  const [hourPlay, setHourPlay] = useState(0);

  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ["questionnaire"],
    queryFn: () =>
      newRequest.get(`/questionnaire/${id}`).then((res) => {
        return res.data;
      })
  });

  let questionnaireID;
  const length = data?.length
  if (data) {
    questionnaireID = data[length - 1]?.ID_questionnaire;
  }

  useEffect(() => {
    const fetchData = async () => {
      const patientResponse = await newRequest.get(`/patient/${id}`)
      setPatient(patientResponse.data[0])

      const patientID = patientResponse.data[0].ID_patient;
      const scoreResponse = await newRequest.get(`/answer/results/${patientID}`)
      setScores(scoreResponse.data)

      const playResponse = await newRequest.get(`/answer/${questionnaireID}`)
      const filteredAnswer = playResponse.data.find(dat => dat.ID_question === 7);

      if (filteredAnswer) {
        setHourPlay(filteredAnswer.answer);
      }
    }
    fetchData();
  }, [id, questionnaireID, hourPlay]);

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate)
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  };

  console.log(patient)


  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const [patientdata, setUserData] = useState({
    data: {
      labels: Addicted.map((data) => data.day),
      datasets: [
        {
          lineTension: 0.8,
          label: "Play hour",
          data: Addicted.map((data) => data.playHour),
          fill: true,
          borderColor: "#a16bfe9E",

          showMarker: false,
          drawBorder: false,
          borderRadius: 20,
          backgroundColor: (context) => {
            const bgColor = ["#a16bfe1e", "#a16bfe"];

            if (!context.chart.chartArea) {
              return;
            }

            const {
              ctx,
              data2,
              chartArea: { top, bottom },
            } = context.chart;
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            gradientBg.addColorStop(0, bgColor[0]);

            gradientBg.addColorStop(1, bgColor[1]);
            return gradientBg;
          },
        },

      ],
    },
  })






  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({

    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {

        backgroundImage:
          'linear-gradient( 136deg, var(--backicon2)0%,var(--backicon1) 50%, var(--backicon) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 60,
      width: 3,
      border: 0,
      marginLeft: 10,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, var(--backicon2)0%,var(--backicon1) 50%, var(--backicon) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, var(--backicon2)0%,var(--backicon1) 50%, var(--backicon) 100%)',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <AssignmentIcon />,
      2: <SendIcon />,
      3: <AccessAlarmIcon />,
      4: <ChecklistIcon />,
      5: <AddReactionIcon />
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const steps = ['Take The Test', 'Contact A Doctor', 'Start Recovering', 'Organize Your time', 'Recovered'];
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "10px 0", backgroundColor: '#a16bfe0e', gap: '20px' }}>
      <Box sx={{ width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '12px', backgroundColor: 'var(--backgrouncolor1)' }}>
        <div className="svg-img">
          <img src="/doctors-animate.svg" alt="" />
        </div>
        <div className="patient-welcome">

          <h2>Patient Details</h2>
          <div className="patient-addiction-information">
            <div className="information">
              <div><h4>First name :</h4><p>{patient?.first_name}</p></div>
              <div><h4>Last Name :</h4><p>{patient?.last_name}</p></div>
              <div><h4>Age :</h4><p>{calculateAge(patient?.birth_date)} Year</p></div>
            </div>
            <Divider orientation="vertical" flexItem sx={{ width: '1px', backgroundColor: '#ffffff' }} />
            <div className="information">
              <div><h4>First Test :</h4><p>{scores[0]?.date}</p></div>
              <div><h4>Last Test :</h4><p>{scores[scores?.length - 1]?.date}</p></div>
              <div><h4>Total Tests :</h4><p>{scores.length}</p></div>
            </div>
            <Divider orientation="vertical" flexItem sx={{ width: '1px', backgroundColor: '#ffffff' }} />
            <div><Avatar src="" sx={{ width: '150px', height: '150px' }} /></div>
          </div>
        </div>
      </Box>

      <Box sx={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
        <div className="patient-all">

          <div className="patient-one-statics ">
            <div className="patient-static "><h3><IconButton sx={{ background: 'linear-gradient(45deg, rgba(144, 0, 255, 1) 30%, rgba(144, 0, 255, 0.7) 90%)', }} ><AccessAlarmIcon sx={{ color: 'var(--backgrouncolor1)', fontSize: 30 }} /></IconButton>Hour Play </h3><span>{hourPlay}</span> <p></p> </div>
            {scores.map((score, index) => (

              <div key={score?.ID_questionnaire} className="patient-static test-number"><h3><IconButton sx={{ background: 'linear-gradient(45deg, var(--text-color) 30%, #2E62FF8e 90%)', }} ><AssignmentIcon sx={{ color: 'var(--backgrouncolor1)', fontSize: 30 }} /></IconButton>Test Number  </h3><span>{index + 1}</span><p style={{ fontSize: 16 }}>Score : {score?.result}</p></div>
            ))}
          </div>
        </div>
        <div className="patient-time">
          <Timeline2 />
        </div>
        <div className="patient-step">
          <Stack sx={{ width: '100%' }} spacing={4}>

            <Stepper activeStep={patient?.status === "new" ? -1 : patient?.status === "healing" ? 2 : 4} orientation="vertical" connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </div>

      </Box>
    </Box>
  );
}