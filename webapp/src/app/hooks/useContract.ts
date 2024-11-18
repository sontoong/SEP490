import { App } from "antd";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  getAllContractsPaginated,
  GetAllContractsPaginatedParams,
  setCurrentContractList,
} from "../redux/slice/contractSlice";

export function useContract() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.contract);
  const dispatch = useAppDispatch();

  const handleGetAllContractPaginated = useCallback(
    async (value: GetAllContractsPaginatedParams) => {
      const resultAction = await dispatch(getAllContractsPaginated(value));
      if (getAllContractsPaginated.fulfilled.match(resultAction)) {
        dispatch(
          setCurrentContractList({
            contracts: resultAction.payload[0],
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

  return {
    state,
    handleGetAllContractPaginated,
  };
}
