import axios from "axios"

const api = axios.create({
  headers: {
    "Acess-Control-Allow-Origin": "*",
  },
  baseURL: "http://localhost:3333"
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const access_token = localStorage.getItem("access_token");
    if (error.response.status === 401 && access_token) {
      const response = await refreshToken(error);
      return response;
    }
    return Promise.reject(error);
  }
);

async function refreshToken(error: any) {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const header = {
        "Content-Type": "application/json",
      };
      const parameters = {
        method: "PATCH",
        headers: header,
      };
      const body = {
        grant_type: "refresh_token",
        refresh_token,
      };
      axios
        .post(
          "http://localhost:3333/refresh-token",
          body,
          parameters
        )
        .then(async (res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          return resolve(res);
        })
        .catch((err) => {
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
 };

export default api;

