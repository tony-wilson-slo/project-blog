'use server';

import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import { MDXRemote } from 'next-mdx-remote/rsc'
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";

const cacheBlogPost = React.cache(loadBlogPost);

export const generateMetadata = async ({params}) => {
  const { postSlug } = await params;
  const post = await cacheBlogPost(postSlug);
  const {frontmatter: {title, abstract} } = post
  return {
    title: title,
    description: abstract,
  }
}

const getLanguageFromPre = (children = {}) => {
  const child = children;  // we know there is only one
  if (child) {
    const childProps = child.props;
    if (childProps) {
      const className = childProps["className"];
      return  className?.includes('language-') ? className.replace('language-', '') : undefined;
    }
  }
}

const components = {
  pre: ({children}) => (<CodeSnippet lang={getLanguageFromPre(children)}>{children}</CodeSnippet>),
  DivisionGroupsDemo,
  CircularColorsDemo,
}

async function BlogPost({params}) {
  const { postSlug } = await params;
  const post = await cacheBlogPost(postSlug);
  const {content, frontmatter: {title, publishedOn} } = post

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
