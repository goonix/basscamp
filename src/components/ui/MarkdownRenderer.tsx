import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-gray-100 mt-8 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-gray-100 mt-8 mb-3 border-b border-gray-800 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-gray-300 ml-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-300 ml-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-gray-300">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-violet-600 pl-4 my-4 text-gray-400 italic">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-300 my-4 leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="bg-gray-800 px-1.5 py-0.5 rounded text-violet-300 text-sm font-mono">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm text-left border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-gray-700">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-gray-300 border-b border-gray-800/50">
      {children}
    </td>
  ),
  hr: () => <hr className="border-gray-800 my-6" />,
  strong: ({ children }) => (
    <strong className="text-gray-100 font-semibold">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-violet-400 hover:text-violet-300 underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
