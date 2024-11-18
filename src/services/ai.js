const API_BASE_URL = 'http://localhost:3007/api';

/**
 * AI Service for Writing Assistance
 */

export const getWritingAssistance = async (content, prompt) => {
  try {
    const response = await fetch(`${API_BASE_URL}/writing-assistance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get writing assistance');
    }

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error getting writing assistance:', error);
    throw error;
  }
};

export const getWritingSuggestions = async (content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/writing-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to get writing suggestions');
    }

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error getting writing suggestions:', error);
    throw error;
  }
};

export const getCitationSuggestions = async (content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/citation-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to get citation suggestions');
    }

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error getting citation suggestions:', error);
    throw error;
  }
};

export const getGrammarCheck = async (content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/grammar-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to check grammar');
    }

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error checking grammar:', error);
    throw error;
  }
};

export const getPlagiarismCheck = async (content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plagiarism-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to check plagiarism');
    }

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error checking plagiarism:', error);
    throw error;
  }
};
