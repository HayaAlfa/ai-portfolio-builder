const apikey = process.env.OPENAI_API_KEY;
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  const { formData } = req.body || {};

  const prompt = `
  Generate a concise, professional portfolio summary based on the following:
  Name: ${formData.name}
  Title: ${formData.title}
  Skills: ${formData.skills}
  Bio: ${formData.bio}
  Projects: ${formData.projects.map((p) => `${p.title}: ${p.description}`).join(", ")}
  Experience: ${formData.experience.map((e) => `${e.role} at ${e.company}: ${e.summary}`).join(", ")}

  Return a polished, professional portfolio summary.
  `.trim();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error("OpenAI error:", text);
      res.status(500).json({ result: "" });
      return;
    }

    const data = JSON.parse(text);
    const message = data.choices?.[0]?.message?.content;

    if (!message) {
      res.status(500).json({ result: "" });
      return;
    }

    res.status(200).json({ result: message });
  } catch (error) {
    console.error("GPT error:", error);
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
}
