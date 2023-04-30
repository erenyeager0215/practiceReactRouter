import React, { useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LinkComponent } from "../components/atoms/LinkComponent";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const radioBtnOfGender = {
  label: "性別",
  branch: [
    {
      value: "男性",
      letter: "男性",
    },
    {
      value: "女性",
      letter: "女性",
    },
    {
      value: "その他",
      letter: "その他",
    },
  ],
};

const radioBtnOfHome = {
  label: "お住まい",
  branch: [
    {
      value: "市内",
      letter: "船橋市内",
    },
    {
      value: "市外",
      letter: "船橋市外",
    },
  ],
};

const theme = createTheme();

export const SignUp = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("male");
  const [home, setHome] = useState("InCity");
  const [birthYear, setBirthYear] = useState(null);
  const [birthMonth, setBirthMonth] = useState(null);
  const [birthDay, setBirthDay] = useState(null);

  const handleBirthYearChange = (value) => {
    setBirthYear(value);
  };

  const handleBirthMonthChange = (value) => {
    setBirthMonth(value);
  };

  const handleBirthDayChange = (value) => {
    setBirthDay(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      nickname: data.get("nickname"),
      password: data.get("password"),
      birthYear: birthYear,
      birthMonth: birthMonth,
      birthDay: birthDay,
      gender: gender,
      home: home,
    };

    navigate("/preview", { state: { userData } });

    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            新規登録
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="ニックネーム"
              name="nickname"
              autoComplete="nickname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <BirthDate
              onBirthYearChange={handleBirthYearChange}
              onBirthMonthChange={handleBirthMonthChange}
              onBirthDayChange={handleBirthDayChange}
            />
            <ControlledRadioButtonsGroup
              value={gender}
              onChange={setGender}
              props={radioBtnOfGender}
            />
            <ControlledRadioButtonsGroup
              value={home}
              onChange={setHome}
              props={radioBtnOfHome}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading="loading"
              disabled={TextField.length < 1}
              sx={{ mt: 3, mb: 2 }}
            >
              新規登録
            </Button>
            <Grid container>
              <Grid item>
                <LinkComponent to="/signin" variant="body2">
                  ログイン
                </LinkComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export const ControlledRadioButtonsGroup = ({ value, onChange, props }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        {props.label}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {props.branch.map((data) => (
          <>
            <FormControlLabel
              value={data.value}
              control={<Radio />}
              label={data.letter}
            />
          </>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export const BirthDate = ({
  onBirthYearChange,
  onBirthMonthChange,
  onBirthDayChange,
}) => {
  const birthYearRef = useRef(null);
  const birthMonthRef = useRef(null);
  const birthDayRef = useRef(null);

  const setYear = () => {
    for (let i = new Date().getFullYear(); 1920 <= i; i--) {
      const option = document.createElement("option");
      option.value = `${i}`;
      option.text = `${i}`;
      // ref.currentでDOMに直接アクセスできる
      birthYearRef.current.appendChild(option);
    }
  };

  const setMonth = () => {
    for (let i = 1; i <= 12; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      birthMonthRef.current.appendChild(option);
    }
  };

  const setDay = () => {
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      birthDayRef.current.appendChild(option);
    }
  };

  const selectBirthYear = (e) => {
    onBirthYearChange(e.target.value);
  };

  const selectBirthMonth = (e) => {
    onBirthMonthChange(e.target.value);
  };

  const selectBirthDay = (e) => {
    onBirthDayChange(e.target.value);
  };

  useEffect(() => {
    setYear();
    setMonth();
    setDay();
  }, []);

  return (
    <div>
      <p>生年月日</p>
      <label>
        <select ref={birthYearRef} onChange={selectBirthYear}></select>年
      </label>
      <label>
        <select ref={birthMonthRef} onChange={selectBirthMonth}></select>月
      </label>
      <label>
        <select ref={birthDayRef} onChange={selectBirthDay}></select>日
      </label>
    </div>
  );
};
