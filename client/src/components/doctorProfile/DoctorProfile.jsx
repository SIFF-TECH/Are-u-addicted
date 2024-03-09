import React, { useEffect, useState } from "react";
import "./DoctorProfile.css";
import LineChart from "../LineChart";
import { PatientData } from "../../Data/DocterData";
import { latestPatient } from "../../Data/DoctorPatientData";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import MoodTwoToneIcon from "@mui/icons-material/MoodTwoTone";
import SickTwoToneIcon from "@mui/icons-material/SickTwoTone";
import LeaderboardTwoToneIcon from "@mui/icons-material/LeaderboardTwoTone";
import Grid from "@mui/material/Unstable_Grid2";
import PieChart from "../PieChart";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  Button,
  Select,
  MenuItem,
  Box,
  TableRow,
  TableCell,
  ListItemIcon,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  Zoom,
  FormControl,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LineChart2 from "../LineChart2";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const user = useSelector((state) => state.user.currentUser);
  const [stats, setStats] = useState([]);
  const [statNew, setStatNew] = useState([]);
  const [statHealing, setStatHealing] = useState([]);
  const [statRecovered, setStateRecovered] = useState([]);
  const navigate = useNavigate();


  const { data } = useQuery({
    queryKey: ["doctorPatients"],
    queryFn: () =>
      newRequest.get("/patient/doctorPatient").then((res) => {
        return res.data;
      })
  });
  const doctorPatients = data;
  let total = 0;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await newRequest.get("/patient/patientsStats");
        setStats(statsResponse.data);

        const newResponse = await newRequest.get("/patient/patientsStatsDetail/new");
        setStatNew(newResponse.data);

        const healingResponse = await newRequest.get("/patient/patientsStatsDetail/healing");
        setStatHealing(healingResponse.data);

        const recoveredResponse = await newRequest.get("/patient/patientsStatsDetail/recovered");
        setStateRecovered(recoveredResponse.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  Array.isArray(stats) && stats.forEach(stat => {
    total = total + stat.nombre;
  });

  const handlePatient = (id) => {
    navigate(`/profile/patients/${id}`)
  }

  const handleMessage = async (id) => {
    newRequest.get(`/conversation/${id}`).then((res) => {
      const conversationID = res.data[0]?.ID_converation
      navigate(`/profile/messages/${conversationID}?patient=${id}`)
        
    })
  }

  const patientdata = {
    data: {
      labels: statNew.map((fake) => {fake.month}),
      datasets: [
        {
          lineTension: 0.8,
          label: "New Patient",
          data: statNew.map((fake) => fake.count),
          fill: true,
          borderColor: "#0077CC9E",

          showMarker: false,
          drawBorder: false,
          backgroundColor: (context) => {
            const bgColor = ["#0077cc1e", "#ffffff"];

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

    data2: {
      labels: PatientData.map((data) => data.month),
      datasets: [
        {
          lineTension: 0.8,
          label: "Patien Recovred",
          data: PatientData.map((data) => data.patientLost),
          fill: true,

          drawBorder: false,
          borderColor: "#80FF80",

          backgroundColor: (context) => {
            const bgColor = ["#80FF801F", "#ffffff"];

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
    data3: {
      labels: PatientData.map((data) => data.month),
      datasets: [
        {
          lineTension: 0.8,
          label: "Total Patient",
          data: PatientData.map((data) => data.patientAll),
          fill: true,
          showMarker: false,
          drawBorder: false,

          borderColor: "#df80ff",

          backgroundColor: (context) => {
            const bgColor = ["#df80ff8e", "#ffffff"];

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

    data4: {
      labels: PatientData.map((data) => data.month),
      datasets: [
        {
          lineTension: 0.8,
          label: "Total Patient",
          data: PatientData.map((data) => data.patientGain),
          fill: true,
          showMarker: false,
          drawBorder: false,

          borderColor: "#df80ff",

          backgroundColor: (context) => {
            const bgColor = ["#df80ff8e", "#252A34"];

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
    data5:{
      labels: statHealing.map((data) => (data.month)),
      datasets: [
        {
          lineTension: 0.8,
          label: "Healing Patient",
          data: statHealing.map((data) => data.count),
          fill: true,
          showMarker: false,
          drawBorder: false,

          borderColor: "#df80ff",

          backgroundColor: (context) => {
            const bgColor = ["#df80ff8e", "#252A34"];

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
    data6:{
      labels: statNew.map((data) => (data.month)),
      datasets: [
        {
          lineTension: 0.8,
          label: "New Patient",
          data: statNew.map((data) => data.count),
          fill: true,
          showMarker: false,
          drawBorder: false,

          borderColor: "#df80ff",

          backgroundColor: (context) => {
            const bgColor = ["#df80ff8e", "#252A34"];

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
    data7:{
      labels: statRecovered.map((data) => (data.month)),
      datasets: [
        {
          lineTension: 0.8,
          label: "Recovered Patient",
          data: statRecovered.map((data) => data.count),
          fill: true,
          showMarker: false,
          drawBorder: false,

          borderColor: "#df80ff",

          backgroundColor: (context) => {
            const bgColor = ["#df80ff8e", "#252A34"];

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
  };

  const handlClick = () => {
    document.getElementById("card").style.transform = "rotateX(180deg)";
    setTimeout(() => {
      document.getElementById("front").style.display = "none";
      document.getElementById("back").style.display = "block";
    }, 300);
    setTimeout(() => {
      setTimeout(() => {
        document.getElementById("front").style.display = "block";
        document.getElementById("back").style.display = "none";
      }, 300);
      document.getElementById("card").style.transform = "rotateX(0deg)";
    }, 1500);
  };

  const [year, setYear] = useState(2023);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const Row = ({ data }) => {
    const getStatusColor = (status) => {
      return status === "new"
        ? "green"
        : status === "healing"
          ? "red"
          : status === "recovered"
            ? "yellow"
            : "blue";
    };


    return (
      <>
        {data?.map((patient) => (
          <TableRow key={patient.id} sx={{ "& > *": { borderBottom: "unset"} }}>
            <TableCell onClick={() => handlePatient(patient?.ID_user)}>
              <Avatar
                sx={{ bgcolor: "#fd8904" , cursor: "pointer"}}
                alt="Patient"
                src="/broken-image.jpg"
              />
            </TableCell>
            <TableCell sx={{ cursor: "pointer" }} onClick={() => handlePatient(patient?.ID_user)} component="th" scope="row">
              {patient.first_name} {patient.last_name}
            </TableCell>

            <TableCell align="center">{patient.latest_date} </TableCell>
            <TableCell align="center">
              <p className={getStatusColor(patient.status)}>
                {patient.status}
              </p>
            </TableCell>

            <TableCell onClick={() => handleMessage(patient?.ID_patient)} align="center">
              <ListItemIcon>
                <Tooltip
                  title="send message"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 300 }}
                >
                  <IconButton>
                    <SendIcon sx={{ color: "#0077CC9E" }} />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <div className="InfoP">
      <div className="info-doctor">
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '12px', backgroundColor: 'var(--backgrouncolor1)' }}>
          <div className="svg-img">
            <img src="/online-doctor-animate.svg" alt="" />
          </div>
          <div className="patient-welcome">
            <h4>Welcome back</h4>
            <h2>Dr . {user?.userInfo.first_name} {user?.userInfo.last_name}</h2>
            <p>
              We would like to take this opportunity to welcome you to our
              practice and to thank you for choosing our physicians to participate
              in your healthcare. We look forward to providing you with
              personalized, comprehensive health care focusing on wellness and
              prevention.
            </p>
          </div>
        </Box>
        <div className="patient">
          {Array.isArray(stats) && stats.map((stat, index) => (
            <div key={index} className={`TextInfoP ${stat?.status}-patient`}>
              {stat?.status === 'new' ? <FaceTwoToneIcon sx={{ fontSize: 60 }} color="primary" /> : stat?.status === 'recovered' ? <MoodTwoToneIcon sx={{ fontSize: 60 }} color="success" /> : <SickTwoToneIcon sx={{ fontSize: 60 }} color="error" />}
              <h3>{stat?.nombre}</h3>
              <p>{stat?.status} Patient</p>
            </div>
          ))}
          <div className="TextInfoP total-patient">
            <LeaderboardTwoToneIcon sx={{ fontSize: 60 }} color="secondary" />
            <h3>{total}</h3>
            <p>Total Patient</p>
          </div>
        </div>
        <div className="statistic-title">
          <h3>Patient Statistics</h3>
          <hr />
        </div>

        <div className="statistics">
          <div className="TextInfoP statistic semain">
            <div className="static-header">
              <h4>
                {" "}
                New Patient :
                <TrendingUpIcon sx={{ fontSize: 30, color: "#44c75a" }} />
                <span>+9%</span>
              </h4>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Year</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={year}
                  label="Year"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>2021</MenuItem>
                  <MenuItem value={20}>2022</MenuItem>
                  <MenuItem value={30}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>

            <LineChart
              chartData={patientdata.data6}
              options={patientdata.options}
            />
          </div>
          <div className="TextInfoP statistic month">
            <div className="static-header">
              <h4>
                {" "}
                Healing Patient :
                <TrendingUpIcon sx={{ fontSize: 30, color: "#44c75a" }} />
                <span>+9%</span>
              </h4>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Year</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={year}
                  label="Year"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>2021</MenuItem>
                  <MenuItem value={20}>2022</MenuItem>
                  <MenuItem value={30}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>
            <LineChart
              chartData={patientdata.data5}
              options={patientdata.options}
            />
          </div>
          <div className="TextInfoP statistic year">
            <div className="static-header">
              <h4>
                {" "}
                Recovered Patient :
                <TrendingUpIcon sx={{ fontSize: 30, color: "#44c75a" }} />
                <span>+9%</span>
              </h4>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Year</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={year}
                  label="Year"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>2021</MenuItem>
                  <MenuItem value={20}>2022</MenuItem>
                  <MenuItem value={30}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>
            <LineChart
              chartData={patientdata.data7}
              options={patientdata.options}
            />
          </div>
          <div className="TextInfoP statistic circl">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ width: "90px", height: "90px" }} />
              <h4>Dr {user?.userInfo.first_name + " " + user?.userInfo.last_name}</h4>
              <p className="doctor-speciality">behavioral health</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                marginBottom: "30px",
              }}
            >
              <div className="doctor-more doctor-payment">
                <LocalAtmIcon
                  sx={{
                    fontSize: 60,
                    padding: "10px",
                    borderRadius: "50%",
                    background: " rgb(228,71,255)",
                    background:
                      "-webkit-linear-gradient(346deg, rgba(228,71,255,1) 15%, rgba(234,137,255,1) 100%)",
                    background:
                      "linear-gradient(346deg, rgba(228,71,255,1) 15%, rgba(234,137,255,1) 100%)",
                    filter:
                      ' progid:DXImageTransform.Microsoft.gradient(startColorstr="#e447ff",endColorstr="#ea89ff",GradientType=1)',
                    color: "white",
                  }}
                />
                <h4>Work For</h4>
                <p>10$/hr</p>
              </div>
              <div className="doctor-more doctor-available">
                <CalendarMonthIcon
                  sx={{
                    fontSize: 60,
                    padding: "10px",
                    borderRadius: "50%",
                    background: " #fd8904",
                    background:
                      "-webkit-linear-gradient(346deg, rgba(253,137,4,1) 15%, rgba(255,196,129,1) 100%)",
                    background:
                      "linear-gradient(346deg, rgba(253,137,4,1) 15%, rgba(255,196,129,1) 100%)",
                    filter:
                      ' progid:DXImageTransform.Microsoft.gradient(startColorstr="#e447ff",endColorstr="#ea89ff",GradientType=1)',
                    color: "white",
                  }}
                />
                <h4>Available</h4>
                <p>
                  <b>16</b>/24
                </p>
              </div>
              <div className="doctor-more doctor-mail">
                <MarkEmailReadIcon
                  sx={{
                    fontSize: 60,
                    padding: "10px",
                    borderRadius: "50%",
                    background: " #ffdd00",
                    background:
                      "-webkit-linear-gradient(346deg, rgba(255,196,129,1) 15%, rgba(255,242,155,1) 100%)",
                    background:
                      "linear-gradient(346deg, rgba(255,196,0,1) 15%, rgba(255,242,155,1) 100%)",
                    filter:
                      ' progid:DXImageTransform.Microsoft.gradient(startColorstr="#e447ff",endColorstr="#ea89ff",GradientType=1)',
                    color: "white",
                  }}
                />
                <h4>Mail</h4>
                <p>10</p>
              </div>
            </Box>
            <Box sx={{ width: "103%", height: "100px" }}>
              <LineChart2
                chartData={patientdata.data4}
                options={patientdata.options2}
              />
            </Box>
          </div>
          <div className="statistic-title">
            <h3>Doctor information</h3>
            <hr />
          </div>

          <TableContainer
            component={Paper}
            sx={{ width: "49%", overflow: "auto", maxHeight: "350px" ,zIndex:"1" }}
          >
            <Table aria-label="collapsible table">
              <TableHead sx={{ backgroundColor: "var(--backgrouncolor2)" }}>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ color: "var(--backgrouncolor1)" }}>
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "var(--backgrouncolor1)" }}
                  >
                    Last Test
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "var(--backgrouncolor1)" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "var(--backgrouncolor1)" }}
                  >
                    actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Row data={doctorPatients} />
              </TableBody>
            </Table>
          </TableContainer>

          <div
            className="TextInfoP my-information"
            onClick={handlClick}
            id="card"
          >
            <div className="front-card" id="front">
              <div className="logo-card">
                <Avatar sx={{ width: "120px", height: "120px" }} />
              </div>

              <div className="doctor-card-information">
                <div className="info-text">
                  <h3>
                    Dr. {user?.userInfo.first_name}
                    <p className="doctor-last-name">{user?.userInfo.last_name}</p>{" "}
                  </h3>
                  <p>Are You Addicted Doctor</p>
                </div>
              </div>
              <Divider
                sx={{
                  width: "60%",
                  float: "right",
                  backgroundColor: "grey",
                  opacity: 0.3,
                  height: "1px",
                }}
              />
              <div className="contact-information">
                <p className="contact facebook">
                  <FacebookTwoToneIcon color="primary" />
                  www.facebook.com/{user?.userInfo.first_name}-{user?.userInfo.last_name}
                </p>
                <p className="contact mail">
                  <ContactMailIcon color="secondary" />
                  {user?.userInfo.first_name}-{user?.userInfo.last_name}@gmail.com
                </p>
                <p className="contact whatsApp">
                  <WhatsAppIcon color="success" />
                  +213557381698
                </p>

                <p className="contact location">
                  <LocationOnIcon color="error" />
                  City Belle Vue Constantine
                </p>
              </div>
            </div>
            <div className="back-card" id="back">
              <img src="/Photo/logo2.png" alt="" />

              <p>&copy;AreYouAddicted.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
