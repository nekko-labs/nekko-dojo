/**
 * Renders a schema.org JSON-LD block. Search engines and answer engines read
 * this to describe the dojo (and each article) accurately instead of guessing
 * from the markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own content layer, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
