import api from "@/lib/axios";


const Login = async (email: string, password: string) => {
  try {
    const response = await api.post("/authenticate", {
      email,
      password
    });
    console.log(response.data);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    return response;
  } catch (error) {
    return
  }
}

export const useAuth = () => {
  return {
    Login
  }
}