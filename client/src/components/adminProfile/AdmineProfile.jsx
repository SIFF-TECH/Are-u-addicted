import { useEffect, useState } from "react";
import "./AdmineProfile.css";
import { webData } from "../../Data/webData";
import { patients } from "../../Data/Patient";
import { doctors } from "../../Data/Doctors";
import LineChart from "../LineChart";
import DoghnutChart from "../Bar";

import {
  Avatar,
  Box,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper
} from "@mui/material";

import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import Face6TwoToneIcon from "@mui/icons-material/Face6TwoTone";
import PsychologyAltTwoToneIcon from "@mui/icons-material/PsychologyAltTwoTone";
import PaidIcon from "@mui/icons-material/Paid";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import newRequest from "../../utils/newRequest";
import { Check } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function AdmineProfile() {
  const [year, setYear] = useState("");
  const queryClient = useQueryClient();

  const { isLoading: isLoading1, error: error1, data: medecin } = useQuery({
    queryKey: ["medecins"],
    queryFn: () =>
      newRequest.get("/medecin").then((res) => {
        return res.data;
      })
  });
  const { isLoading: isLoading2, error: error2, data: patient } = useQuery({
    queryKey: ["patient"],
    queryFn: () =>
      newRequest.get("/patient").then((res) => {
        return res.data;
      })
  });


  const mutation = useMutation({
    mutationFn: (id) => {
        return newRequest.put(`/medecin/${id}`)
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["medecins"])
    }
});

const handleConfirmed = (id) => {
    mutation.mutate(id)
}

const handleDeleteDoctor = (id) => {
  
}
const handleDeletePatient = (id) => {

}


  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate)
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  }


  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const [patientdata, setUserData] = useState({
    data: {
      labels: webData.map((data) => data.month),
      datasets: [
        {
          lineTension: 0.8,
          label: "Doctor Payment",
          data: webData.map((data) => data.doctorPayment),
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
        {
          lineTension: 0.8,
          label: "Doctor Incom",
          data: webData.map((data) => data.doctorIncom),
          fill: true,

          drawBorder: false,
          borderColor: "#44bec7",
          borderRadius: 20,
          backgroundColor: (context) => {
            const bgColor = ["#44bec7", "#44bec71F"];

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
      labels: webData.map((data) => data.month),
      datasets: [
        {
          lineTension: 0.8,
          label: "Payroll K$",
          data: webData.map((data) => data.Payroll),
          fill: true,

          drawBorder: false,
          borderColor: "#44bec7",
          borderRadius: 20,
          backgroundColor: (context) => {
            const bgColor = ["#44bec7", "#ffffff1E"];

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

        {
          lineTension: 0.8,
          label: "Web Visited",
          data: webData.map((data) => data.webMonthVisited),
          fill: true,
          borderColor: "#a16bfe9E",

          showMarker: false,
          drawBorder: false,
          borderRadius: 20,
          backgroundColor: (context) => {
            const bgColor = ["#a16bfe", "#ffffff1E"];

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
  });


  const Row = ({ doctors }) => {
    const getStatusColor = (status) => {
      return status === 1 && "green";
    };

    return (
      <>
        {doctors?.map((doctor) => (
          <TableRow key={doctor?.ID_medecin} sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <Avatar sx={{ bgcolor: '#44bec7' }}
                alt="Doctor" src="/broken-image.jpg" />
            </TableCell>
            <TableCell component="th" scope="row">
              Dr. {doctor?.first_name} {doctor?.first_name}
            </TableCell>

            <TableCell align="center">{calculateAge(doctor?.birth_date)} </TableCell>
            <TableCell align="center">{doctor?.speciality} </TableCell>
            <TableCell align="center">
              <p className={doctor?.confirmed === 1 ? "green" : ""}>{doctor?.confirmed === 1 ? "Confirmed" : <div><Check onClick={() => handleConfirmed(doctor?.ID_user)} sx={{ fontSize: 30, color: "#44bec7", cursor: "pointer" }} /></div>}</p>
            </TableCell>
            <TableCell align="right">
              <ListItemIcon>
                <Tooltip
                  title="Delete"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 500 }}
                >
                  <IconButton onClick={() => handleDeleteDoctor(doctor?.ID_medecin)}>
                    <DeleteForeverOutlinedIcon sx={{ color: "#fa3c4c" }} />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }




  const Row2 = ({ patients }) => {
    const getStatusColor = (status) => {
      return status === "new" ? "blue" : (status === "healing" ? "red" : (status === "recovered" ? "green" : ""));
    };

    return (
      <>
        {patients?.map((patient) => (
          <TableRow key={patient.ID_patient} sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <Avatar sx={{ bgcolor: '#fd8904' }}
                alt="Patient" src="/broken-image.jpg" />
            </TableCell>
            <TableCell component="th" scope="row">
              {patient.first_name} {patient.first_name}
            </TableCell>

            <TableCell align="center">{calculateAge(patient.birth_date)} </TableCell>
            <TableCell align="center">
              <p className={getStatusColor(patient.status)}>{patient.status}</p>
            </TableCell>

            <TableCell align="right">
              <ListItemIcon>
                <Tooltip
                  title="Delete"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 500 }}
                >
                  <IconButton onClick={() => handleDeletePatient(patient.ID_patient)}>
                    <DeleteForeverOutlinedIcon sx={{ color: "#fa3c4c" }} />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <Box className="InfoP">
     
      <div className="all-info">
      
        <div className="patient">
          <div className="TextInfoP web-doctors">
            <PsychologyAltTwoToneIcon sx={{ fontSize: 50 }} color="primary" />
            <h3>{medecin?.length}</h3>
            <p>Psychologist</p>
          </div>
          <div className="TextInfoP web-patient">
            <Face6TwoToneIcon sx={{ fontSize: 50, color: "#fd8904 " }} />
            <h3>{patient?.length}</h3>
            <p>Patient</p>
          </div>
          <div className="TextInfoP current-patient">
            <FaceTwoToneIcon
              sx={{ fontSize: 50, fontWeight: "100", color: "#fa3c4c" }}
            />
            <h3>{medecin?.length + patient?.length}</h3>
            <p>User</p>
          </div>
          <div className="TextInfoP web-visited">
            <TrendingUpTwoToneIcon sx={{ fontSize: 50, color: "#a16bfe" }} />
            <h3>23</h3>
            <p>Web Month Visited</p>
          </div>
          <div className="TextInfoP web-payroll">
            <PaidIcon
              sx={{ fontSize: 50, color: "#44bec7" }}
              color="secondary"
            />
            <h3>24K</h3>
            <p>Payroll</p>
          </div>
        </div>
      </div>
      <div className="web-statics">
        <Box
          sx={{
            width: "47%",
            borderRadius: "14px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            padding: "10px 20px 5px",
          }}
        >
          <div className="static-header">
            <h4>
              {" "}
              Web Visited and Income :
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
            chartData={patientdata.data2}
            options={patientdata.options2}
          />
        </Box>
        <Box
          sx={{
            width: "47%",
            borderRadius: "14px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            padding: "10px 20px 5px",
          }}
        >
          <div className="static-header">
            <h4>
              Doctor Payment and Income :
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

          <DoghnutChart chartData={patientdata.data} />
        </Box>
      </div>

      <Box sx={{ width: '96%', marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>

        <TableContainer component={Paper} sx={{ width: "60%" }}>

          <Table aria-label="collapsible table">

            <TableHead sx={{ backgroundColor: "var(--backgrouncolor2)" }}>
              <TableRow>
                <TableCell>
                  <IconButton><FormatListBulletedOutlinedIcon
                    sx={{ color: "var(--backgrouncolor1)" }}
                  /></IconButton>

                </TableCell>
                <TableCell sx={{ color: "var(--backgrouncolor1)" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  Age
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  Speciality
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Row doctors={medecin} />
            </TableBody>
          </Table>
        </TableContainer>


        <TableContainer component={Paper} sx={{ width: "38%", overflow: 'hidden' }}>
          <Table aria-label="collapsible table">
            <TableHead sx={{ backgroundColor: "var(--backgrouncolor2)" }}>
              <TableRow>
                <TableCell>
                  <FormatListBulletedOutlinedIcon
                    sx={{ color: "var(--backgrouncolor1)" }}
                  />
                </TableCell>
                <TableCell sx={{ color: "var(--backgrouncolor1)" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  Age
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                  actions
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <Row2 patients={patient} />
            </TableBody>
          </Table>
        </TableContainer></Box>
      <Box sx={{ width: '100%' }}>

      </Box>


    </Box>
  );
}
