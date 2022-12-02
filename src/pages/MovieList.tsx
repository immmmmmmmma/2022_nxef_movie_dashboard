import React from "react";
import { useEffect, useMemo } from "react";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import ModalControl from "../components/ModalControl";
import { useListMovieData } from "../hooks/movie";
import TableControl, { Board } from "../components/TableControl";
import {
  filteredPaginationState,
  MovieListIdState,
  modalPropsState,
  selectedMediaState,
} from "../atoms/atom";

const Boards: Board[] = [
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "backdrop_path",
    label: "Image",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "vote_average",
    label: "Vote Average",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "vote_count",
    label: "Vote count",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "release_date",
    label: "Release Date",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "overview",
    label: "Overview",
    minWidth: 170,
    maxWidth: 300,
    display: "table-cell",
    align: "center",
  },
];

const Container = styled(Paper)`
  width: 100%;
  height: 80hv;
  margin-top: 100px;
  overflow:hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 70px 40px 60px;
  border-bottom: solid 1px #333;
`;

const TableBox = styled.div`
  height: 70vh;
  border-bottom: solid 0.1px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #333;
`;




const MovieList = () => {
  const navigation = useNavigate();

  const listId = useRecoilValue(MovieListIdState);
  const page = useRecoilValue(filteredPaginationState("MovieList"));
  const { data, isLoading, refetch } = useListMovieData(page[0].page, listId);

  const movies = useMemo(() => (data ? data.results : []), [data]);

  const media = useRecoilValue(selectedMediaState);
  const handleModalProps = useSetRecoilState(modalPropsState);

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (media.id === -1) {
      return;
    }

    handleModalProps({
      isOpen: true,
      modalType: "MovieList",
    });
  }, [media]);

  useEffect(() => {
    handleRefetch();
  }, [listId]);
  //

  return(
    <Container>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
        </Box>
      ) : (
        <>
          <Header>
            <Title>{"Movie List"}</Title>
            <Button onClick={() => { navigation("/MovieAdd"); }}>
              추가
            </Button>
          </Header>
          <TableBox>
            <TableControl Board={Boards} datas={movies} />
              <ModalControl handleRefetch={handleRefetch} />
          </TableBox>
        </>
      )}
    </Container>
  );
};
export default MovieList;