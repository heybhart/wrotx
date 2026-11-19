import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PreviewModalProvider } from './context/PreviewModalContext';
import { PreviewModal } from './components/PreviewModal';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ServiceLandingPage } from './pages/ServiceLandingPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SERVICE_PAGE_LIST } from './data/servicePagesData';
import { BLOG_POSTS } from './data/blogPostsData';

export default function App() {
  return (
    <ThemeProvider>
      <PreviewModalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {SERVICE_PAGE_LIST.map((page) => (
              <Route
                key={page.slug}
                path={page.slug}
                element={<ServiceLandingPage page={page} />}
              />
            ))}
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {BLOG_POSTS.map((post) => (
              <Route
                key={post.path}
                path={post.path}
                element={<BlogPostPage post={post} />}
              />
            ))}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
        <PreviewModal />
      </PreviewModalProvider>
    </ThemeProvider>
  );
}
