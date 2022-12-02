import { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { searchKeywordState } from "../atoms/atom";
import {
  filteredPaginationState,
  paginationState,
} from "../atoms/atom";

interface IPagingProps {
  pageName: "MovieList" | "Search";
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
}

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    z-index: 999;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: #fff;
  }

  ul.pagination li.active {
    background-color: #333;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #333;
  }
`;

const Paging = ({
  pageName,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
}: IPagingProps) => {
  const keyword = useRecoilValue(searchKeywordState);
  const pageValue = useRecoilValue(filteredPaginationState(pageName));
  const handelPageValue = useSetRecoilState(paginationState);

  const onPageChange = (pageNumber: number) => {
    handelPageValue(allPageValue => {
      const pageValuesCopy = [...allPageValue];
      const idxTaskObj = pageValuesCopy.indexOf(pageValue[0]);

      pageValuesCopy.splice(idxTaskObj, 1, {
        pageName: pageName,
        page: pageNumber,
      });

      return pageValuesCopy;
    });
  };

  useEffect(() => {
    onPageChange(1);
  }, [keyword]);

  return (
    <PaginationBox>
      <Pagination
        activePage={pageValue[0].page}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        prevPageText="‹"
        nextPageText="›"
        onChange={onPageChange}
      />
    </PaginationBox>
  );
};

export default Paging;
