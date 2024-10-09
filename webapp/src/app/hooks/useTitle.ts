import { useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import { setHeaderTitle } from "../redux/slice/headerSlice";

type HeaderTitle = {
  tabTitle: string;
  title?: string;
  path?: string;
};

export function useTitle({ tabTitle, title, path }: HeaderTitle) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = tabTitle;
    dispatch(setHeaderTitle({ title, path }));

    return () => {
      document.title = prevTitle;
    };
  }, [dispatch, title, path, tabTitle]);
}
