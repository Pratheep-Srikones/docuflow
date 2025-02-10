export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const formatSignature = (
  approved_by: string,
  approved_date: string,
  job_title: string,
  role: string,
  remarks: string,
  status: string
): string => {
  let result = "";
  result += `${status} by: ${approved_by}\n`;
  result += `${job_title} (${role})\n`;
  result += `${status} Date:\n ${formatTimestamp(approved_date)}\n`;
  if (!remarks) return result;
  const formattedRemarks = remarks.split(" ").reduce((acc, word, index) => {
    return acc + word + ((index + 1) % 6 === 0 ? "\n" : " ");
  }, "");
  result += `Remarks:\n ${formattedRemarks.trim()}\n`;

  return result;
};
