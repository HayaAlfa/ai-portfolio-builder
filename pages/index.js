// pages/index.js
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import Form from "../../components/TestForm.js";
import PortfolioPreview from "../../components/Portfoliopreview.js";

export default function Home() {
  const router = useRouter();

  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("classic");

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    skills: "",
    bio: "",
    // optional contact fields
    email: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    // structured sections
    projects: [],
    experience: [],
  });

  // Generate / Regenerate summary
  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      setGeneratedContent(data.result || "");
    } catch (err) {
      console.error("Error:", err);
      setGeneratedContent("");
    } finally {
      setLoading(false);
    }
  };

  // Download the current preview as a standalone HTML file
  const handleDownloadHTML = () => {
    const el = document.getElementById("portfolio-preview");
    if (!el) {
      alert("Portfolio preview not found!");
      return;
    }
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${formData.name || "Portfolio"}</title>
<!-- Tailwind CDN so the file is styled when opened -->
<script src="https://cdn.tailwindcss.com"></script>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body class="bg-gray-100">
  <div class="max-w-3xl mx-auto p-6">
    ${el.outerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, `${formData.name || "portfolio"}.html`);
  };

  // Navigate to a clean full-page portfolio route
  const handleViewFullPage = () => {
    router.push({
      pathname: "/portfolio",
      query: {
        data: JSON.stringify({ ...formData, summary: generatedContent }),
        theme,
      },
    });
  };

  return (
    <>
      <Head>
        <title>AI Portfolio Builder</title>
      </Head>

      <main className="min-h-screen flex flex-col md:flex-row p-4 gap-4 bg-gray-50 text-gray-900">
        {/* Left: Form + Theme + Actions */}
        <div className="w-full md:w-1/2 bg-white p-6 shadow rounded">
          <h2 className="text-xl font-bold mb-4">Portfolio Input Form</h2>

          <Form formData={formData} setFormData={setFormData} />

          {/* Theme Selector */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <div className="flex flex-wrap gap-3">
              {["classic", "modern", "elegant"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1 rounded border transition ${
                    theme === t
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t[0].toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="bg-purple-600 text-white px-4 py-2 rounded shadow disabled:opacity-60"
              onClick={generateSummary}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate AI Summary"}
            </button>

            <button
              type="button"
              onClick={handleViewFullPage}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              View Full Page
            </button>

            <button
              type="button"
              onClick={handleDownloadHTML}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download HTML
            </button>
          </div>
        </div>

        {/* Right: Real Portfolio Preview */}
        <div className="w-full md:w-1/2">
          <PortfolioPreview
            formData={formData}
            theme={theme}
            summary={generatedContent}
            loading={loading}
          />
        </div>
      </main>

      {/* Optional: Editable final summary section */}
      {(loading || generatedContent.trim() !== "") && (
        <section className="mt-8 p-6 bg-purple-50 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
            ✨ Final Portfolio Summary
          </h2>

          {loading ? (
            <div className="text-purple-600 font-medium animate-pulse">
              Generating summary with AI...
            </div>
          ) : (
            <textarea
              className="w-full p-3 border rounded resize-y min-h-[150px] bg-white text-gray-800"
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              placeholder="AI summary will appear here..."
            />
          )}

          <div className="flex gap-3">
            <button
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded shadow disabled:opacity-60"
              onClick={generateSummary}
              disabled={loading}
            >
              Regenerate Summary
            </button>
          </div>
        </section>
      )}
    </>
  );
}
