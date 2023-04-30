import React, { useContext, useState } from "react";
import { LOGIN_ROUTE } from "../../constant/url";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/apiServices";
import MyStore from "../../context/context";
// MUI
import Button from '@mui/material/Button'
import { toast } from "react-toastify";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Y&M Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );

}
const theme = createTheme();







function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    // const { updateUser } = useContext(MyStore)
    function CircularProgressWithLabel(props) {
      return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
      );
    }
    
    CircularProgressWithLabel.propTypes = {
      /**
       * The value of the progress indicator for the determinate variant.
       * Value between 0 and 100.
       * @default 0
       */
      value: PropTypes.number.isRequired,
    };

    function CircularStatic() {
      const [progress, setProgress] = React.useState(10);
    
      React.useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);
    
    }

    const nav = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let resp = await apiPost(LOGIN_ROUTE, { email, password })
          
            console.log(resp);

            if (resp.msg) {
                return setErr(resp.msg)
            }
            if (resp.token) {
              <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
                //  updateUser(resp.user, resp.token)
                toast.success("Log in Successfuly");
                nav("/")
            }
        }

        catch (err) {
                setErr("email or password wrong, please try agen !");
                toast.error("email or password wrong, please try agen !");
            }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log- in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"

                        />
                        {err && <small style={{ color: "red" }}>{err}</small>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                           Log In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" style={{ textDecoration: "none" }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="SignUp" variant="body2" style={{ textDecoration: "none" }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );

}

export default Login;
