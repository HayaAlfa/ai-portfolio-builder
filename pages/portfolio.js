// pages/portfolio.js
import { useRouter } from "next/router";
import PortfolioPreview from "../components/Portfoliopreview";
export default function PortfolioPage() {
  const router = useRouter();

  let data = {};
  try {
    data = router.query.data ? JSON.parse(router.query.data) : {};
  } catch {
    data = {};
  }
  const theme = router.query.theme || "classic";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <PortfolioPreview
          formData={data}
          theme={theme}
          summary={data.summary || ""}
          loading={false}
        />
      </div>
    </div>
  );
}
