export interface BaseResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: TError[];
  }

  type TError={
      type: string;
      value: string;
      msg: string;
      path: string;
      location: string;
  }
  