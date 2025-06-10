export interface ApiError {
  message: string;
  status: number;
  error: string;
  timestamp: Date;
  path: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}