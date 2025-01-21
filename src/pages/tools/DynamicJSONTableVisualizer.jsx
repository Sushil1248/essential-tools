import React, { useState } from "react";
import ReactJson from "react-json-view";
import MovingBar from "../components/MovingBar";
import BottomBar from "../components/Bottombar";

// Helper function to generate the loop code
const generateForLoopCode = (jsonData) => {
  let code = "";

  // If the data is an array
  if (Array.isArray(jsonData)) {
    code = `
for (let i = 0; i < data.length; i++) {
  const item = data[i];
  console.log(item); // Render item as a card
}
    `;
  }
  // If the data is an object
  else if (typeof jsonData === "object" && jsonData !== null) {
    code = `
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    const value = data[key];
    console.log(value); // Render value as a card
  }
}
    `;
  }

  return code;
};

// Card component to display individual JSON items with full styling
const Card = ({ title, content }) => {
  const renderContent = (value) => {
    // Render content based on its type
    if (typeof value === "string") {
      return <p className="text-gray-600">{value}</p>;
    } else if (typeof value === "number") {
      return <p className="text-indigo-700">{value}</p>;
    } else if (typeof value === "boolean") {
      return <p className="text-green-500">{value ? "True" : "False"}</p>;
    } else if (value === null) {
      return <p className="text-red-500">Null</p>;
    } else {
      return (
        <ReactJson
          src={value}
          theme="monokai"
          iconStyle="circle"
          collapsed={2}
        />
      );
    }
  };

  return (
    <div className="border border-indigo-300 p-6 rounded-xl shadow-lg mb-6 bg-white hover:scale-105 transition-transform transform">
      <h3 className="text-xl font-bold text-indigo-800 mb-2">{title}</h3>
      <div className="text-sm">{renderContent(content)}</div>
    </div>
  );
};

const DynamicJSONFlowchartVisualizer = () => {
  const [jsonInput, setJsonInput] = useState(""); // Raw JSON input
  const [parsedJson, setParsedJson] = useState(null); // Parsed JSON data
  const [error, setError] = useState(""); // Error message for invalid JSON
  const [loopCode, setLoopCode] = useState(""); // Generated for loop code

  // Handle JSON input change
  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setError(""); // Clear error message when input is changed
  };

  // Autosize textarea height based on content

  // Parse JSON and generate the tree view and loop code
  const parseJsonToTree = () => {
    if (!jsonInput.trim()) {
      setError("JSON input is empty. Please provide valid JSON.");
      setParsedJson(null);
      setLoopCode("");
      return;
    }

    try {
      const parsedData = JSON.parse(jsonInput.trim());
      setParsedJson(parsedData);

      // Generate the loop code based on the parsed JSON structure
      const generatedCode = generateForLoopCode(parsedData);
      setLoopCode(generatedCode);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      setError(`Invalid JSON format: ${err.message}`);
      setParsedJson(null);
      setLoopCode("");
    }
  };

  return (
    <div className="container mx-auto px-8 py-12 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-xl rounded-3xl border-t-8 border-indigo-600 w-full">
      <h2 className="text-4xl font-semibold text-indigo-900 mb-12 text-center">
        Visualize Your JSON Structure
      </h2>

      

      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Input Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-10 transition-transform transform ">
          <label className="block text-xl font-medium text-indigo-800 mb-4">
            Paste your JSON data below
          </label>
          <textarea
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder='{"key1": {...}, "key2": {...}}'
            rows="12"
            className="w-full p-4 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-600 font-semibold text-lg bg-red-100 p-4 rounded-lg shadow-md">
              {error}
            </div>
          )}

          {/* Parse Button */}
          <div className="text-center mt-8">
            <button
              onClick={parseJsonToTree}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-2xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Visualize JSON Tree
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-10 mt-8 lg:mt-0 transition-transform transform">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">What is JSON?</h3>
          <p className="text-lg text-gray-700 mb-6">
            JSON (JavaScript Object Notation) is a lightweight data-interchange
            format that is easy for humans to read and write and easy for machines
            to parse and generate. It is primarily used to send data between a
            server and a web application as text.
          </p>
          <h4 className="text-xl font-semibold text-indigo-800 mb-2">
            JSON Structure:
          </h4>
          <ul className="list-disc pl-5 text-gray-700 mb-6">
            <li>JSON data is written in key-value pairs.</li>
            <li>It can be an object, array, string, number, or boolean.</li>
            <li>It is often used in APIs to transfer data.</li>
          </ul>
          <h4 className="text-xl font-semibold text-indigo-800 mb-2">
            Example:
          </h4>
          <pre className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-indigo-800 text-wrap">
            {
              '{"name": "Adeel Solangi", "language": "Sindhi", "id": "V59OF92YF627HFY0", "bio": "Lorem ipsum", "version": 6.1}'
            }
          </pre>
        </div>
      </div>

      {/* JSON Tree View and Code Section */}
      <div className="mt-12">
        {parsedJson ? (
          <>
            {/* Display For Loop Code */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Generated For Loop:
              </h3>
              <pre className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-indigo-800">
                {loopCode}
              </pre>
            </div>

            {/* Render Cards for JSON Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.isArray(parsedJson)
                ? parsedJson.map((item, index) => (
                    <Card
                      key={index}
                      title={`Item ${index + 1}`}
                      content={item}
                    />
                  ))
                : typeof parsedJson === "object" && parsedJson !== null
                ? Object.keys(parsedJson).map((key) => (
                    <Card key={key} title={key} content={parsedJson[key]} />
                  ))
                : null}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            No JSON data to display. Please parse valid JSON.
          </p>
        )}
      </div>

      <BottomBar />
      </div>
  );
};

export default DynamicJSONFlowchartVisualizer;