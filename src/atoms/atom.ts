import { atom, selectorFamily } from "recoil";

import { SMovie, STVShow } from "../api/api";

export interface IPaginationProps {
  pageName: "MovieList" | "Search";
  page: number;
}

export const paginationState = atom<IPaginationProps[]>({
  key: "paginationState",
  default: [
    { pageName: "MovieList", page: 1 },
    { pageName: "Search", page: 1 },
  ],
});

export const filteredPaginationState = selectorFamily<
  IPaginationProps[],
  string
>({
  key: "filteredPaginationState",
  get:
    (param: string) =>
    ({ get }) =>
      get(paginationState).filter(page => page.pageName === `${param}`),
});

export interface IModalProps {
  modalType: "MovieList" | "Search";
  isOpen: boolean;
}

export const modalPropsState = atom<IModalProps>({
  key: "modalOpenState",
  default: {
    modalType: "MovieList",
    isOpen: false,
  },
});

export const selectedMediaState = atom<SMovie | STVShow>({
  key: "selectedMediaState",
  default: {
    id: -1,
    backdrop_path: "",
    title: "",
    vote_average: 0,
    vote_count: 0,
    release_date: "",
    overview: "",
  },
});

export const searchKeywordState = atom<string>({
  key: "searchKeywordState",
  default: ".",
});

export const selectedValueState = atom<string>({
  key: "selectedValueState",
  default: "movie",
});

export const MovieListIdState = atom<number>({
  key: "MovieListIdState",
  default: 1,
});
