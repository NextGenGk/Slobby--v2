// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json()); // Parse JSON requests

// const PORT = process.env.PORT || 5000;

// // API Route for Business Growth Plan

// app.get("/", (req, res) => {
//   res.send("Welcome to the Business Growth Plan API!");
// });

// app.post("/generate-plan", async (req, res) => {
//   try {
//     const {
//       B_name,
//       location,
//       types,
//       description,
//       monthly_revenue,
//       numOfEmp,
//       challenges,
//       govtSchemeAvail,
//       B_type,
//       marketUpdt,
//     } = req.body;

//     if (!process.env.OPENROUTER_API_KEY) {
//       return res.status(500).json({
//         success: false,
//         message: "API key is missing. Please check your environment variables.",
//       });
//     }

//     const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

//     const payload = {
//       model: "deepseek/deepseek-r1:free",
//       messages: [
//         {
//           role: "user",
//           content: `You are a visionary business strategist and growth expert. Your task is to create an actionable, comprehensive business growth plan that will help a local business become dominant in its locality.

// Use the following input details to craft the plan:

// - *Business Name:* ${B_name}
// - *Location:* ${location}
// - *Business Types:* ${types}
// - *Description:* ${description || "rural, price-oriented, with zero marketing knowledge and no content creation."}
// - *Monthly Revenue:* ${monthly_revenue}
// - *Number of Employees:* ${numOfEmp}
// - *Challenges:* ${challenges}
// - *Government Scheme Availability:* ${govtSchemeAvail}
// - *Business Type (Detailed):* ${B_type}
// - *Market Updates/Trends:* ${marketUpdt}

// Based on the above data, generate a strategic plan with clear, step-by-step guidance.

// 1. *Monthly Tasks:* Key tasks the business owner should implement each month.
// 2. *Weekly Tasks:* Short-term actionable tasks to maintain momentum.
// 3. *Supportive Hints:* Tips and additional recommendations to overcome challenges, including advice on market analysis, government schemes, digital marketing, and operational improvements.

// Please output your response as a JSON object with exactly three keys: "monthly_task", "weekly_task", and "supportive_hints". Each key should map to a detailed text plan that is both actionable and easy to understand.

// Ensure your response is in strict JSON format without any additional commentary.`,
//         },
//       ],
//     };



//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "HTTP-Referer": process.env.SITE_URL || "http://localhost",
//         "X-Title": process.env.SITE_NAME || "Business Growth Plan API",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
//     }

//     const data = await response.json();

//     if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
//       throw new Error("Invalid API response format: 'choices' is missing or empty.");
//     }

//     const rawContent = data.choices[0]?.message?.content || "{}";
//     const cleanedContent = rawContent.replace(/```json|```/g, "").trim();

//     try {
//       const parsedResponse = JSON.parse(cleanedContent);

//       res.json({
//         success: true,
//         message: "Business growth plan generated successfully.",
//         data: parsedResponse,
//       });
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       res.status(500).json({
//         success: false,
//         message: "Invalid JSON format received from AI.",
//         rawResponse: cleanedContent,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// Modified Code
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 5000;

// API Route for Business Growth Plan

app.get("/", (req, res) => {
  res.send("Welcome to the Business Growth Plan API!");
});

app.post("/", async (req, res) => {
  try {
    const {
      b_name,
      loc,
      type_p_s,
      description,
      monthly_revenue,
      numOfEmp,
      challenges,
      govtschemeavail,
      b_type,
    } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "API key is missing. Please check your environment variables.",
      });
    }

    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

    const payload = {
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: `You are a visionary business strategist and growth expert. Your task is to create an actionable, comprehensive business growth plan that will help a local business become dominant in its locality.

Use the following input details to craft the plan:

- *Business Name:* ${b_name}
- *Location:* ${loc}
- *Business Types:* ${type_p_s}
- *Description:* ${description || "rural, price-oriented, with zero marketing knowledge and no content creation."}
- *Monthly Revenue:* ${monthly_revenue}
- *Number of Employees:* ${numOfEmp}
- *Challenges:* ${challenges}
- *Government Scheme Availability:* ${govtschemeavail}
- *Business Type (Detailed):* ${b_type}

Based on the above data, generate a strategic plan with clear, step-by-step guidance.

1. *Monthly Tasks:* Key tasks the business owner should implement each month.
2. *Weekly Tasks:* Short-term actionable tasks to maintain momentum.
3. *Supportive Hints:* Tips and additional recommendations to overcome challenges, including advice on market analysis, government schemes, digital marketing, and operational improvements.

Please output your response as a JSON object with exactly three keys: "monthly_task", "weekly_task", and "supportive_hints". Each key should map to a detailed text plan that is both actionable and easy to understand.

Ensure your response is in strict JSON format without any additional commentary.`,
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.SITE_URL || "http://localhost",
        "X-Title": process.env.SITE_NAME || "Business Growth Plan API",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error("Invalid API response format: 'choices' is missing or empty.");
    }

    const rawContent = data.choices[0]?.message?.content || "{}";
    const cleanedContent = rawContent.replace(/```json|```/g, "").trim();

    try {
      const parsedResponse = JSON.parse(cleanedContent);

      // Formatting response
      const formatResponse = (response) => {
        return response
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .join("\n");
      };

      const formattedResponse = {
        monthly_task: formatResponse(parsedResponse.monthly_task),
        weekly_task: formatResponse(parsedResponse.weekly_task),
        supportive_hints: formatResponse(parsedResponse.supportive_hints),
      };

      res.json(formattedResponse); // Return only the formatted data object
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({
        error: "Invalid JSON format received from AI.",
        rawResponse: cleanedContent,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});





// Modified Code v2
// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json()); // Parse JSON requests

// const PORT = process.env.PORT || 5000;

// // API Route for Business Growth Plan

// app.get("/", (req, res) => {
//   res.send("Welcome to the Business Growth Plan API!");
// });

// app.post("/", async (req, res) => {
//   try {
//     const {
//       b_name,
//       loc,
//       type_p_s,
//       description,
//       monthly_revenue,
//       numOfEmp,
//       challenges,
//       govtschemeavail,
//       b_type,
//     } = req.body;

//     if (!process.env.OPENROUTER_API_KEY) {
//       return res.status(500).json({
//         error: "API key is missing. Please check your environment variables.",
//       });
//     }

//     const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

//     const payload = {
//       model: "deepseek/deepseek-r1:free",
//       messages: [
//         {
//           role: "user",
//           content: `You are a visionary business strategist and growth expert. Your task is to create an actionable, comprehensive business growth plan that will help a local business become dominant in its locality.

// Use the following input details to craft the plan:

// - *Business Name:* ${b_name}
// - *Location:* ${loc}
// - *Business Types:* ${type_p_s}
// - *Description:* ${description || "rural, price-oriented, with zero marketing knowledge and no content creation."}
// - *Monthly Revenue:* ${monthly_revenue}
// - *Number of Employees:* ${numOfEmp}
// - *Challenges:* ${challenges}
// - *Government Scheme Availability:* ${govtschemeavail}
// - *Business Type (Detailed):* ${b_type}

// Based on the above data, generate a strategic plan with clear, step-by-step guidance.

// 1. *Monthly Tasks:* \n   1. Task 1 description \n   2. Task 2 description \n   3. Task 3 description \n   4. Task 4 description \n   5. Task 5 description \n
// 2. *Weekly Tasks:* \n   1. Task 1 description \n   2. Task 2 description \n   3. Task 3 description \n   4. Task 4 description \n   5. Task 5 description \n
// 3. *Supportive Hints:* \n   1. Hint 1 description \n   2. Hint 2 description \n   3. Hint 3 description \n   4. Hint 4 description \n   5. Hint 5 description \n
// Please output your response as a JSON object with exactly three keys: "monthly_task", "weekly_task", and "supportive_hints". Each key should map to a detailed text plan that is both actionable and easy to understand.

// Ensure your response is in strict JSON format without any additional commentary.`,
//         },
//       ],
//     };

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "HTTP-Referer": process.env.SITE_URL || "http://localhost",
//         "X-Title": process.env.SITE_NAME || "Business Growth Plan API",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
//     }

//     const data = await response.json();

//     if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
//       throw new Error("Invalid API response format: 'choices' is missing or empty.");
//     }

//     const rawContent = data.choices[0]?.message?.content || "{}";
//     const cleanedContent = rawContent.replace(/```json|```/g, "").trim();

//     try {
//       const parsedResponse = JSON.parse(cleanedContent);
//       res.json(parsedResponse); // Return only the data object
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       res.status(500).json({
//         error: "Invalid JSON format received from AI.",
//         rawResponse: cleanedContent,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       details: error.message,
//     });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


// Modified code with function v4
// import express from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json()); // Parse JSON requests

// const PORT = process.env.PORT || 5000;

// // Helper function to format tasks into numbered list
// const formatAsPoints = (tasks) => {
//   // Split the tasks by newline, clean up any unnecessary whitespace, and filter out empty lines
//   return tasks
//     .split("\n")
//     .map((line) => line.trim())  // Trim extra spaces
//     .filter((line) => line.length > 0)  // Remove empty lines
//     .map((line, index) => `${index + 1}. ${line}`)  // Format each task as "1. Task"
//     .join("\n");  // Join them back together with newlines
// };

// // API Route for Business Growth Plan

// app.get("/", (req, res) => {
//   res.send("Welcome to the Business Growth Plan API!");
// });

// app.post("/", async (req, res) => {
//   try {
//     const {
//       b_name,
//       loc,
//       type_p_s,
//       description,
//       monthly_revenue,
//       numOfEmp,
//       challenges,
//       govtschemeavail,
//       b_type,
//     } = req.body;

//     if (!process.env.OPENROUTER_API_KEY) {
//       return res.status(500).json({
//         error: "API key is missing. Please check your environment variables.",
//       });
//     }

//     const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

//     const payload = {
//       model: "deepseek/deepseek-r1:free",
//       messages: [
//         {
//           role: "user",
//           content: `You are a visionary business strategist and growth expert. Your task is to create an actionable, comprehensive business growth plan that will help a local business become dominant in its locality.

// Use the following input details to craft the plan:

// - *Business Name:* ${b_name}
// - *Location:* ${loc}
// - *Business Types:* ${type_p_s}
// - *Description:* ${description || "rural, price-oriented, with zero marketing knowledge and no content creation."}
// - *Monthly Revenue:* ${monthly_revenue}
// - *Number of Employees:* ${numOfEmp}
// - *Challenges:* ${challenges}
// - *Government Scheme Availability:* ${govtschemeavail}
// - *Business Type (Detailed):* ${b_type}

// Based on the above data, generate a strategic plan with clear, step-by-step guidance.

// 1. *Monthly Tasks:* Key tasks the business owner should implement each month.
// 2. *Weekly Tasks:* Short-term actionable tasks to maintain momentum.
// 3. *Supportive Hints:* Tips and additional recommendations to overcome challenges, including advice on market analysis, government schemes, digital marketing, and operational improvements.

// Please output your response as a JSON object with exactly three keys: "monthly_task", "weekly_task", and "supportive_hints". Each key should map to a detailed text plan that is both actionable and easy to understand.

// Ensure your response is in strict JSON format without any additional commentary.`,
//         },
//       ],
//     };

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "HTTP-Referer": process.env.SITE_URL || "http://localhost",
//         "X-Title": process.env.SITE_NAME || "Business Growth Plan API",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
//     }

//     const data = await response.json();

//     if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
//       throw new Error("Invalid API response format: 'choices' is missing or empty.");
//     }

//     const rawContent = data.choices[0]?.message?.content || "{}";
//     const cleanedContent = rawContent.replace(/```json|```/g, "").trim();

//     try {
//       const parsedResponse = JSON.parse(cleanedContent);

//       // Format each task (monthly, weekly, and supportive) with the formatAsPoints function
//       const formattedResponse = {
//         monthly_task: formatAsPoints(parsedResponse.monthly_task),
//         weekly_task: formatAsPoints(parsedResponse.weekly_task),
//         supportive_hints: formatAsPoints(parsedResponse.supportive_hints),
//       };

//       res.json(formattedResponse); // Return the formatted response
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       res.status(500).json({
//         error: "Invalid JSON format received from AI.",
//         rawResponse: cleanedContent,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       details: error.message,
//     });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// Modified code v5
// import express from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json()); // Parse JSON requests

// const PORT = process.env.PORT || 5000;

// // Helper function to format tasks into a numbered list and ensure each line ends with \n
// const formatAsPoints = (tasks) => {
//   // Split the tasks by newline, clean up any unnecessary whitespace, and filter out empty lines
//   return tasks
//     .split("\n")
//     .map((line) => line.trim())  // Trim extra spaces
//     .filter((line) => line.length > 0)  // Remove empty lines
//     .map((line, index) => `${index + 1}. ${line}`)  // Format each task as "1. Task"
//     .join("\\n");  // Join them back together with \n for easy fetching
// };

// // API Route for Business Growth Plan

// app.get("/", (req, res) => {
//   res.send("Welcome to the Business Growth Plan API!");
// });

// app.post("/", async (req, res) => {
//   try {
//     const {
//       b_name,
//       loc,
//       type_p_s,
//       description,
//       monthly_revenue,
//       numOfEmp,
//       challenges,
//       govtschemeavail,
//       b_type,
//     } = req.body;

//     if (!process.env.OPENROUTER_API_KEY) {
//       return res.status(500).json({
//         error: "API key is missing. Please check your environment variables.",
//       });
//     }

//     const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

//     const payload = {
//       model: "deepseek/deepseek-r1:free",
//       messages: [
//         {
//           role: "user",
//           content: `You are a visionary business strategist and growth expert. Your task is to create an actionable, comprehensive business growth plan that will help a local business become dominant in its locality.

// Use the following input details to craft the plan:

// - *Business Name:* ${b_name}
// - *Location:* ${loc}
// - *Business Types:* ${type_p_s}
// - *Description:* ${description || "rural, price-oriented, with zero marketing knowledge and no content creation."}
// - *Monthly Revenue:* ${monthly_revenue}
// - *Number of Employees:* ${numOfEmp}
// - *Challenges:* ${challenges}
// - *Government Scheme Availability:* ${govtschemeavail}
// - *Business Type (Detailed):* ${b_type}

// Based on the above data, generate a strategic plan with clear, step-by-step guidance.

// 1. *Monthly Tasks:* Key tasks the business owner should implement each month.
// 2. *Weekly Tasks:* Short-term actionable tasks to maintain momentum.
// 3. *Supportive Hints:* Tips and additional recommendations to overcome challenges, including advice on market analysis, government schemes, digital marketing, and operational improvements.

// Please output your response as a JSON object with exactly three keys: "monthly_task", "weekly_task", and "supportive_hints". Each key should map to a detailed text plan that is both actionable and easy to understand.

// Ensure your response is in strict JSON format without any additional commentary.`,
//         },
//       ],
//     };

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "HTTP-Referer": process.env.SITE_URL || "http://localhost",
//         "X-Title": process.env.SITE_NAME || "Business Growth Plan API",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
//     }

//     const data = await response.json();

//     if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
//       throw new Error("Invalid API response format: 'choices' is missing or empty.");
//     }

//     const rawContent = data.choices[0]?.message?.content || "{}";
//     const cleanedContent = rawContent.replace(/```json|```/g, "").trim();

//     try {
//       const parsedResponse = JSON.parse(cleanedContent);

//       // Format each task (monthly, weekly, and supportive) with the formatAsPoints function
//       const formattedResponse = {
//         monthly_task: formatAsPoints(parsedResponse.monthly_task),
//         weekly_task: formatAsPoints(parsedResponse.weekly_task),
//         supportive_hints: formatAsPoints(parsedResponse.supportive_hints),
//       };

//       res.json(formattedResponse); // Return the formatted response
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       res.status(500).json({
//         error: "Invalid JSON format received from AI.",
//         rawResponse: cleanedContent,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       details: error.message,
//     });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

