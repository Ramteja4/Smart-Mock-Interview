export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { topic, numQuestions } = req.body;

      // Make sure we're using the requested number of questions
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates interview questions.",
          },
          {
            role: "user",
            content: `Generate ${numQuestions} interview questions about ${topic}. Return them in a JSON object with a 'questions' key containing an array of exactly ${numQuestions} question strings.`,
          },
        ],
        response_format: { type: "json_object" },
      });

      // Parse the response carefully
      const content = response.choices[0].message.content;
      let parsedQuestions = [];
      try {
        const responseData = JSON.parse(content);
        // Check if the response has a questions property
        if (responseData.questions && Array.isArray(responseData.questions)) {
          parsedQuestions = responseData.questions;
        } else if (Array.isArray(responseData)) {
          // If the model returned an array directly
          parsedQuestions = responseData;
        } else {
          // Fallback: extract any array we can find
          for (const key in responseData) {
            if (Array.isArray(responseData[key])) {
              parsedQuestions = responseData[key];
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error parsing response:", error, content);
      }

      // Ensure we have the exact number of questions requested
      parsedQuestions = parsedQuestions.slice(0, numQuestions);
      // If we don't have enough questions, add placeholders
      while (parsedQuestions.length < numQuestions) {
        parsedQuestions.push(
          `Additional question ${parsedQuestions.length + 1} about ${topic}`
        );
      }

      res.status(200).json({ questions: parsedQuestions });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to generate interview questions" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
