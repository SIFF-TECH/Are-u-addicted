import React from 'react'
import { useEffect, useState } from "react";
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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Questions = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ["questions"],
        queryFn: () =>
            newRequest.get("/question").then((res) => {
                return res.data;
            })
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/question/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["questions"])
        }
    });

    const handleDelete = (id) => {
        console.log(id)
        mutation.mutate(id)
    }

    const Row = ({ data }) => {

        return (
            <>
                {data?.map((question) => (
                    <TableRow key={question?.ID_question} sx={{ "& > *": { borderBottom: "unset" } }}>
                        <TableCell align='center'>
                            {question?.ID_Question}
                        </TableCell>
                        <TableCell align="right">
                            <ListItemIcon onClick={() => handleDelete(question?.ID_Question)}>
                                <Tooltip
                                    title="Delete"
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 500 }}
                                >
                                    <IconButton>
                                        <DeleteForeverOutlinedIcon sx={{ color: "#fa3c4c" }} />
                                    </IconButton>
                                </Tooltip>
                            </ListItemIcon>
                        </TableCell>
                        <TableCell align='center' component="th" scope="row">
                            {question?.question_text}
                        </TableCell>

                        {
                            question?.answer_options?.split(",")?.map((answer) => (
                                <TableCell align="center">{answer} </TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </>
        );
    }
    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute" }}>

            </div>
            <div style={{ position: "fixed", bottom: "10px", right: "10px" }} >
                <Fab color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            <TableContainer component={Paper} sx={{ width: "100%" }}>

                <Table aria-label="collapsible table">

                    <TableHead sx={{ backgroundColor: "var(--backgrouncolor2)" }}>
                        <TableRow>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                ID
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                action
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                Question
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                Option1
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                option2
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                option3
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                option4
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                option5
                            </TableCell>
                            <TableCell align="center" sx={{ color: "var(--backgrouncolor1)" }}>
                                option6
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Row data={data} />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Questions