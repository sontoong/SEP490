import { App } from "antd";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  getAllRequestsPaginated,
  GetAllRequestsPaginatedParams,
  getAllTodaysRequestsPaginated,
  GetAllTodaysRequestsPaginatedParams,
  getDetailsOfRequest,
  GetDetailsOfRequestParams,
  setCurrentRequest,
  setNewRequestList,
  setProcessingRequestList,
  setCompletedRequestList,
  setCanceledRequestList,
  setCurrentRequestList,
  setTodaysRequestList,
} from "../redux/slice/requestSlice";

export function useRequest() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.request);
  const dispatch = useAppDispatch();

  const handleGetAllRequestPaginated = useCallback(
    async (value: GetAllRequestsPaginatedParams) => {
      const resultAction = await dispatch(getAllRequestsPaginated(value));
      if (getAllRequestsPaginated.fulfilled.match(resultAction)) {
        switch (value.Status) {
          case 0:
            dispatch(
              setNewRequestList({
                requests: resultAction.payload[0],
                total: resultAction.payload[1],
              }),
            );
            break;

          case 1:
            dispatch(
              setProcessingRequestList({
                requests: resultAction.payload[0],
                total: resultAction.payload[1],
              }),
            );
            break;

          case 2:
            dispatch(
              setCompletedRequestList({
                requests: resultAction.payload[0],
                total: resultAction.payload[1],
              }),
            );
            break;

          case 3:
            dispatch(
              setCanceledRequestList({
                requests: resultAction.payload[0],
                total: resultAction.payload[1],
              }),
            );
            break;

          default:
            dispatch(
              setCurrentRequestList({
                requests: resultAction.payload[0],
                total: resultAction.payload[1],
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

  const handleGetAllTodaysRequestsPaginated = useCallback(
    async (value: GetAllTodaysRequestsPaginatedParams) => {
      const resultAction = await dispatch(getAllTodaysRequestsPaginated(value));
      if (getAllTodaysRequestsPaginated.fulfilled.match(resultAction)) {
        dispatch(
          setTodaysRequestList({
            requests: resultAction.payload[0],
            total: resultAction.payload[1],
          }),
        );
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

  const handleGetDetailsOfRequest = useCallback(
    async (value: GetDetailsOfRequestParams) => {
      const resultAction = await dispatch(getDetailsOfRequest(value));
      if (getDetailsOfRequest.fulfilled.match(resultAction)) {
        dispatch(setCurrentRequest(resultAction.payload));
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

  return {
    state,
    handleGetAllRequestPaginated,
    handleGetAllTodaysRequestsPaginated,
    handleGetDetailsOfRequest,
  };
}
