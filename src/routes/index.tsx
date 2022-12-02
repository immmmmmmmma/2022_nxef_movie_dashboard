import { lazy } from "react";
import { Navigate } from "react-router";

import DefaultLayout from "../layouts/index";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MovieList = lazy(() => import("../pages/MovieList"));
const MovieAdd = lazy(() => import("../pages/MovieAdd"));
const MovieUpdate = lazy(() => import("../pages/MovieUpdate"));
const Search = lazy(() => import("../pages/Search"));

const routes = (isLogin: boolean) => [
  {
    path: "/",
    element: isLogin ? <Navigate to="/MovieList" /> : <Navigate to="/LoginPage" />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/MovieList",
    element: <DefaultLayout />,
    children: [{ element: <MovieList />, path: "/MovieList" }],
  },
  {
    path: "/MovieUpdate",
    element: <DefaultLayout />,
    children: [{ element: <MovieUpdate />, path: "/MovieUpdate" }],
  },
  {
    path: "/MovieAdd",
    element: <DefaultLayout />,
    children: [{ element: <MovieAdd />, path: "/MovieAdd" }],
  },
  {
    path: "/Search",
    element: <DefaultLayout />,
    children: [{ element: <Search />, path: "/Search" }],
  },
];

export default routes;
