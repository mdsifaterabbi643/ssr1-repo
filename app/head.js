export const metadata = {
  title: "My App Title Sifat",
  description: "This is my awesome Next.js app",
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* ... other SEO-related meta tags */}
    </>
  );
}
