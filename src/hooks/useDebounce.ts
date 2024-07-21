import { useEffect, useMemo, useRef } from "react";
type CallbackFunction = (...args: any[]) => void;

function debounc(func: CallbackFunction, time: number = 300, context: any) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, time);
  };
}

export const useDebounce = (
  callBack: (...args: any[]) => void,
  time: number
) => {
  const ref = useRef<CallbackFunction | null>(null);

  useEffect(() => {
    ref.current = callBack;
  }, [callBack]);

  const debounceCallBack = useMemo(() => {
    const func = (event: any) => {
      ref.current?.(event);
    };
    return debounc(func, time, null);
  }, [time]);

  return debounceCallBack;
};
