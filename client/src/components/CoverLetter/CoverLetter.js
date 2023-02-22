import { useState } from "react";
// import styles from "./index.module.css";

function CoverLetter() {
  const [industry, setIndustry] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");
  const [firstResult, setFirstResult] = useState();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  

  const handleCopy = () => {
    navigator.clipboard.writeText(firstResult);
    setIsCopied(true);
  };

  async function onSubmitjobTitle(event) {
    event.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:3080/coverLetter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: jobTitle,
          industry: industry,
          keyWords: keyWords,
          tone: tone,
          numWords: numWords,
        }),
       
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setFirstResult(data.firstResult);
      setJobTitle("");
      setIndustry("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <main>
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
            <div className="">
              <form onSubmit={onSubmitjobTitle}>
                <div className="flex flex-col">
                  <label className="sr-only" htmlFor="jobTitle">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                    name="jobTitle"
                    placeholder="Job Title"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="industry" className="sr-only">
                    Industry
                  </label>
                  <input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                    placeholder="Industry (Optional)"
                    type="text"
                    name="industry"
                    id="industry"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="keywords" className="sr-only">
                    Keywords for AI (Optional)
                  </label>
                  <textarea
                    rows={7}
                    value={keyWords}
                    onChange={(e) => setKeyWords(e.target.value)}
                    name="keyWords"
                    id="keyWords"
                    placeholder="Keywords for AI (Optional)"
                    className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="sr-only" htmlFor="tone">
                    Tone
                  </label>

                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                    name="tone"
                    id="tone"
                  >
                    <option value="default">Select Tone (Optional)</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="words" className="sr-only">
                    Words (Optional)
                  </label>
                  <input
                    value={numWords}
                    onChange={(e) => setNumWords(e.target.value)}
                    type="number"
                    className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                    placeholder="Number Of Words - Default 200 (Optional)"
                    name="words"
                    id="words"
                  />
                </div>

                <button
                  className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || jobTitle === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                  type="submit"
                  disabled={isGenerating || jobTitle === ""}
                >
                  {isGenerating ? "Generating..." : "Generate Job Description"}
                </button>
              </form>
            </div>
            <div className="">
              <div className="flex flex-col">
                <label htmlFor="output" className="sr-only">
                  {firstResult}
                </label>
                <textarea
                  rows={
                    firstResult === ""
                      ? 7
                      : firstResult?.split("\n").length + 12
                  }
                  name="output"
                  value={firstResult}
                  onChange={(e) => setFirstResult(e.target.value)}
                  disabled={firstResult === ""}
                  id="output"
                  placeholder="AI Cover letter Description"
                  className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                />
          
                <button
                  onClick={handleCopy}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  disabled={firstResult === ""}
                >
                  {isCopied ? "Copied" : "Copy to Clipboard"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoverLetter;
