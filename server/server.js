const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3001;

// Supabase configuration
const supabaseUrl = 'https://ohwrnqxwallbiocjqqsf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3JucXh3YWxsYmlvY2pxcXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTc4MTUsImV4cCI6MjA2NTU5MzgxNX0.TPTSNBU9EFwBoSEEbAwefReIzmjOWsFXyyrgS2M8idA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST new post
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, author }])
      .select();

    if (error) throw error;
    res.json({ message: 'Post created successfully', post: data[0] });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});