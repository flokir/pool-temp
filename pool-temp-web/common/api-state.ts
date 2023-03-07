export interface ApiState {
  loading: boolean;
  error: boolean;
  data: boolean;
}

export const LoadingState: ApiState = {
  loading: true,
  error: false,
  data: false,
};

export const ErrorState: ApiState = {
  loading: false,
  error: true,
  data: false,
};

export const DataState: ApiState = {
  loading: false,
  error: false,
  data: true,
};
