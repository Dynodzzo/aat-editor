import { useCallback, useEffect, useMemo, useState } from "react";

export const useTextFileSelector = <T>(accept: string = ".json") => {
  const [fileData, setFileData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = useCallback(async (event: Event) => {
    try {
      setIsLoading(true);
      const [file] = (event as unknown as React.ChangeEvent<HTMLInputElement>).target.files || [];
      const result = await file.text();
      setFileData(JSON.parse(result));
    } catch (error) {
      setFileData(null);
      setError("Error reading file");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const inputElement = useMemo(() => {
    const element = document.createElement("input");
    element.setAttribute("type", "file");
    element.setAttribute("accept", accept);
    return element;
  }, []);

  useEffect(() => {
    inputElement.addEventListener("change", handleFileChange);
    return () => inputElement.removeEventListener("change", handleFileChange);
  }, []);

  const selectFile = () => {
    inputElement.click();
  };

  return { fileData, error, isLoading, selectFile };
};
