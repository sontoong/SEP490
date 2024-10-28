import { App } from "antd";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login, LoginParams, setCurrentUser } from "../redux/slice/authSlice";
import { setShowOTPModal } from "../redux/slice/specialUISlice";

export function useAuth() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (value: LoginParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(login(value));
      if (login.fulfilled.match(resultAction)) {
        const { accessToken, refreshToken } = resultAction.payload;
        if (accessToken && refreshToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          const decode = jwtDecode(accessToken) as any;
          dispatch(setCurrentUser(decode));
          navigate("/");
        } else {
          dispatch(
            setShowOTPModal({
              open: true,
              extraValues: { email: value.email },
            }),
          );
        }
      } else {
        if (resultAction.payload) {
          notification.error({
            message: "Lỗi",
            description: `${resultAction.payload}`,
            placement: "topRight",
          });
        } else {
          notification.error({
            message: "Lỗi",
            description: resultAction.error.message,
            placement: "topRight",
          });
        }
      }
    },
    [dispatch, notification],
  );

  const handleLogout = useCallback(async () => {
    localStorage.clear();
    window.location.href = "/login";
  }, []);

  return {
    state,
    handleLogin,
    handleLogout,
  };
}
