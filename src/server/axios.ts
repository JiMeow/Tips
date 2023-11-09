import { env } from "@/env.mjs";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: env.WEBSITE_URL
  });
  