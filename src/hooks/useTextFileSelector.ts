import { useCallback, useEffect, useMemo, useState } from "react";

export const useTextFileSelector = <T>(accept = ".json") => {
  const [fileData, setFileData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = useCallback((event: Event) => {
    setIsLoading(true);
    const [file] = (event as unknown as React.ChangeEvent<HTMLInputElement>).target.files ?? [];

    file
      .text()
      .then((fileValue: string) => {
        setFileData(JSON.parse(fileValue) as T);
        setError("");
      })
      .catch((error) => setError(`Error reading file: ${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  const inputElement = useMemo(() => {
    const element = document.createElement("input");
    element.setAttribute("type", "file");
    element.setAttribute("accept", accept);
    return element;
  }, [accept]);

  useEffect(() => {
    inputElement.addEventListener("change", handleFileChange);
    return () => inputElement.removeEventListener("change", handleFileChange);
  }, [handleFileChange, inputElement]);

  const selectFile = () => {
    inputElement.click();
  };

  return { fileData, error, isLoading, selectFile };
};
