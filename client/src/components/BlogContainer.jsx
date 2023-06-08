import { useState, useEffect } from 'react';

import './Styles/BlogContainer.css'

function BlogContainer() {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:8000/blog');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        const getBlogs = async () => {
            const data = await fetchBlogs();
            setBlogs(data);
        };

        getBlogs();
    }, []);

    return (
        <div className="mindblog_container">
            {blogs.map((blog) => (
                <div key={blog._id} className="blog_container">
                    <p className="blog_title">{blog.title}</p>
                    <p className="blog_content">{blog.body}</p>
                    <p className='blog_fuente italic'>{blog.fuente}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogContainer;