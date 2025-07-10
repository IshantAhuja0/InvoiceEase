import axios from "axios";

function calculateEndDate(startDate, durationInMonths) {
  if (!startDate || !durationInMonths) return "";
  const start = new Date(startDate);
  start.setMonth(start.getMonth() + parseInt(durationInMonths));
  return start.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function aiResponse(formData, type) {
  const key = import.meta.env.VITE_OPEN_AI_KEY;
  let prompt = "";

  switch (type) {
    case "offer-letter-form":
      prompt = `
Write a formal offer letter body using the following details. Only return the main body content, without any headings, dates, signatures, or contact details. Do not use placeholders or fabricate any info.

- Candidate Name: ${formData.candidateName}
- Position: ${formData.position}
- Start Date: ${formData.startDate}
- Salary: ${formData.salary}
- Company Name: ${formData.companyName}
- Location: ${formData.location}
- Benefits: ${formData.benefits}
- HR Name: ${formData.hrName}
- Response Deadline: ${formData.responseDeadline}

Use a formal and welcoming tone. Keep it concise and under 250 words.
`;
      break;

    case "internship-letter-form":
      prompt = `
Write a professional internship confirmation letter body using the following data. Exclude headings, dates, and contact info. Do not invent any content or use placeholders.

- Candidate Name: ${formData.candidateName}
- Position: ${formData.position}
- Start Date: ${formData.startDate}
- Duration: ${formData.duration} months
- End Date: ${calculateEndDate(formData.startDate, formData.duration)}
- Company Name: ${formData.companyName}
- Location: ${formData.location}
- Mentor Name: ${formData.mentorName}

Tone should be warm and professional. Mention duration, remote status (if implied), and mentorship without overexplaining.
`;
      break;

    case "experience-letter-form":
      prompt = `
Generate the core body of a professional experience letter using the following information. Exclude all headers, footers, and signatures. Do not make up responsibilities or use placeholders.

- Candidate Name: ${formData.candidateName}
- Position: ${formData.position}
- Start Date: ${formData.startDate}
- End Date: ${formData.endDate}
- Company Name: ${formData.companyName}
- Location: ${formData.location}

Keep it brief and focused on tenure and professionalism. End with a respectful closing line.
`;
      break;

    case "promotion-letter-form":
      prompt = `
Write a promotion letter body paragraph using this data. Only return the core content without headers or footers. Avoid placeholders or assumptions.

- Candidate Name: ${formData.candidateName}
- New Position: ${formData.position}
- Promotion Date: ${formData.promotionDate}
- New Salary: ${formData.newSalary}
- Company Name: ${formData.companyName}
- Location: ${formData.location}

Use a formal, appreciative tone. Mention growth, trust, and expectations briefly.
`;
      break;

    default:
      return "❌ Unknown document type. Cannot generate content.";
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "InvoiceEase-DocumentGen",
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || "⚠️ AI did not return content.";
  } catch (error) {
    console.error("AI generation error:", error);
    return "⚠️ Failed to generate content.";
  }
}
