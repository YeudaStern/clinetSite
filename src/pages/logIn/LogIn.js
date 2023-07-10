import React, { useState } from "react";
import { LOGIN_ROUTE } from "../../constant/url";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/apiServices";
// MUI
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useStateContext } from "../../context";
import '../../pages/single/scroll.css';
import logo2 from '../../components/barside/logo2.png'

function Copyright(props) {
    return (
        <Typography  variant="body2" color="text.secondary" align="center" {...props}>
            {'Design by © '}
            <Link href="#" style={{ color: 'white' }}>
                Y&M Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Login() {
    const { setLogin } = useStateContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let resp = await apiPost(LOGIN_ROUTE, { email, password });

            console.log(resp);
          

            if (resp.msg) {
                setErr(resp.msg);
            } else if (resp.token) {
                localStorage.setItem('token', resp.token);
                if (resp.role === 'Admin') {
                    toast.success(`ברוך הבא - ${resp.name}`);
                    setLogin(2);

                    nav("/");
                } else if (resp.role === 'User') {
                    toast.success(`ברוך הבא - ${resp.name}`);
                    setLogin(3);
                    nav('/');
                } else if (resp.role === "Constructor") {
                    toast.success(`ברוך הבא - ${resp.name}`);
                    setLogin(0);
                    nav("/");
                }
            }
        } catch (err) {
            setErr("מייל או סיסמה אינם נכונים, נסה/י שוב");
        }
    };

    return (
        <div className="h-screen bg-zinc-800 justify-start"  style={{ backgroundImage: `url(${logo2})` , backgroundRepeat:'no-repeat' , backgroundSize:'60px' , backgroundPositionX:'10px' , backgroundPositionY:'10px'}} >

         {/* <img src={logo2} alt='logo' className='md:w-12 w-10 rounded-full' /> */}
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        paddingTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#1976D2'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ color: 'white' }}>
                        כניסה
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="כתובת מייל"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                               
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמה"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                classes: {
                                    root: 'rounded-input',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }}
                        />
                        {err && <small style={{ color: "red" }}>{err}</small>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, background: '#1976D2' }}
                            style={{ color: 'white' }}
                        >
                            כניסה
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" style={{ textDecoration: "none", color: 'white' }}>
                                    שכחת סיסמה?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2" style={{ textDecoration: "none", color: 'white' }}>
                                    {"חזרה לדף הבית"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} style={{ color: 'white' }} />
            </Container>
        </div>
    );
}

export default Login;
