import { useState, useEffect } from "react";

const modules = import.meta.glob("/curriculum/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export function useMarkdown(markdownPath: string) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const key = `/${markdownPath}`;
    const loader = modules[key];
    if (!loader) {
      setError(new Error(`Markdown file not found: ${markdownPath}`));
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    loader()
      .then((raw) => {
        setContent(raw);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, [markdownPath]);

  return { content, loading, error };
}
