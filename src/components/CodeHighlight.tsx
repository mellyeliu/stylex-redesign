interface CodeHighlightProps {
  code: string;
  isDark: boolean;
}

export function CodeHighlight({ code, isDark }: CodeHighlightProps) {
  return (
    <pre 
      className="font-mono text-sm leading-6 whitespace-pre-wrap"
      style={{ 
        color: isDark ? '#e5e7eb' : '#f8f8f2',
        margin: 0 
      }}
    >
      {code}
    </pre>
  );
}