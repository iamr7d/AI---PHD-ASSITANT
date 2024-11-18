const axios = require('axios');
const cheerio = require('cheerio');
const { convert } = require('html-to-text');

async function scrapeWebsite(url) {
  try {
    console.log('Starting website scrape:', url);
    
    // Validate URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Fetch webpage
    console.log('Fetching webpage...');
    const response = await axios.get(url);
    const html = response.data;
    console.log('Webpage fetched successfully');

    // Load HTML into cheerio
    const $ = cheerio.load(html);
    console.log('HTML loaded into cheerio');

    // Extract text content
    const pageText = convert(html, {
      wordwrap: 130,
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a.skip-link', format: 'skip' }
      ]
    });
    console.log('Text content extracted');

    // Initialize professor info
    let professorInfo = {
      name: '',
      title: '',
      department: '',
      email: '',
      research: '',
      publications: ''
    };

    // Extract name (look for common patterns)
    console.log('Extracting professor information...');
    const nameSelectors = ['h1', '.faculty-name', '.profile-name', '[itemprop="name"]'];
    for (const selector of nameSelectors) {
      const name = $(selector).first().text().trim();
      if (name) {
        professorInfo.name = name;
        break;
      }
    }

    // Extract title
    const titleSelectors = ['.faculty-title', '.profile-title', '[itemprop="jobTitle"]'];
    for (const selector of titleSelectors) {
      const title = $(selector).first().text().trim();
      if (title) {
        professorInfo.title = title;
        break;
      }
    }

    // Extract department
    const deptSelectors = ['.department', '.faculty-department', '[itemprop="department"]'];
    for (const selector of deptSelectors) {
      const dept = $(selector).first().text().trim();
      if (dept) {
        professorInfo.department = dept;
        break;
      }
    }

    // Extract email (with basic obfuscation handling)
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    $('body').find('*').each((i, element) => {
      const text = $(element).text();
      const match = text.match(emailRegex);
      if (match && !professorInfo.email) {
        professorInfo.email = match[0];
      }
    });

    // Extract research interests
    const researchSelectors = [
      '#research', 
      '.research-interests', 
      '.research', 
      'h2:contains("Research")', 
      'h3:contains("Research")'
    ];
    
    for (const selector of researchSelectors) {
      const element = $(selector);
      if (element.length) {
        // Get the next paragraph or div after the heading
        const research = element.next('p, div').text().trim() || element.parent().text().trim();
        if (research) {
          professorInfo.research = research;
          break;
        }
      }
    }

    // Extract publications
    const pubSelectors = [
      '#publications', 
      '.publications', 
      'h2:contains("Publications")', 
      'h3:contains("Publications")'
    ];
    
    for (const selector of pubSelectors) {
      const element = $(selector);
      if (element.length) {
        // Get the next list or div after the heading
        const pubs = element.next('ul, ol, div').text().trim() || element.parent().text().trim();
        if (pubs) {
          professorInfo.publications = pubs;
          break;
        }
      }
    }

    // If research or publications are empty, try to extract from page text
    if (!professorInfo.research || !professorInfo.publications) {
      const paragraphs = pageText.split('\n\n');
      for (const para of paragraphs) {
        if (!professorInfo.research && 
            (para.toLowerCase().includes('research') || 
             para.toLowerCase().includes('interests'))) {
          professorInfo.research = para;
        }
        if (!professorInfo.publications && 
            (para.toLowerCase().includes('publication') || 
             para.toLowerCase().includes('paper'))) {
          professorInfo.publications = para;
        }
      }
    }

    console.log('Scraping completed. Professor info:', professorInfo);
    return professorInfo;
  } catch (error) {
    console.error('Error in scrapeWebsite:', error);
    throw new Error(`Failed to scrape website: ${error.message}`);
  }
}

module.exports = {
  scrapeWebsite
};
