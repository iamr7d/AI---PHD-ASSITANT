const GROQ_API_ENDPOINT = 'https://api.groq.com/v1/chat/completions';

/**
 * Makes a request to the Groq API
 * @param {Object} messages - The messages to send to the API
 * @returns {Promise<Object>} The API response
 * @throws {Error} If the API request fails or the API key is missing
 */
async function makeGroqRequest(messages) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ API key is missing. Please check your environment variables.');
  }

  try {
    const response = await fetch(GROQ_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model: "mixtral-8x7b-32768",
        temperature: 0.3,
        max_tokens: 32768,
        top_p: 1,
        stream: false
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}

/**
 * Improves text using Groq's LLM capabilities
 * @param {string} text - The text to improve
 * @param {Object} options - Configuration options
 * @param {string} options.style - Writing style (e.g., 'academic', 'technical')
 * @param {string} options.tone - Tone of writing (e.g., 'formal', 'objective')
 * @param {string} options.focus - Area of improvement (e.g., 'clarity', 'conciseness')
 * @returns {Promise<string>} Improved text
 */
export async function improveText(text, options = {}) {
  const {
    style = 'academic',
    tone = 'formal',
    focus = 'clarity'
  } = options;

  try {
    const completion = await makeGroqRequest([
      {
        role: "system",
        content: `You are an expert academic writing assistant. Improve the following text to be more ${style} in style, 
                 maintaining a ${tone} tone, focusing on ${focus}. Preserve the original meaning while enhancing the writing quality.`
      },
      {
        role: "user",
        content: text
      }
    ]);

    return completion.choices[0]?.message?.content || text;
  } catch (error) {
    console.error('Error improving text:', error);
    throw new Error('Failed to improve text. Please try again later.');
  }
}

/**
 * Suggests improvements for academic writing
 * @param {string} text - The text to analyze
 * @returns {Promise<Object>} Suggestions for improvement
 */
export async function analyzePaper(text) {
  try {
    const completion = await makeGroqRequest([
      {
        role: "system",
        content: `You are an expert academic writing assistant. Analyze the following text and provide specific suggestions
                 for improvement in these categories:
                 1. Structure and Organization
                 2. Language and Style
                 3. Academic Conventions
                 4. Citations and References (if applicable)
                 Provide actionable, specific feedback that helps improve the academic quality of the writing.`
      },
      {
        role: "user",
        content: text
      }
    ]);

    const analysis = completion.choices[0]?.message?.content;
    return {
      suggestions: analysis,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error analyzing paper:', error);
    throw new Error('Failed to analyze paper. Please try again later.');
  }
}

/**
 * Checks academic writing for potential issues
 * @param {string} text - The text to check
 * @returns {Promise<Object>} Issues found in the text
 */
export async function checkWriting(text) {
  try {
    const completion = await makeGroqRequest([
      {
        role: "system",
        content: `You are an expert academic writing assistant. Check the following text for:
                 1. Grammar and spelling issues
                 2. Academic style consistency
                 3. Passive voice usage
                 4. Wordiness and redundancy
                 5. Technical terminology accuracy
                 Provide specific examples and suggestions for improvement.`
      },
      {
        role: "user",
        content: text
      }
    ]);

    const checkResults = completion.choices[0]?.message?.content;
    return {
      issues: checkResults,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error checking writing:', error);
    throw new Error('Failed to check writing. Please try again later.');
  }
}
