import React, {Suspense} from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import {getBlogPostList} from "@/helpers/file-helpers";
import Spinner from "@/components/Spinner";
import {BLOG_TITLE} from "@/constants";

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
}

function Home() {

return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>
      <Suspense fallback={<Spinner />}>
        <BlogList />
      </Suspense>
    </div>
  );
}

const BlogList = async () => {
  const blogList = await getBlogPostList()
  return <>
    {blogList.map(({slug, title, abstract, publishedOn}) => (
      <BlogSummaryCard
        key={slug}
        slug={slug}
        title={title}
        abstract={abstract}
        publishedOn={publishedOn}
      />
    ))}
  </>
}

export default Home;
