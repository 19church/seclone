import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink , useParams} from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { GetStudentByID } from "../../services/HttpClientService";

import Home from "../Home";
import { Studentbar } from "../Bar-Student";

import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { PrefixInterface } from "../../models/IPrefix";
import { StudentInterface } from "../../models/IStudent";

import { SuggestionInterface } from "../../models/ISuggestion";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function CreateSuggestion() {
  /////////////////////////////////////////////////////

  

  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [suggestion, setSuggestion] = useState<Partial<SuggestionInterface>>({});
  const [student, setStudent] = useState<StudentInterface>();

  const [suggestion_date, setSuggestion_Date] = useState<Date | null>(
    new Date()
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////// combobox /////////////////////////

  const feachBranch = async () => {
    fetch(`${apiUrl}/branch`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setBranch(result.data);
      });
  };

  const feachPrefix = async () => {
    fetch(`${apiUrl}/prefix`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log("type",result.data);
        setPrefix(result.data);
      });
  };

  const feachInstitute = async () => {
    fetch(`${apiUrl}/institute`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setInstitute(result.data);
      });
  };

  const fetchStudentByID = async () => {
    let res = await GetStudentByID();
    suggestion.StudentID = res.ID;
    if (res) {
      setStudent(res);
    }
  };

  /////////////////////////////////////////////////////

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof suggestion;
    setSuggestion({
      ...suggestion,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof suggestion;
    const { value } = event.target;
    setSuggestion({ ...suggestion, [id]: value });
  };

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

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachBranch();
    feachPrefix();
    feachInstitute();
    fetchStudentByID();

  }, []);

  /////////////////////////////////////////////////////

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //???????????????????????????????????????????????????????????????
  function submit() {
    let data = {
      StudentID: suggestion.StudentID,
      BranchID: convertType(suggestion.BranchID),
      PrefixID: convertType(suggestion.PrefixID),
      InstituteID: convertType(suggestion.InstituteID),

      Suggestion_Teacher:	        suggestion.Suggestion_Teacher,
      Suggestion_Student_Number:  suggestion.Suggestion_Student_Number,
      Suggestion_Student_Name:		suggestion.Suggestion_Student_Name,
      Suggestion_Date:		        suggestion_date,
      Suggestion_Detail:		      suggestion.Suggestion_Detail,

    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

  console.log(data);
    fetch(`${apiUrl}/suggestion`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log(res.data);
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataSuggestion";
          }, 500);
        } else {
          setError(true);
        }
      });
  }

  /////////////////////////////////////////////////////

  const [token, setToken] = useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <Home />;
  }

  /////////////////////////////////////////////////////

  return (
    <div className="CreateSuggestion" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-CreateStudent"}
          outerContainerId={"outer-container"}
        />
      <div id="page-CreateSuggestion">
      <React.Fragment>
      <Box sx={{ backgroundColor: "#313131", height: "125vh" }}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ padding: 2 }}>
              <Paper sx={{ padding: 2 }}>
                <Box display={"flex"}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to="/DataSuggestion"
                      >
                        <FiArrowLeft size="30" />
                      </Button>
                      CREATE SUGGESTION
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Container>
        <Container maxWidth="lg">
        <Box
            sx={{
              mt: 2,
            }}
          >
            <Snackbar
              open={success}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleClose} severity="success">
                ??????????????????????????????????????????????????????
              </Alert>
            </Snackbar>
            <Snackbar
              open={error}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleClose} severity="error">
                ???????????????????????????????????????????????????????????????
              </Alert>
            </Snackbar>
        </Box>

          <Paper sx={{ padding: 2 }}>
            <Box display={"flex"}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h4>?????????????????????????????????????????????</h4>
                    <hr />
                  </Grid>
                  <Grid item xs={2}>
                    <p>???????????????????????? </p>
                    <Select
                      fullWidth
                      id="Prefix"
                      onChange={handleChange}
                      native
                      value={suggestion.PrefixID + ""}
                      inputProps={{ name: "PrefixID" }}
                    >
                      <option aria-label="None" value="">
                        ????????????????????????
                      </option>
                      {prefix.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Prefix_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={4}>
                    <p>????????????-?????????????????????????????????</p>
                    <TextField
                      fullWidth
                      id="Suggestion_Teacher"
                      type="string"
                      label="????????????-?????????????????????????????????"
                      variant="outlined"
                      name="Suggestion_Teacher"
                      value={suggestion.Suggestion_Teacher}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={6}></Grid>
                  
                  <Grid item xs={2}>
                    <p>????????????????????????????????????</p>
                    <TextField
                      fullWidth
                      id="Suggestion_Student_Number"
                      type="string"
                      label="????????????????????????????????????"
                      variant="outlined"
                      name="Suggestion_Student_Number"
                      value={suggestion.Suggestion_Student_Number}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <p>????????????-????????????????????????????????????</p>
                    <TextField
                      fullWidth
                      id="Suggestion_Student_Name"
                      type="string"
                      label="????????????-????????????????????????????????????"
                      variant="outlined"
                      name="Suggestion_Student_Name"
                      value={suggestion.Suggestion_Student_Name}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={6}></Grid>

                  <Grid item xs={4}>
                    <p>???????????????????????????</p>
                    <Select
                      fullWidth
                      id="Institute"
                      onChange={handleChange}
                      native
                      value={suggestion.InstituteID + ""}
                      inputProps={{ name: "InstituteID" }}
                    >
                      <option aria-label="None" value="">
                        ???????????????????????????
                      </option>
                      {institute.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Institute_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={6}>
                    <p>????????????????????????</p>
                    <Select
                      fullWidth
                      id="Branch"
                      onChange={handleChange}
                      native
                      value={suggestion.BranchID + ""}
                      inputProps={{ name: "BranchID" }}
                    >
                      <option aria-label="None" value="">
                        ????????????????????????
                      </option>
                      {branch.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Branch_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                     <p>??????????????????????????????????????????????????????????????????????????????</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(params) => <TextField {...params} />}
                      value={suggestion_date}
                      label="??????????????????????????????????????????????????????????????????????????????"
                      onChange={setSuggestion_Date}                    
                    />
                    </LocalizationProvider>
                    </FormControl>
                  </Grid>

                  <Grid item xs={8}></Grid>

                  <Grid item xs={8}>
                    <p>????????????????????????????????????????????????????????????????????????????????????</p>
                    <TextField
                      fullWidth
                      id="Suggestion_Detail"
                      type="string"
                      label="????????????????????????????????????????????????????????????????????????????????????"
                      variant="outlined"
                      name="Suggestion_Detail"
                      value={suggestion.Suggestion_Detail}
                      
                      onChange={handleInputChange}
                      multiline
                    />
                  </Grid>

                  <Grid item xs={12}></Grid>
                  <Grid item xs={6}></Grid>   
                      
                  <Grid item xs={3}>
                    <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    color="primary"
                    onClick={submit}>
                      submit
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      color="secondary"
                      component={RouterLink}
                      to="/DataSuggestion"
                    >
                      back
                    </Button>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
        </Box>
        </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default CreateSuggestion;