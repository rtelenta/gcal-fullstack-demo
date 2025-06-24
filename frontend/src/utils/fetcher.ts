import { API_URL } from "@/configs";
import axios from "axios";

export const fetcher = axios.create({
  baseURL: API_URL,
});
