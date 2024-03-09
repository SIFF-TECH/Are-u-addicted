import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Step, StepLabel, Stepper, SvgIcon } from "@mui/material"
import "./PatientProfile.css"


import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import LineChart from "../LineChart";
import DoghnutChart from "../Bar";
import { Addicted } from "../../Data/Addicted";
import { useEffect, useState } from "react";

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

import AddReactionIcon from '@mui/icons-material/AddReaction';

import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export default function PatientProfile() {
  const [year, setYear] = useState("");
  const [hourPlay, setHourPlay] = useState(0);
  const [patient, setPatient] = useState(0);
  const user = useSelector((state) => state.user.currentUser);


  const { data } = useQuery({
    queryKey: ["questionnaire"],
    queryFn: () =>
      newRequest.get(`/questionnaire/${user.userInfo?.ID_user}`).then((res) => {
        return res.data;
      })
  });

  let ID_questionnaire;
  const length = data?.length
  if (data) {
    ID_questionnaire = data[length - 1]?.ID_questionnaire;
  }


  useEffect(() => {
    const fetchData = async () => {
      newRequest.get(`/answer/${ID_questionnaire}`).then((res) => {
        const filteredAnswer = res.data.find(dat => dat.ID_question === 7);

        if (filteredAnswer) {
          setHourPlay(filteredAnswer.answer);
        }
      })

      newRequest.get(`/patient/${user.userInfo?.ID_user}`).then((res) => {
        setPatient(res.data[0])
      })
    }
    fetchData()
  }, [ID_questionnaire, hourPlay, user.userInfo?.ID_user])

  const today = new Date();
  const dayOfWeek = today.getDay();

  let dayName = '';
  switch (dayOfWeek) {
    case 0:
      dayName = 'Sunday';
      break;
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
    default:
      dayName = '';
  }


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
          <h4>Welcome back</h4>
          <h2>{user?.userInfo.first_name} {user?.userInfo.last_name}</h2>
          <p>
            We would like to take this opportunity to welcome you to our
            practice and to thank you for choosing our physicians to participate
            in your healthcare. We look forward to providing you with
            personalized, comprehensive health care focusing on wellness and
            prevention.
          </p>
        </div>
      </Box>

      <Box sx={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
        <div className="patient-all">

          <div className="patient-statics ">
            <div className="patient-static test-number"><h3><IconButton sx={{ background: 'linear-gradient(45deg, var(--text-color) 30%, #2E62FF8e 90%)', }} ><AssignmentIcon sx={{ color: 'var(--backgrouncolor1)', fontSize: 30 }} /></IconButton>Test Done  </h3><span>{data?.length}</span><p>Note : Ask the doctor to take the test again</p></div>
            <div className="patient-static "><h3><IconButton sx={{ background: 'linear-gradient(45deg, rgba(144, 0, 255, 1) 30%, rgba(144, 0, 255, 0.7) 90%)', }} ><AccessAlarmIcon sx={{ color: 'var(--backgrouncolor1)', fontSize: 30 }} /></IconButton>Hour Play </h3><span>{hourPlay}</span> <p></p> </div>
          </div>
          <div className="playing-progress">
            <div className="static-header">
              <h4>
                Play Hour :
                <TrendingUpIcon sx={{ fontSize: 30, color: "#44c75a" }} />
                <span>+9%</span>
              </h4>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="sem">Semain</InputLabel>
                <Select
                  labelId="sem"
                  id="sem"
                  value={year}
                  label="Year"
                  onChange={handleChange}
                >

                  <MenuItem value={10}>01</MenuItem>
                  <MenuItem value={20}>02</MenuItem>
                  <MenuItem value={30}>03</MenuItem>
                  <MenuItem value={30}>04</MenuItem>
                </Select>
              </FormControl>
            </div>

            <DoghnutChart chartData={patientdata.data} />
          </div>
        </div>
        <div className="patient-advices">
          <h3>{dayName} Advices</h3>
          <ol type="A">
            <li><h5>1- Acknowledge the Problem:

            </h5><p>Recognize and accept that you have a gaming addiction. Admitting the issue is the first step towards recovery.</p></li>
            <li><h5>2- Set Realistic Goals:</h5><p>Establish achievable goals for reducing your gaming time gradually. Cold turkey might not be the most effective approach for everyone.</p></li>
            <li><h5>3- Create a Schedule:</h5><p>Plan your day with specific time blocks for work, study, socializing, and other activities. Stick to your schedule to establish a routine.</p></li>
            <li><h5>4- Find Alternatives:</h5><p>Identify alternative activities that you enjoy and that don't involve gaming. This could include sports, reading, art, or learning a new skill.</p></li>
            <li><h5>5- Socialize Offline:</h5><p>Spend more time with friends and family in real-life settings. Engaging in face-to-face interactions can help reduce the desire to play games excessively.</p></li>


          </ol>
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
