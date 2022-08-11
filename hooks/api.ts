import { useContext } from "react";
import { ApiContext } from "../providers/api";

export const useApi = () => useContext(ApiContext);
