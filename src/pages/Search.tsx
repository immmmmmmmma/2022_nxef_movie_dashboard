import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import PeopleList from "../layouts/PeopleList";
import SearchForm from "../layouts/SearchForm";

import TableControl from "../components/TableControl";
import { useSearchData } from "../hooks/movie";
import { tvBoard, movieBoard } from "../public/data";
import {
  filteredPaginationState,
  searchKeywordState,
  selectedValueState,
} from "../atoms/atom";

const Container = styled.div`
  width:100%;
  height:100%;
  margin-top: 125px;
  overflow: hidden;
  border: none;
`;

const ContentContainer = styled.div`
  border-top: solid 0.5px;
  text-align: center;
  height: calc(100% - 5rem);
  margin-top: 5rem;

  .no-content {
    margin: 42vh 0 0 0;
    font-size: 30px;
    text-align: center;
  }
`;

const TableBox = styled.div`
  height: 87vh;
  border-bottom: solid 0.1px;
`;

const Search = () => {
  const [Board, setBoard] = useState(movieBoard);
  const page = useRecoilValue(filteredPaginationState("Search"));
  const keyword = useRecoilValue(searchKeywordState);
  const selectedValue = useRecoilValue(selectedValueState);

  const { data } = useSearchData(
    keyword,
    page[0].page,
    selectedValue,
  );

  const searchResult = useMemo(() => (data ? data.results : []), [data]);


  useEffect(() => {
    if (selectedValue === "movie") {
      setBoard(movieBoard);
    } else if (selectedValue === "tv") {
      setBoard(tvBoard);
    }
  }, [selectedValue]);

  return (
    <Container>
      <SearchForm />
      <ContentContainer>
        {data && searchResult.length ? (
          selectedValue === "person" ? (
            <PeopleList peopleData={searchResult} />
          ) : (
            <>
              <TableBox>
                <TableControl Board={Board} datas={searchResult} />
              </TableBox>
            </>
          )
        ) : (
          <div className="no-content">{"검색 결과가 없습니다"}</div>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Search;
