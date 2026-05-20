import { useCompletion } from "@ai-sdk/react";

const API_URL = "http://localhost:8787/api/generate/civilization";

export function useGenerateCiv() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, error } = useCompletion({
    api: API_URL,
  });

  return {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  };
}
