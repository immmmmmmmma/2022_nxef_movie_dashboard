import { Board } from "../components/TableControl";

export const menuItems = [
  {
    key: "List",
    name: "영화 리스트",
    path: "/MovieList",
  },
  {
    key: "Search",
    name: "검색",
    path: "/Search",
  },
];

export const selectItems = [
  {
    key: "movie",
    name: "Movie",
  },
  {
    key: "person",
    name: "Person",
  },
  {
    key: "tv",
    name: "TV Show",
  },
];

export const movieBoard: Board[] = [
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

export const tvBoard: Board[] = [
  {
    id: "name",
    label: "Name",
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
    id: "first_air_date",
    label: "First Air Date",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "overview",
    label: "Overview",
    minWidth: 170,
    display: "none",
    align: "center",
  },
];
