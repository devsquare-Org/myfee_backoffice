import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;

type Props = {
  is: "mobile" | "tablet" | "desktop";
};

export function useBreakpoint({ is }: Props) {
  const [result, setResult] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const onChange = () => {
      const width = window.innerWidth;
      if (is === "mobile") {
        setResult(width < MOBILE_BREAKPOINT); // 768px 미만이면 true (모바일)
      } else if (is === "tablet") {
        setResult(MOBILE_BREAKPOINT <= width && width < DESKTOP_BREAKPOINT); // 768px 이상 1280px 미만이면 true (태블릿)
      } else {
        setResult(width >= DESKTOP_BREAKPOINT); // 1280px 이상이면 true (데스크탑)
      }
    };

    let query;
    if (is === "mobile") {
      query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
    } else if (is === "tablet") {
      query = `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${
        DESKTOP_BREAKPOINT - 1
      }px)`;
    } else {
      query = `(min-width: ${DESKTOP_BREAKPOINT}px)`;
    }

    const mql = window.matchMedia(query);

    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, [is]);

  return result ?? is === "desktop";
}
