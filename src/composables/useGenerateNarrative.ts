import { useCompletion } from "@ai-sdk/react";

const API_URL = "http://localhost:8787/api/generate/narrative";

export type NarrativeType = "propaganda" | "event" | "war";

export function useGenerateNarrative() {
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
