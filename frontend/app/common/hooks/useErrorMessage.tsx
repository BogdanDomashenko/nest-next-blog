import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils";

export const useErrorMessage = (error: any) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(getErrorMessage(error));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return errorMessage;
};
