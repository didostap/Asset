import { useCallback, useState } from "react";

const useToggle = (initialValue = true) => {
  const [open, setOpen] = useState(initialValue);
  const toggleOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [setOpen]);

  return [open, toggleOpen] as const;
};

export default useToggle;
