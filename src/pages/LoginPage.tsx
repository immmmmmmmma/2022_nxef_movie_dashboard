import MovieIcon from "@mui/icons-material/Movie";
import Avatar from "@mui/material/Avatar";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { ErrorMessage } from '@hookform/error-message';
import styled from "styled-components";

import { fetchRequestToken, fetchSessionId } from "../api/api";




const Icon = styled(Avatar)`
  margin: 10px auto !important;
`;

const Login = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      const reqToken = await fetchRequestToken().catch((err: Error) => {
        throw new Error(`fetchRequestToken call failed. error: ${err}`);
      });

      if (reqToken) {
        window.open(
          `https://www.themoviedb.org/authenticate/${reqToken}`,
          "_blank",
        );

        let sessionId;
        const interval = setInterval(async () => {
          sessionId = await fetchSessionId(reqToken);
          
          if (sessionId) {
            document.cookie = `session_id=${sessionId}`;
            navigation("/MovieList");
            
            clearInterval(interval);
          }
        }, 3000);
      }
    } catch (err: unknown) {
      alert("error");
    }
  };

    return (
        <Container maxWidth="xs">
          <form onSubmit={handleSubmit(onSubmit)}>
          <CssBaseline />
            <Icon sx={{ m: 1 }}>
              <MovieIcon />
            </Icon>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email", {
                required: true,
                pattern:  {
                  value: /\S+@\S+\.\S+/,
                  message: "????????? ????????? ????????????."
                },
              })}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "??????????????? ?????? ???????????????.",
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: "??????, ??????, ???????????? ??? 3?????? ????????? ???????????? ?????? 8?????? ?????? ??????????????? ???????????????."
                  },
              })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Login
            </Button>
            </form>
        </Container>
    )
}

export default Login;