import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, FormControl, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link as RouterLink, useParams} from "react-router-dom";
import { StudentInterface } from '../../models/IStudent';
import { PetitionInterface, PetitionTypeInterface, PetitionPeriodInterface } from '../../models/IPetition';

import { Studentbar } from "../Bar-Student";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FiArrowLeft } from "react-icons/fi";
// import ResponsiveAppBar from './Bar_01'; #this is bar from own project

const Theme = createTheme({
    palette: {
        primary: {
            main: "#313131",
        },
        secondary: {
            main: "#C70039",
        },
        info: {
            main: "#164DC9",
        },
    },
});

export default function UpdatePetition() {
    let { id } = useParams();

    const [Added_Time, setAdded_Time] = React.useState<Dayjs | null>(dayjs());
    const [Petition_Startdate, setPetition_Startdate] = React.useState<Dayjs | null>(dayjs());
    const [Petition_Enddate, setPetition_Enddate] = React.useState<Dayjs | null>(dayjs());
    const [Petition_Reason, setPetition_Reason] = React.useState<String>("");

    //save entity
    const [PetitionTypeID, setPetitionTypeID] = React.useState('');
    const [PetitionPeriodID, setPetitionPeriodID] = React.useState('');

    //data from fetch

    const [PetitionTypes, setPetitionTypes] = React.useState<PetitionTypeInterface[]>([]);

    //fetch data from other
    const [PetitionPeriods, setPetitionPeriods] = React.useState<PetitionPeriodInterface[]>([]);

    const studentID = parseInt(localStorage.getItem("Student-id") + "");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    //Petition
    const [Petition, setPetition] = React.useState<Partial<PetitionInterface>>({});

    //onchange
    const onChangePetitionType = (event: SelectChangeEvent) => {
        setPetitionTypeID(event.target.value as string);
        console.log(PetitionTypeID);
    };

    const onChangePetitionPeriod = (event: SelectChangeEvent) => {
        setPetitionPeriodID(event.target.value as string)
        console.log(event.target.value as string);
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

    async function update() {
        setAdded_Time(dayjs())
        //TODO I'll do it later
        //Data ????????????????????????????????????????????????????????? Petition
        let data = {
            ID: convertType(id),
            StudentID: studentID,
            PetitionTypeID: PetitionTypeID,
            PetitionPeriodID: PetitionPeriodID,
            Petition_Reason: Petition_Reason,
            Petition_Startdate: Petition_Startdate,
            Petition_Enddate: Petition_Enddate,
            Added_Time: Added_Time,
        };

        const apiUrl = "http://localhost:8080/UpdatePetition";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setSuccess(true);
                    console.log(PetitionTypeID);
                } else {
                    setError(true);
                }
            });

        //don't reset
    }

    //load data to combobox

    //TODO match with getVisitorType
    const ListPetitionType = async () => {
        const apiUrl = "http://localhost:8080/ListPetitionType";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPetitionTypes(res.data);
                    console.log("do type");
                }
            });
    }

    //TODO match with getMapBeds
    const ListPetitionPeriod = async () => {
        const apiUrl = "http://localhost:8080/ListPetitionPeriod";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPetitionPeriods(res.data);
                    console.log("do Period");
                }
            });
    }

    const getPetition = async () => {
        const apiUrl1 = `http://localhost:8080/GetPetition/${id}`;
        const requestOptions1 = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        fetch(apiUrl1, requestOptions1)
            .then((response) => response.json())
            .then((result) => {
                result.data && setPetition(result.data);
                setPetition_Reason(result.data.Petition_Reason);
                setPetition_Startdate(result.data.Petition_Startdate);
                setPetition_Enddate(result.data.Petition_Enddate);
                setPetitionTypeID(result.data.PetitionTypeID);
                setPetitionPeriodID(result.data.PetitionPeriodID);
                console.log(PetitionTypeID)
                console.log(PetitionPeriodID)
                console.log("do this");
            });
    };

    //========function useEffect ========
    // React.useEffect(() => {
    //     SearchStudent();
    // }, [StudentID]);

    React.useEffect(() => {
        ListPetitionType();
        ListPetitionPeriod();
        getPetition();
    }, []);

    return (
        <div className="UpdatePetition" id="outer-container">
            <ThemeProvider theme={Theme}>
                <Studentbar
                    pageWrapId={"page-UpdatePetition"}
                    outerContainerId={"outer-container"}
                />
                <div id="page-UpdarePetition">
                    <React.Fragment>
                        <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
                            <CssBaseline />
                            <Container maxWidth="lg">
                                <Paper sx={{ padding: 1 }}>
                                    <Snackbar
                                        open={success}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                    >
                                        <Alert onClose={handleClose} severity="success">
                                            ??????????????????????????????????????????????????????
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="error">
                                            ???????????????????????????????????????????????????????????????
                                        </Alert>
                                    </Snackbar>

                                    <Box
                                        display="flex"
                                    >
                                        <Box sx={{ marginTop: 1.6 }}>
                                            <Typography variant="h4" gutterBottom>
                                                <Button
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to="/DataPetition"
                                                    sx={{ marginBottom: 0.5 }}
                                                >
                                                    <FiArrowLeft size="30" />
                                                </Button>
                                                UPDATE PETITION
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Container>
                            <Container maxWidth="lg" sx={{ marginTop: 1 }}>
                                <Paper sx={{ padding: 2 }}>
                                    <Box display={"flex"}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={1}
                                                sx={{
                                                    marginY: 2,
                                                    paddingX: 1,
                                                }}
                                            >
                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Reason
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="Petition_Reason"
                                                        value={Petition_Reason}
                                                        type="string"
                                                        variant="outlined"
                                                        onChange={(event) => setPetition_Reason(event.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        PetitionType
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            id="PetitionType"
                                                            value={PetitionTypeID}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                            onChange={onChangePetitionType}
                                                        >
                                                            <MenuItem value="">
                                                                PetitionType {/*??????????????? DisciplineType*/}
                                                            </MenuItem>
                                                            {PetitionTypes.map(petitionType => (
                                                                <MenuItem value={petitionType.ID} key={petitionType.ID}>
                                                                    {petitionType.PetitionType_Name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={6} />

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right" sx={{ marginY: 3 }}>
                                                        Petition_Period
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            id="PetitionPeriod"
                                                            value={PetitionPeriodID}
                                                            sx={{ marginY: 3 }}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                            onChange={onChangePetitionPeriod}
                                                        >
                                                            <MenuItem value="">
                                                                PetitionPeriod {/*??????????????? DisciplineType*/}
                                                            </MenuItem>
                                                            {PetitionPeriods.map(petitionPeriod => (
                                                                <MenuItem value={petitionPeriod.ID} key={petitionPeriod.ID}>
                                                                    {petitionPeriod.PetitionPeriod_Num}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Petition_Startdate
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker
                                                            renderInput={(props) => <TextField {...props} />}
                                                            label="Petition_Startdate"
                                                            value={Petition_Startdate}
                                                            onChange={(newValue) => {
                                                                setPetition_Startdate(newValue);
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Petition_Enddate
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker
                                                            renderInput={(props) => <TextField {...props} />}
                                                            label="Petition_Enddate"
                                                            value={Petition_Enddate}
                                                            onChange={(newValue) => {
                                                                setPetition_Enddate(newValue);
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>

                                                <Grid item xs={6} />

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right" sx={{ marginY: 3 }}>
                                                        Added_Time
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sx={{ marginY: 3 }}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker
                                                            renderInput={(props) => <TextField {...props} />}
                                                            label="Added_Time"
                                                            value={Added_Time}
                                                            onChange={(newValue) => {
                                                                setAdded_Time(newValue);
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {/*Hasn't finished*/}
                                                    <Button 
                                                        sx={{ float: "left", marginY: 3, marginX: 3 }}
                                                        component={RouterLink} to="/DataPetition" variant="contained"
                                                        size="large"
                                                        color="secondary"
                                                    >
                                                        back
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button
                                                        onClick={update}
                                                        variant="contained"
                                                        sx={{ float: "right", marginY: 3, marginX: 3 }}

                                                        color="primary"
                                                        size="large"
                                                    >
                                                        update
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Container>
                        </Box>
                    </React.Fragment >
                </div>
            </ThemeProvider>
        </div>
    );

}