import type { AxiosResponse } from "axios";
import axios from "axios";

type MethodType = "get" | "post" | "put" | "delete";

export default async function fetchData<T>(
  url: string,
  reqMethod: MethodType,
  body: any
): Promise<T> {
  const response: AxiosResponse<T> = await axios[reqMethod](url, body);
  return response.data;
}
