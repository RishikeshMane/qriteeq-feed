import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import './feedback.css';
import NativeSelect from "@mui/material/NativeSelect";
import { Box } from "@mui/system";
import { Chip, FormControl, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Switch from "react-switch";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const FeedBackForm = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [fType, setFType] = useState("");
    const [relation, setRelation] = useState("");
    const [rating, setRating] = useState("Amazing");
    const [checked, setChecked] = useState(false);
    const [known, setKnown] = useState("");


    const handleFeedbackType = (e) => {
        setFType(e.target.value);
    }
    const handleKnown = (value) => {
        setKnown(value);
        setIsSelected(true);
        setRelation(value);
    }

    const deleteData = () => {
        setKnown("");
        setIsSelected(false);
    }
    const setCheckedSwitch = () => {
        if (checked === true) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
    }

    const postFeedback = () => {

        if (fType.length === 0) {
            alert("Please Select Feedback Type");
        }
        else if (feedback.length === 0) {
            alert("Please Enter Feedback");
        }
        else if (feedback.length < 50) {
            alert("Please Enter More than 50 Words for Feedback");
        }
        else if (relation.length === 0) {
            alert("Please Select Relation");
        }
        else {
            const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzA3Mjc0OGZkZGVmMDhiNWU3NzA0MTciLCJpYXQiOjE2NjMxNTIzODQsInR5cGUiOiJhY2Nlc3MifQ.CTGJNRDw069hJuL9tyb0OBKzWqnn8K8jZdbljU-ZKns"
            const config = {
                headers: { Authorization : `Bearer ${token}` }
            };
            const data = {
                user: ""+localStorage.getItem("USERID"),
                sender: ""+localStorage.getItem("SENDERID"),
                score: ""+rating,
                reviewType: ""+fType,
                relation: ""+relation,
                text: ""+feedback,
                shared: "hs"
            };
            axios.post(
                'https://api.qriteeq.com/v2/feedback/',data,config
            ).then(res => {
                  console.log(res);
                })
                .catch(function (error) {
                  console.error(error);
                });   
        }
    }
    return (
        <div class="wrapper">
            <Card sx={{ width: 380 }}>
                <div className="wrapper">
                    <img alt='' src='/assets/qriteeqBlueLogo.png' style={{ height: '40px', marginTop: "2rem" }}></img>
                </div>
                <div className="wrapper" style={{ marginTop: '2rem' }}>
                    <Box sx={{ width: 330, mt: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                Type of Feedback
                            </InputLabel>
                            <NativeSelect
                                name="fType"
                                // value={fType}
                                onChange={handleFeedbackType}
                            >
                                <option>Select Feedback Type</option>
                                <option value={"Opinion"}>Opinion</option>
                                <option value={"True Story"}>True Story</option>
                                <option value={"Gossip"}>Gossip</option>
                                <option value={"Campaign"}>Campaign</option>
                                <option value={"General Feedback"}>General Feedback</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </div>
                <Typography variant="subtitle1" component="div" style={{ marginTop: '2rem', marginLeft: "20px", fontSize: "14px" }}>
                    Write feedback
                </Typography>
                <div className="wrapper">
                    <textarea
                        style={{ width: "320px", minHeight: "70px", marginTop: '1rem', fontSize: "12px" }}
                        type="text"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback (minimum 50 character required)"
                    >
                    </textarea>
                </div>
                <Typography variant="subtitle1" component="div" style={{ marginTop: '2rem', marginLeft: "20px", fontSize: "14px" }}>
                    How well you know him/her?
                </Typography>
                <div style={{ display: "flex", marginTop: "10px", marginLeft: "20px", marginRight: "20px" }} class="scrolling-wrapper">
                    {
                        isSelected ? <Chip label={known} onDelete={() => deleteData()} color="success" /> : <div>
                            <Chip label="Friend" variant="outlined" color="primary" onClick={() => handleKnown("Friend")} />
                            <Chip style={{ marginLeft: "10px" }} label="Family" variant="outlined" color="primary" onClick={() => handleKnown("Family")} />
                            <Chip style={{ marginLeft: "10px" }} label="Acquaintance" variant="outlined" color="primary" onClick={() => handleKnown("Acquaintance")} />
                            <Chip style={{ marginLeft: "10px" }} label="Met Once" variant="outlined" color="primary" onClick={() => handleKnown("Met Once")} />
                            <Chip style={{ marginLeft: "10px" }} label="Colleague" variant="outlined" color="primary" onClick={() => handleKnown("Colleague")} />
                            <Chip style={{ marginLeft: "10px" }} label="Talked on the phone" variant="outlined" color="primary" onClick={() => handleKnown("Talked on the phone")} />
                            <Chip style={{ marginLeft: "10px" }} label="Never met" variant="outlined" color="primary" onClick={() => handleKnown("Never met")} />
                        </div>
                    }
                </div>
                <Typography variant="subtitle1" component="div" style={{ marginTop: '2rem', marginLeft: "20px", fontSize: "14px" }}>
                    How would you rate their personality
                </Typography>
                <div style={{ display: "flex", marginTop: "1rem", marginLeft: "20px", marginRight: "20px" }} className="wrapper">
                    <img onClick={() => setRating("Bad")} alt='' src='/assets/angryHighlight.png' style={{ height: "40px", cursor: "pointer" }}></img>
                    <img onClick={() => setRating("Poor")} alt='' src='/assets/sadHighlight.png' style={{ height: "40px", marginLeft: "20px", cursor: "pointer" }}></img>
                    <img onClick={() => setRating("Fine")} alt='' src='/assets/smileHighlight.png' style={{ height: "40px", marginLeft: "20px", cursor: "pointer" }}></img>
                    <img onClick={() => setRating("Great")} alt='' src='/assets/happyHighlight.png' style={{ height: "40px", marginLeft: "20px", cursor: "pointer" }}></img>
                    <img onClick={() => setRating("Amazing")} alt='' src='/assets/amazingHighlight.png' style={{ height: "40px", marginLeft: "20px", cursor: "pointer" }}></img>
                </div>
                <div className="wrapper">
                    <Typography variant="subtitle1" component="div" style={{ marginTop: '1rem', fontSize: "14px", fontWeight: 'bold' }}>
                        {rating}
                    </Typography>
                </div>
                <Typography variant="subtitle1" component="div" style={{ marginTop: '2rem', marginLeft: "20px", fontSize: "14px" }}>
                    Post as anonymous
                </Typography>
                <div style={{ marginLeft: "20px", marginTop: "1rem" }}>
                    <Switch checked={checked} onChange={() => setCheckedSwitch()} />
                </div>
                <Typography variant="subtitle1" component="div" style={{ marginTop: '1rem', marginLeft: "20px", fontSize: "14px" }}>
                    Upload image or document
                </Typography>
                <div style={{ marginLeft: "20px", marginTop: "0.5rem" }}>
                    <input type="file" name="file" />
                </div>
                <Button onClick={postFeedback} variant="contained" style={{ width: "330px", marginLeft: "20px", padding: '5px', marginTop: '3rem', marginBottom: '2rem' }} endIcon={<SendIcon />}>
                    POST FEEDBACK
                </Button>
            </Card>
        </div>
    );
};
export default FeedBackForm;