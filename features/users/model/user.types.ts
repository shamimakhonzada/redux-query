export interface User {
  id: number;
  profile_image: string | null;
  email: string;
  username: string;
  full_name: string;
  role: string;
  is_verified: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
