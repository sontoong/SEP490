import { useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import { setHeaderTitle } from "../redux/slice/headerSlice";

type HeaderTitle = {
  tabTitle: string;
  paths?: { title?: string; path?: string }[];
};

export function useTitle({ tabTitle, paths }: HeaderTitle) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = tabTitle;
    dispatch(setHeaderTitle(paths));

    return () => {
      document.title = prevTitle;
    };
  }, [dispatch, paths, tabTitle]);
}
