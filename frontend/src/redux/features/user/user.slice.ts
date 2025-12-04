import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: IUser | null;
  isLoading: boolean;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  isLoading: true,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isLoading = false;
      state.token = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload || false;
    },
    updateUser(state, action: PayloadAction<Partial<IUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else {
        state.user = action.payload as IUser;
      }
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setState(_state, action: PayloadAction<TAuthState>) {
      return action.payload;
    },
  },
});

export const { setUser, logout, setLoading, updateUser, setToken } = userSlice.actions;
export default userSlice.reducer;
