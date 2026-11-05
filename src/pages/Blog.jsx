import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import NewsletterForm from "../components/widgets/NewsletterForm";
import { blogCategories, posts } from "../constants/blog";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const PostCard = ({ post, large = false }) => (
  <Link to={`/blog/${post.slug}`} className={`group flex ${large ? "md:flex-row" : ""} flex-col rounded-[24px] overflow-hidden border border-white/5 bg-white/[0.02] lift h-full`}>
    <div className={`relative ${large ? "md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[320px]" : "aspect-[16/10]"} overflow-hidden`} style={{ background: post.cover }}>
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <span className="absolute left-5 top-5 rounded-full bg-primary/70 backdrop-blur px-3 py-1 font-poppins text-[12px] text-white">{post.category}</span>
      <span className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-white/20 blur-2xl group-hover:scale-125 transition-transform duration-700" aria-hidden="true" />
    </div>
    <div className={`flex flex-col p-6 ${large ? "md:w-1/2 md:p-10 justify-center" : "flex-1"}`}>
      <p className="font-poppins text-[13px] text-dimWhite">
        {formatDate(post.date)} · {post.readTime} min read
      </p>
      <h3 className={`font-poppins font-semibold text-white mt-2 group-hover:text-secondary transition-colors ${large ? "text-[28px] leading-[38px]" : "text-[20px] leading-[30px]"}`}>{post.title}</h3>
      <p className="font-poppins text-dimWhite text-[15px] leading-[25px] mt-3">{post.excerpt}</p>
      <div className="flex items-center gap-3 mt-auto pt-6">
        <img src={post.author.img} alt="" loading="lazy" width="36" height="36" className="w-9 h-9 rounded-full" />
        <span className="font-poppins text-[14px] text-white">{post.author.name}</span>
        <Icon name="arrowRight" size={18} className="ml-auto text-secondary group-hover:translate-x-1 transition" />
      </div>
    </div>
  </Link>
);

const Blog = () => {
  usePageMeta("Blog", "Money tips, product news and security advice from the HooBank team.");
  const [cat, setCat] = useState("All");
  const featured = posts.find((p) => p.featured);
  const list = posts.filter((p) => (cat === "All" || p.category === cat) && (cat !== "All" || !p.featured));

  return (
    <>
      <PageHero eyebrow="The HooBank Journal" title="Smarter money," highlight="one story at a time." description="Practical guides, product news and security advice from the team." />
      <Container className="pb-10">
        {featured && cat === "All" && (
          <Reveal className="mb-12">
            <PostCard post={featured} large />
          </Reveal>
        )}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
          {blogCategories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`${styles.chip} ${cat === c ? styles.chipActive : styles.chipIdle}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
        {list.length === 0 && <p className={`${styles.paragraph} text-center py-12`}>No articles in this category yet.</p>}
        <Reveal className={`${styles.card} p-8 sm:p-12 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}>
          <div>
            <h2 className={styles.heading3}>Get the best stories in your inbox</h2>
            <p className={`${styles.paragraph} mt-3`}>Two emails a month. Unsubscribe any time.</p>
          </div>
          <NewsletterForm />
        </Reveal>
      </Container>
    </>
  );
};

export default Blog;
