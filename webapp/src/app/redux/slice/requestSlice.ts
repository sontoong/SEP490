import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../services/agent";
import { AxiosError } from "axios";
import { excludedActionsPending } from "./specialUISlice";
import { Request } from "../../models/request";

export type TRequest = {
  currentRequestList: { requests: Request[]; total: number };
  todaysRequestList: { requests: Request[]; total: number };
  currentRequest: Request;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TRequest = {
  currentRequestList: { requests: [], total: 0 },
  todaysRequestList: { requests: [], total: 0 },
  currentRequest: {
    workerList: [],
    customer_Leader: [],
    productList: [],
    request: {
      categoryRequest: 0,
      conclusion: "",
      contract: null,
      contractId: "",
      customer: null,
      customerId: "",
      customerProblem: "",
      end: "",
      feedbacks: [],
      fileUrl: null,
      isOnlinePayment: false,
      leader: null,
      leaderId: "",
      orderCode: "",
      priceRequests: [],
      purchaseTime: "",
      requestId: "",
      roomId: "",
      start: "",
      status: 0,
      totalPrice: 0,
      requestPrice: 0,
    },
  },
  isFetching: false,
  isSending: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setCurrentRequestList: (
      state,
      action: PayloadAction<TRequest["currentRequestList"]>,
    ) => {
      state.currentRequestList = action.payload;
    },
    setTodaysRequestList: (
      state,
      action: PayloadAction<TRequest["todaysRequestList"]>,
    ) => {
      state.todaysRequestList = action.payload;
    },
    setCurrentRequest: (
      state,
      action: PayloadAction<TRequest["currentRequest"]>,
    ) => {
      state.currentRequest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("request/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return {
            ...initialState,
            isFetching: true,
          };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("request/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        (state) => {
          return { ...state, isSending: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("request/send/") &&
          action.type.endsWith("/fulfilled"),
        () => {
          return { ...initialState };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("request/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const getAllRequestsPaginated = createAsyncThunk<
  any,
  GetAllRequestsPaginatedParams
>(
  "request/fetch/getAllRequestsPaginated",
  async (data, { rejectWithValue }) => {
    const { PageIndex, Pagesize, Status } = data;
    try {
      const response = await agent.Request.getAllRequestsPaginated({
        PageIndex,
        Pagesize,
        Status,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const getAllTodaysRequestsPaginated = createAsyncThunk<
  any,
  GetAllTodaysRequestsPaginatedParams
>(
  "request/fetch/getAllTodaysRequestsPaginated",
  async (data, { rejectWithValue }) => {
    const { PageIndex, Pagesize } = data;
    try {
      const response = await agent.Request.getAllTodaysRequestsPaginated({
        PageIndex,
        Pagesize,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const getDetailsOfRequest = createAsyncThunk<
  any,
  GetDetailsOfRequestParams
>("request/fetch/getDetailsOfRequest", async (data, { rejectWithValue }) => {
  const { RequestId } = data;
  try {
    const response = await agent.Request.getDetailsOfRequest({
      RequestId,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
});

export const {
  setCurrentRequestList,
  setCurrentRequest,
  setTodaysRequestList,
} = requestSlice.actions;

export default requestSlice.reducer;

export type GetAllRequestsPaginatedParams = {
  PageIndex: number;
  Pagesize: number;
  Status?: number;
};

export type GetAllTodaysRequestsPaginatedParams = {
  PageIndex: number;
  Pagesize: number;
};

export type GetDetailsOfRequestParams = {
  RequestId: string;
};
