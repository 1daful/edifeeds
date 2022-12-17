import { AxiosInstance, AxiosResponse } from "axios";
import { GorseException } from "../error";
import {
  CursorOptions,
  Success,
  User,
  UserCursor,
  UserNeighborsOptions,
} from "../interfaces";

// FIXME: is this an upsert endpoint?
export function insertUser(axios: AxiosInstance, userData: User) {
  return axios
    .post<Success, AxiosResponse<Success>>("", userData, {
      /*headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },*/
      params: {
        baseUrl: `http://127.0.0.1:8088/api/user`,
      }
    })
    .then(({ data }) => {
      return data.RowAffected;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function getUser(axios: AxiosInstance, userId: string) {
  return axios
    .get<User, AxiosResponse<User>>(``, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/user/${userId}`,
      }
    })
    .then(({ data }) => {
      return data;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function deleteUser(axios: AxiosInstance, userId: string) {
  return axios
    .delete<Success, AxiosResponse<Success>>(``, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/user/${userId}`,
      }
    })
    .then(({ data }) => {
      return data.RowAffected;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function updateUser(
  axios: AxiosInstance,
  userId: string,
  userData: User
) {
  return axios
    .patch<Success, AxiosResponse<Success>>(``, userData,
    {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/user/${userId}`,
      }
    })
    .then(({ data }) => {
      return data.RowAffected;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function getUsers(axios: AxiosInstance, options?: CursorOptions) {
  return axios
    .get<UserCursor, AxiosResponse<UserCursor>>(
    ``, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/users`,
        options,
      }
    })
    .then(({ data }) => {
      return data;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

// FIXME: is this an endpoint?
export function insertUsers(axios: AxiosInstance, users: User[]) {
  return axios
    .post<Success, AxiosResponse<Success>>(``, users,
    {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/users}`,
      }
    })
    .then(({ data }) => {
      return data.RowAffected;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function getUserNeighbors(
  axios: AxiosInstance,
  { userId, cursorOptions }: UserNeighborsOptions
) {
  return axios
    .get<string[], AxiosResponse<string[]>>(``, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/user/${userId}/neighbors}`,
        cursorOptions,
      }
    })
    .then(({ data }) => {
      return data;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}
