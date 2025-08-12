import React from "react";

export default function Form({ formData, setFormData }) {
  return (
    <form className="flex flex-col gap-4">
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Skills (comma separated)"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
      />
      <textarea
        className="border p-2 rounded"
        placeholder="Bio / About Me"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />
      
      <div>
  <h3 className="font-semibold text-lg mb-2">Projects</h3>
  {formData.projects.map((project, index) => (
    <div key={index} className="mb-2">
      <input
        className="border p-2 rounded w-full mb-1"
        type="text"
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => {
          const updated = [...formData.projects];
          updated[index].title = e.target.value;
          setFormData({ ...formData, projects: updated });
        }}
      />
      <textarea
        className="border p-2 rounded w-full"
        placeholder="Project Description"
        value={project.description}
        onChange={(e) => {
          const updated = [...formData.projects];
          updated[index].description = e.target.value;
          setFormData({ ...formData, projects: updated });
        }}
      />
    </div>
  ))}
  <button
    type="button"
    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
    onClick={() =>
      setFormData({
        ...formData,
        projects: [...formData.projects, { title: "", description: "" }],
      })
    }
  >
    Add Project
  </button>
</div>

{/* EXPERIENCE SECTION */}
<div className="mt-6">
  <h3 className="font-semibold text-lg mb-2">Work Experience</h3>
  {formData.experience.map((job, index) => (
    <div key={index} className="mb-2">
      <input
        className="border p-2 rounded w-full mb-1"
        type="text"
        placeholder="Job Title"
        value={job.role}
        onChange={(e) => {
          const updated = [...formData.experience];
          updated[index].role = e.target.value;
          setFormData({ ...formData, experience: updated });
        }}
      />
      <input
        className="border p-2 rounded w-full mb-1"
        type="text"
        placeholder="Company"
        value={job.company}
        onChange={(e) => {
          const updated = [...formData.experience];
          updated[index].company = e.target.value;
          setFormData({ ...formData, experience: updated });
        }}
      />
      <textarea
        className="border p-2 rounded w-full"
        placeholder="Job Summary"
        value={job.summary}
        onChange={(e) => {
          const updated = [...formData.experience];
          updated[index].summary = e.target.value;
          setFormData({ ...formData, experience: updated });
        }}
      />
    </div>
  ))}
  <button
    type="button"
    className="bg-green-600 text-white px-4 py-2 rounded mt-2"
    onClick={() =>
      setFormData({
        ...formData,
        experience: [...formData.experience, { role: "", company: "", summary: "" }],
      })
    }
  >
    Add Experience
  </button>
</div>

    </form>
    
  );
}
