export const runBackendCode = async (code) => {
  try {
    const response = await fetch("http://localhost:5000/api/code/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    return data.output || data.error;
  } catch (err) {
    return "Server Error";
  }
};
