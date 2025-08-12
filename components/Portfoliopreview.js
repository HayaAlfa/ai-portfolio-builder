// components/PortfolioPreview.js
export default function PortfolioPreview({
  formData,
  theme = "classic",
  summary = "",
  loading = false,
}) {
  const themes = {
    classic: {
      page: "bg-white border border-gray-200 shadow rounded",
      name: "text-3xl font-bold tracking-tight",
      title: "text-base text-gray-500",
      section: "text-sm uppercase tracking-wider text-gray-500 font-semibold",
      body: "text-gray-800 leading-relaxed",
      pill: "inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2 mb-2",
      link: "text-blue-600 hover:underline",
      divider: "border-t border-gray-200 my-6",
    },
    modern: {
      page:
        "bg-gradient-to-br from-indigo-50 to-white shadow-xl rounded-2xl border border-indigo-100",
      name: "text-4xl font-extrabold tracking-tight text-indigo-700",
      title: "text-base text-indigo-600",
      section:
        "text-xs uppercase tracking-widest text-indigo-600 font-semibold",
      body: "text-gray-900 leading-7",
      pill:
        "inline-block bg-indigo-600/10 text-indigo-700 px-2 py-1 rounded-lg mr-2 mb-2",
      link: "text-indigo-700 hover:underline",
      divider: "border-t border-indigo-100 my-6",
    },
    elegant: {
      page: "bg-white shadow-lg rounded-lg border border-yellow-200",
      name: "text-4xl font-bold tracking-tight text-yellow-800 font-serif",
      title: "text-lg italic text-yellow-700",
      section:
        "text-sm uppercase tracking-wider text-yellow-700 font-semibold",
      body: "text-gray-800 leading-relaxed font-serif",
      pill:
        "inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2 mb-2",
      link: "text-yellow-700 hover:underline",
      divider: "border-t border-yellow-200 my-6",
    },
  };

  const t = themes[theme] ?? themes.classic;

  const {
    name = "",
    title = "",
    skills = "",
    bio = "",
    email = "",
    location = "",
    website = "",
    linkedin = "",
    github = "",
    projects = [],
    experience = [],
  } = formData || {};

  const initials = (name || "Y N")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  const skillList = (skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div id="portfolio-preview" className={`${t.page} p-8`}>
      {/* Header */}
      <header className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
          {initials}
        </div>
        <div>
          <h1 className={t.name}>{name || "Your Name"}</h1>
          <p className={t.title}>{title || "Your Title"}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {location && <span className="text-gray-500">{location}</span>}
            {email && (
              <a className={t.link} href={`mailto:${email}`}>
                {email}
              </a>
            )}
            {website && (
              <a className={t.link} href={website} target="_blank" rel="noreferrer">
                Website
              </a>
            )}
            {linkedin && (
              <a className={t.link} href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {github && (
              <a className={t.link} href={github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className={t.divider} />

      {/* Summary */}
      <section>
        <h2 className={t.section}>Summary</h2>
        {loading ? (
          <p className="mt-2 text-purple-600 font-medium animate-pulse">
            Generating summary with AI...
          </p>
        ) : (
          <p className={`${t.body} mt-2 whitespace-pre-wrap`}>
            {summary || bio || "Add a short professional intro here."}
          </p>
        )}
      </section>

      {/* Skills */}
      {skillList.length > 0 && (
        <>
          <div className={t.divider} />
          <section>
            <h2 className={t.section}>Skills</h2>
            <div className="mt-3">
              {skillList.map((s, i) => (
                <span key={i} className={t.pill}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <>
          <div className={t.divider} />
          <section>
            <h2 className={t.section}>Projects</h2>
            <ul className="mt-3 space-y-3">
              {projects.map((p, i) => (
                <li key={i} className={t.body}>
                  <span className="font-semibold">{p.title || "Project"}</span>
                  {p.link && (
                    <>
                      {" · "}
                      <a
                        className={t.link}
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        demo
                      </a>
                    </>
                  )}
                  {p.description ? ` — ${p.description}` : ""}
                  {p.technologies?.length ? (
                    <div className="mt-1 text-sm text-gray-500">
                      Tech: {p.technologies.join(", ")}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <>
          <div className={t.divider} />
          <section>
            <h2 className={t.section}>Experience</h2>
            <ul className="mt-3 space-y-3">
              {experience.map((job, i) => (
                <li key={i} className={t.body}>
                  <div className="font-semibold">
                    {job.role || "Role"}
                    {job.company ? ` · ${job.company}` : ""}
                  </div>
                  {job.period && (
                    <div className="text-sm text-gray-500">{job.period}</div>
                  )}
                  {job.summary && <p className="mt-1">{job.summary}</p>}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
