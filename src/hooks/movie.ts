import { AxiosError } from "axios";
import { UseMutationResult, useMutation, useQuery } from "react-query";

import {
  PaginationResponse,
  IDeleteItem,
  fetchDeleteMovie,
  fetchMovies,
  fetchSearch,
} from "../api/api";

export function useListMovieData(page: number, listId: number) {
  return useQuery<PaginationResponse, boolean>(
    ["movies", page],
    () => fetchMovies(page, listId),
    {
      keepPreviousData: true,
    },
  );
}

export function useSearchData(
  keyword: string,
  page: number,
  selectedValue: string,
) {
  return useQuery<PaginationResponse, boolean>(
    ["search", { keyword, page, selectedValue }],
    () => fetchSearch(keyword, page, selectedValue),
    {
      keepPreviousData: true,
    },
  );
}

export default function useDeleteList(): UseMutationResult<
  boolean,
  AxiosError,
  IDeleteItem
> {
  return useMutation(fetchDeleteMovie, {
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
  });
}



