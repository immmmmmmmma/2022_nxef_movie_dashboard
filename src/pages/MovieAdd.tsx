import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { fetchAddList } from "../api/api";
import { getAccessToken } from "../hooks/getToken";
import { MovieListIdState } from "../atoms/atom";


const MovieAdd = () => {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const handleListId = useSetRecoilState(MovieListIdState);

  const [fieldValues, setFieldValues] = useState({
    comment: "",
    itemId: "2",
  });

  const handelAddList = async () => {
    debugger;
    let accessToken = cookies.access_token;

    if (accessToken === "undefined" || !accessToken) {
      const token = await getAccessToken();
      setCookie("access_token", token);

      accessToken = token;
    }

    const resultStatus = await fetchAddList(
      Number(fieldValues.itemId),
      fieldValues.comment,
      accessToken,
    );

    if (resultStatus && resultStatus.isSuccess) {
      handleListId(resultStatus.listId);
      navigation("/MovieList");
    }
  };

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFieldValues({
      ...fieldValues,
      [id]: value,
    });
  };

  return (
    <Container>
      <Box>
        <Text
          id="listName"
          label="List Name"
          variant="outlined"
          onChange={handleSetFieldValue}
        />
        <Text id="itemId" variant="outlined" value={"2"} disabled />
        <Button onClick={handelAddList}>추가</Button>
      </Box>
    </Container>
  );
};

export default MovieAdd;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 200px);
  height: 100%;
  margin-left: 200px;
  overflow: hidden;
  border: none;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40vh;
`;

const Text = styled(TextField)`
  margin-top: 20px !important;
`;
