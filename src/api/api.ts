import axios from "axios";

export const fetchRequestToken = async (): Promise<string> => {
  const url = process.env.REACT_APP_GET_REQUEST_TOKEN_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const result = await axios.get(`${url}?api_key=${apiKey}`);

  return result.data.request_token;
};

export const fetchSessionId = async (reqToken: string): Promise<string> => {
  const url = process.env.REACT_APP_GET_SESSION_ID_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const body = {
    request_token: reqToken,
  };

  const result = await axios.post(`${url}?api_key=${apiKey}`, body);

  return result.data.session_id;
};


export const getRequestToken = async () => {
  const url = process.env.REACT_APP_GET_REQUEST_TOKEN_V4_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const result = await axios.post(
    `${url}?api_key=${apiKey}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return result.data.request_token;
};

export const fetchAccessToken = async (reqToken: string): Promise<string> => {
  const url = process.env.REACT_APP_GET_ACCESS_TOKEN_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const body = {
    request_token: reqToken,
  };

  const result = await axios.post(`${url}?api_key=${apiKey}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.data.access_token;
};

/// 추가, 삭제, 수정
export const fetchAddList = async (
  itemId: number,
  listName: string,
  accesstoken: string,
) => {
  const body = {
    name: listName,
    iso_639_1: "en",
  };

  const url = process.env.REACT_APP_API_MOVIE_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  if (!url) {
    return false;
  }
  const result = await axios.post(`${url}?api_key=${apiKey}`, body, {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  });

  if (result.data.id) {
    return await fetchAddMovie(result.data.id, itemId, accesstoken);
  }
};

interface IAddMovieResult {
  isSuccess: boolean;
  listId: number;
}

export const fetchAddMovie = async (
  listId: number,
  itemId: number,
  accessToken: string,
): Promise<IAddMovieResult> => {
  const url = process.env.REACT_APP_API_MOVIE_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const body = {
    items: [
      {
        media_type: "movie",
        media_id: itemId,
      },
    ],
  };

  const result = await axios.post(
    `${url}/${listId}/items?api_key=${apiKey}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return { isSuccess: result.data.results[0].success, listId: listId };
};

export const fetchUpdateMovieComment = async (
  mediaId: number,
  list_id: number,
  comment: string,
  accessToken: string,
): Promise<boolean> => {
  const url = process.env.REACT_APP_API_MOVIE_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const body = {
    items: [
      {
        media_type: "movie",
        media_id: mediaId,
        comment: comment,
      },
    ],
  };

  const result = await axios.put(
    `${url}/${list_id}/items?api_key=${apiKey}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return result.data.success;
};

export interface IDeleteItem {
  mediaId: number;
  list_id: number;
  mediaType?: string;
  accessToken: string;
}

export const fetchDeleteMovie = async (
  deleteItem: IDeleteItem,
): Promise<boolean> => {
  const url = process.env.API_MOVIE_DELETE_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  if (!url) {
    return false;
  }

  const result = await axios.delete(
    `${url}/${deleteItem.list_id}/items?api_key=${apiKey}`,
    {
      headers: {
        Authorization: `Bearer ${deleteItem.accessToken}`,
      },
      data: {
        items: [
          {
            media_type: deleteItem.mediaType ? deleteItem.mediaType : "movie",
            media_id: deleteItem.mediaId === -1 ? 2 : deleteItem.mediaId,
          },
        ],
      },
    },
  );

  return result ? result.data.success : false;
};

// 검색

export const fetchMovies = async <T>(page: number, listId = 1): Promise<T> => {
  const url = process.env.REACT_APP_API_MOVIE_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const info = await axios.get(`${url}/${listId}?api_key=${apiKey}`, {
    params: { page: page },
  });
  return info.data;
};

export const fetchSearch = async <T>(
  query: string,
  page: number,
  apiName: string,
): Promise<T> => {
  const url = process.env.REACT_APP_API_SEARCH_ENDPOINT;
  const apiKey = process.env.REACT_APP_MY_API_KEY;

  const result = await axios.get(`${url}/${apiName}`, {
    params: {
      api_key: apiKey,
      language: "ko-KR",
      page: page,
      query: query,
      include_adult: false,
    },
  });

  return result.data;
};

export interface PaginationResponse {
  id: number;
  results: [];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface SMovie {
  id: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  media_type?: string;

  [prop: string]: string | number | undefined;
}

export interface STVShow {
  id: number;
  backdrop_path: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  overview: string;
  media_type?: string;

  [prop: string]: string | number | undefined;
}

export interface SPerson {
  id: number;
  name: string;
  known_for_department: string;
  known_for: SMovie[] | STVShow[];
  profile_path?: string;
  media_type?: string;

  [prop: string]: string | number | undefined | SMovie[] | STVShow[];
}
