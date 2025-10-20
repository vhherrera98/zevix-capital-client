// API RESPONSE
export type ApiResponse<T> = {
  data: T;
  status: string;
  statusCode: number;
  message: string;
}

export type Option = {
  label: string;
  value: number;
};