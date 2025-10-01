const { OpenAI } = require('openai');
const { v4: uuidv4 } = require('uuid');

// Initialize OpenAI client (in production, use environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-development',
});

// Mock database for forum posts (in production, use a real database)
let posts = [];
let trendingTopics = [];

/**
 * Analyzes forum posts to identify trending topics and generate summaries
 * @returns {Promise<Array>} Array of trending topics with AI-generated summaries
 */
async function analyzeTrendingTopics() {
  try {
    // In production, this would query the database for post frequency by topic/tag
    
    // Group posts by tags and count occurrences
    const tagCounts = {};
    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (!tagCounts[tag]) {
          tagCounts[tag] = {
            count: 0,
            posts: []
          };
        }
        tagCounts[tag].count += 1;
        tagCounts[tag].posts.push({
          title: post.title,
          content: post.content
        });
      });
    });
    
    // Sort tags by count and take top 5
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5);
    
    // Generate AI summaries for each trending topic
    const newTrendingTopics = [];
    
    for (const [tag, data] of topTags) {
      // Skip if not enough posts
      if (data.count < 3) continue;
      
      // Prepare content for AI summarization
      const postsContent = data.posts
        .map(p => `Title: ${p.title}\nContent: ${p.content}`)
        .join('\n\n');
      
      let summary;
      
      try {
        // In production, use OpenAI to generate summary
        if (process.env.OPENAI_API_KEY) {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are an agricultural expert. Summarize the key points from these farmer forum posts about a specific topic. Keep your summary concise (30-50 words) and focus on practical advice or common themes."
              },
              {
                role: "user",
                content: `Topic: ${tag}\n\nPosts:\n${postsContent}`
              }
            ],
            max_tokens: 100
          });
          
          summary = response.choices[0].message.content;
        } else {
          // Mock summary for development
          summary = `Farmers are discussing ${tag.toLowerCase()} techniques, sharing experiences, and offering advice. Common themes include best practices, challenges, and innovative approaches.`;
        }
      } catch (error) {
        console.error(`Error generating summary for ${tag}:`, error);
        summary = `Discussion about ${tag.toLowerCase()} among farmers in the community.`;
      }
      
      newTrendingTopics.push({
        id: uuidv4(),
        title: tag,
        posts: data.count,
        summary
      });
    }
    
    // Update trending topics
    trendingTopics = newTrendingTopics;
    
    return trendingTopics;
  } catch (error) {
    console.error('Error analyzing trending topics:', error);
    return [];
  }
}

/**
 * Schedules periodic analysis of trending topics
 */
function scheduleTrendingAnalysis() {
  // Analyze trending topics every 6 hours
  setInterval(async () => {
    await analyzeTrendingTopics();
    console.log('Trending topics updated:', new Date());
  }, 6 * 60 * 60 * 1000);
  
  // Initial analysis
  analyzeTrendingTopics();
}

/**
 * Moderates post content using AI to detect inappropriate content
 * @param {string} content - The content to moderate
 * @returns {Promise<Object>} Moderation result
 */
async function moderateContent(content) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      // Mock moderation for development
      return { 
        flagged: false,
        categories: {}
      };
    }
    
    const response = await openai.moderations.create({
      input: content
    });
    
    return response.results[0];
  } catch (error) {
    console.error('Error moderating content:', error);
    return { 
      flagged: false,
      categories: {}
    };
  }
}

// Initialize the service
function initForumService() {
  // Load initial mock data
  posts = [
    {
      id: '1',
      author: {
        id: 'user1',
        name: 'Kwame Mensah',
        avatar: '/avatars/farmer1.png',
        location: 'Kumasi'
      },
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      title: 'Success with drought-resistant maize',
      content: 'I tried the new drought-resistant maize variety this season and the results are amazing! Even with the reduced rainfall, my yield increased by 30%. Has anyone else tried this variety?',
      image: null,
      likes: 24,
      comments: [
        {
          id: 'comment1',
          author: {
            id: 'user2',
            name: 'Ama Owusu',
            avatar: '/avatars/farmer2.png'
          },
          content: 'Yes, I tried it too! Great results in the Eastern Region.',
          createdAt: new Date(Date.now() - 3600000) // 1 hour ago
        }
      ],
      tags: ['Maize', 'Success Story', 'Drought Resistant']
    },
    {
      id: '2',
      author: {
        id: 'user2',
        name: 'Ama Owusu',
        avatar: '/avatars/farmer2.png',
        location: 'Tamale'
      },
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      title: 'Help with tomato leaf disease',
      content: 'My tomato plants have yellow spots on the leaves and they\'re starting to curl. I\'ve attached a photo. Has anyone seen this before? What treatment would you recommend?',
      image: '/forum/tomato-disease.jpg',
      likes: 12,
      comments: [],
      tags: ['Tomatoes', 'Plant Disease', 'Help Needed']
    }
  ];
  
  // Schedule trending analysis
  scheduleTrendingAnalysis();
}

module.exports = {
  initForumService,
  analyzeTrendingTopics,
  moderateContent,
  posts,
  trendingTopics
};