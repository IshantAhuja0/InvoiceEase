import React from "react";

const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleDateString("en-IN", { dateStyle: "long" }) : "";

const DocumentTemplate = ({ type, ...data }) => {
  const {
    logo,
    companyName,
    candidateName,
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
    letterContent,
  } = data;

  const renderMetaDetails = () => {
    switch (type) {
      case "offer-letter-form":
        return (
          <>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
            <p><strong>Salary:</strong> ₹{salary}</p>
            <p><strong>Location:</strong> {location}</p>
            {benefits && <p><strong>Benefits:</strong> {benefits}</p>}
            {responseDeadline && (
              <p>
                <strong>Response Deadline:</strong> {formatDate(responseDeadline)}
              </p>
            )}
          </>
        );

      case "internship-letter-form":
        return (
          <>
            <p><strong>Internship Role:</strong> {position}</p>
            <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
            <p><strong>Duration:</strong> {duration}</p>
            <p><strong>Location:</strong> {location}</p>
            {mentorName && <p><strong>Mentor:</strong> {mentorName}</p>}
          </>
        );

      case "experience-letter-form":
        return (
          <>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>From:</strong> {formatDate(startDate)}</p>
            <p><strong>To:</strong> {formatDate(endDate)}</p>
            <p><strong>Location:</strong> {location}</p>
          </>
        );

      case "promotion-letter-form":
        return (
          <>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Promotion Date:</strong> {formatDate(promotionDate)}</p>
            <p><strong>New Salary:</strong> ₹{newSalary}</p>
            <p><strong>Location:</strong> {location}</p>
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
      className="max-w-4xl mx-auto bg-white p-6 md:p-10 border rounded-xl shadow-lg text-gray-800 font-sans"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-blue-900">{companyName}</h1>
          {location && <p className="text-sm text-gray-600">{location}</p>}
          {hrEmail && (
            <p className="text-sm text-blue-600">
              <a href={`mailto:${hrEmail}`}>{hrEmail}</a>
            </p>
          )}
        </div>
        {logo && (
          <img
            src={URL.createObjectURL(logo)}
            alt="Company Logo"
            className="h-14 w-auto object-contain"
          />
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-center mb-4 text-indigo-700 uppercase tracking-wide">
        {getLetterTitle()}
      </h2>

      {/* Candidate */}
      {candidateName && (
        <p className="text-sm mb-6">
          <span className="font-semibold">To:</span> {candidateName}
        </p>
      )}

      {/* Meta Info */}
      <div className="mb-6 text-sm text-gray-800 space-y-1">{renderMetaDetails()}</div>

      {/* Letter Content */}
      <div className="whitespace-pre-wrap text-[15px] leading-7 tracking-normal text-gray-700 mb-8">
        {letterContent}
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm">
        <p>Regards,</p>
        <p className="font-semibold">{hrName || "HR Department"}</p>
        <p>{companyName}</p>
      </div>

      <p className="text-xs text-center mt-10 text-gray-400 border-t pt-4">
        This is a system-generated document. No signature is required.
      </p>
    </div>
  );
};

export default DocumentTemplate;
