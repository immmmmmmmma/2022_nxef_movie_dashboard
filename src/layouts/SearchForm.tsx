import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { searchKeywordState } from "../atoms/atom";
import SearchControl from "../components/SearchControl";

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items:center;
  justify-content: space-between;
  width: 95%;
  top: 110px;
  z-index: 999;
  padding: 0 40px;
`;

const SearchFncWrap = styled.div`
    display: flex;
    align-content:center;

`

const SearchButton = styled(Button)`
  width: 100px;
  height: 57px;
  background-color: #373b69 !important;
  color: white;
  border-radius: 0 10px 10px 0 !important;
  z-index: 999;
`;

const SearchInput = styled(TextField)`
  width: 500px;
  background-color: #fff;
  border-radius: 10px 0 0 10px;
  z-index: 999;
`;

const SearchBar = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  const [inputVal, setInputVal] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const onChange: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    setInputVal(value);
  };

  const handleOnClick = () => {
    setKeyword(inputVal === "" ? "." : inputVal.replace(" ", "+"));
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  useEffect(() => {
    if (keyword) {
      setInputVal(keyword === "." ? "" : keyword.replace("+", " "));
    }
  }, []);

  return (
    <Container>
        <h1>Search</h1>
      <SearchFncWrap>
          <SearchControl />
          <SearchInput
            id="searchKeyword"
            label="Search"
            variant="outlined"
            ref={searchInput}
            onChange={onChange}
            onKeyDown={onKeyPress}
            value={inputVal}
          />
          <SearchButton
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleOnClick}
          >
            검색
          </SearchButton>
      </SearchFncWrap>
    </Container>
  );
};

export default SearchBar;
