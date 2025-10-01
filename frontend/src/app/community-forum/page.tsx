'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, Image as ImageIcon, Send, TrendingUp } from 'lucide-react';

// Mock data for forum posts
const MOCK_POSTS = [
  {
    id: 1,
    author: 'Kwame Mensah',
    avatar: '/avatars/farmer1.png',
    location: 'Kumasi',
    date: '2 hours ago',
    title: 'Success with drought-resistant maize',
    content: 'I tried the new drought-resistant maize variety this season and the results are amazing! Even with the reduced rainfall, my yield increased by 30%. Has anyone else tried this variety?',
    likes: 24,
    comments: 8,
    tags: ['Maize', 'Success Story', 'Drought Resistant']
  },
  {
    id: 2,
    author: 'Ama Owusu',
    avatar: '/avatars/farmer2.png',
    location: 'Tamale',
    date: '1 day ago',
    title: 'Help with tomato leaf disease',
    content: 'My tomato plants have yellow spots on the leaves and they\'re starting to curl. I\'ve attached a photo. Has anyone seen this before? What treatment would you recommend?',
    image: '/forum/tomato-disease.jpg',
    likes: 12,
    comments: 15,
    tags: ['Tomatoes', 'Plant Disease', 'Help Needed']
  },
  {
    id: 3,
    author: 'Kofi Boateng',
    avatar: '/avatars/farmer3.png',
    location: 'Accra',
    date: '3 days ago',
    title: 'Market prices for cassava in Accra',
    content: 'I\'m planning to harvest my cassava next week. Can anyone share the current market prices in Accra? Is it better to sell now or wait a few more weeks?',
    likes: 18,
    comments: 22,
    tags: ['Cassava', 'Market Prices', 'Harvest']
  }
];

// Mock data for trending topics
const TRENDING_TOPICS = [
  {
    id: 1,
    title: 'Dealing with Fall Armyworm',
    posts: 45,
    summary: 'Farmers are sharing effective methods to control Fall Armyworm infestations in maize crops. Popular solutions include early detection, natural predators, and targeted pesticide application.'
  },
  {
    id: 2,
    title: 'Irrigation techniques for dry season',
    posts: 38,
    summary: 'Discussion on cost-effective irrigation methods during the dry season. Drip irrigation and water conservation practices are being recommended by experienced farmers.'
  },
  {
    id: 3,
    title: 'New government subsidy program',
    posts: 62,
    summary: 'Information sharing about the new fertilizer subsidy program. Farmers are discussing application processes, eligibility criteria, and sharing experiences with the registration system.'
  }
];

export default function CommunityForumPage() {
  const [activeTab, setActiveTab] = useState('all-posts');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle post submission
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the post data to the server
    console.log('Submitting post:', { title: newPostTitle, content: newPostContent, image: selectedImage });
    
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setSelectedImage(null);
    setImagePreview(null);
    
    // Switch to all posts tab to see the "new" post
    setActiveTab('all-posts');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">SmartFarmGH Community Forum</h1>
      
      <div className="max-w-5xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-posts">All Posts</TabsTrigger>
            <TabsTrigger value="create-post">Create Post</TabsTrigger>
            <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-posts" className="mt-6">
            <div className="space-y-6">
              {MOCK_POSTS.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author}</div>
                          <div className="text-sm text-muted-foreground">{post.location} • {post.date}</div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="mt-3">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.content}</p>
                    {post.image && (
                      <div className="mt-3 mb-4">
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="rounded-md max-h-80 w-auto"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">View Discussion</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="create-post" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Share with the Community</CardTitle>
                <CardDescription>
                  Post your farming experiences, questions, or success stories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div>
                    <label htmlFor="post-title" className="block text-sm font-medium mb-1">
                      Post Title
                    </label>
                    <Input
                      id="post-title"
                      placeholder="Give your post a descriptive title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="post-content" className="block text-sm font-medium mb-1">
                      Post Content
                    </label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your experience, question, or story..."
                      rows={6}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="post-image" className="block text-sm font-medium mb-1">
                      Add Image (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('post-image')?.click()}
                        className="flex items-center"
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Select Image
                      </Button>
                      <input
                        id="post-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                      {selectedImage && (
                        <span className="text-sm text-muted-foreground">
                          {selectedImage.name}
                        </span>
                      )}
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-60 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="post-tags" className="block text-sm font-medium mb-1">
                      Tags (Optional)
                    </label>
                    <Input
                      id="post-tags"
                      placeholder="Add tags separated by commas (e.g., Maize, Pest Control, Question)"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Post to Community
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-posts" className="mt-6">
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-medium">No Posts Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You haven't created any posts yet. Share your farming experiences, questions, or success stories with the community.
                </p>
                <Button onClick={() => setActiveTab('create-post')}>
                  Create Your First Post
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-6">
            <div className="space-y-6">
              {TRENDING_TOPICS.map(topic => (
                <Card key={topic.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        {topic.title}
                      </CardTitle>
                      <Badge variant="outline">{topic.posts} posts</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="text-sm font-medium mb-2">AI Summary</h3>
                      <p>{topic.summary}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Discussion</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}