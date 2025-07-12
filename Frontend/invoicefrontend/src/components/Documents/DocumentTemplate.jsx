import React from "react";

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-IN", { dateStyle: "long" })
    : "";

const DocumentTemplate = ({ type, data, theme = {} }) => {
  const {
    logo = null,
    companyName = "Your Company",
    candidateName = "Candidate",
    position,
    startDate,
    endDate,
    duration,
    salary,
    newSalary,
    location,
    benefits,
    promotionDate,
    hrName,
    hrEmail,
    responseDeadline,
    mentorName,
    letterContent = "",
  } = data;


  const {
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    primaryColor = "#1e3a8a",
    accentColor = "#4338ca",
    fontFamily = "sans-serif",
    borderColor = "#e5e7eb",
    mutedColor = "#9ca3af",
  } = theme;

  const renderMetaDetails = () => {
    switch (type) {
      case "offer-letter-form":
        return (
          <>
            {position && <p><strong>Position:</strong> {position}</p>}
            {startDate && <p><strong>Start Date:</strong> {formatDate(startDate)}</p>}
            {salary && <p><strong>Salary:</strong> ₹{salary}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
            {benefits && <p><strong>Benefits:</strong> {benefits}</p>}
            {responseDeadline && (
              <p><strong>Response Deadline:</strong> {formatDate(responseDeadline)}</p>
            )}
          </>
        );

      case "internship-letter-form":
        return (
          <>
            {position && <p><strong>Internship Role:</strong> {position}</p>}
            {startDate && <p><strong>Start Date:</strong> {formatDate(startDate)}</p>}
            {duration && <p><strong>Duration:</strong> {duration}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
            {mentorName && <p><strong>Mentor:</strong> {mentorName}</p>}
          </>
        );

      case "experience-letter-form":
        return (
          <>
            {position && <p><strong>Position:</strong> {position}</p>}
            {startDate && <p><strong>From:</strong> {formatDate(startDate)}</p>}
            {endDate && <p><strong>To:</strong> {formatDate(endDate)}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
          </>
        );

      case "promotion-letter-form":
        return (
          <>
            {position && <p><strong>Position:</strong> {position}</p>}
            {promotionDate && <p><strong>Promotion Date:</strong> {formatDate(promotionDate)}</p>}
            {newSalary && <p><strong>New Salary:</strong> ₹{newSalary}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
          </>
        );

      default:
        return null;
    }
  };

  const getLetterTitle = () => {
    const map = {
      "offer-letter-form": "Offer Letter",
      "internship-letter-form": "Internship Confirmation",
      "experience-letter-form": "Experience Certificate",
      "promotion-letter-form": "Promotion Letter",
    };
    return map[type] || "Official Letter";
  };

  return (
    <div
      id="document"
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        backgroundColor,
        padding: "1.5rem",
        border: `1px solid ${borderColor}`,
        borderRadius: "1rem",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        color: textColor,
        fontFamily,
        fontSize: "14px",
        lineHeight: "1.7",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: primaryColor }}>
            {companyName}
          </h1>
          {location && (
            <p style={{ fontSize: "13px", color: mutedColor }}>{location}</p>
          )}
          {hrEmail && (
            <p style={{ fontSize: "13px", color: accentColor }}>
              <a href={`mailto:${hrEmail}`} style={{ textDecoration: "none", color: accentColor }}>
                {hrEmail}
              </a>
            </p>
          )}
        </div>

        {logo && (
          <img
            src={typeof logo === "string" ? logo : URL.createObjectURL(logo)}
            alt="Company Logo"
            style={{
              height: "56px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: "16px",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "1.25rem",
          color: accentColor,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {getLetterTitle()}
      </h2>

      {/* Candidate */}
      {candidateName && (
        <p style={{ marginBottom: "1.5rem", fontSize: "13px" }}>
          <span style={{ fontWeight: "600" }}>To:</span> {candidateName}
        </p>
      )}

      {/* Meta Details */}
      <div style={{ marginBottom: "1.5rem", fontSize: "14px" }}>
        {renderMetaDetails()}
      </div>

      {/* Letter Body */}
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "15px",
          lineHeight: "1.75",
          color: textColor,
          marginBottom: "2rem",
        }}
      >
        {letterContent ? (
          letterContent
        ) : (
          <span style={{ fontStyle: "italic", color: mutedColor }}>
            No letter content provided.
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{ fontSize: "14px", marginTop: "2rem" }}>
        <p>Regards,</p>
        <p style={{ fontWeight: "600" }}>{hrName || "HR Department"}</p>
        <p>{companyName}</p>
      </div>

      <p
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginTop: "2.5rem",
          color: mutedColor,
          borderTop: `1px solid ${borderColor}`,
          paddingTop: "1rem",
        }}
      >
        This is a system-generated document. No signature is required.
      </p>
    </div>
  );
};

export default DocumentTemplate;
