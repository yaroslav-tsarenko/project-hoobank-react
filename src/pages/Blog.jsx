import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
import Container from "../components/ui/Container";
import Cover from "../components/ui/Cover";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import NewsletterForm from "../components/widgets/NewsletterForm";
import { blogCategories, posts } from "../constants/blog";
import usePageMeta from "../hooks/usePageMeta";
import { formatDate } from "../lib/format";
import styles from "../style";

export const PostCard = ({ post, large = false }) => (
  <Link to={`/blog/${post.slug}`} className={`group grid h-full ${large ? "grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center" : "grid-cols-1 gap-5 content-start"}`}>
    <div className={`relative overflow-hidden rounded-card border border-line ${large ? "md:col-span-7 aspect-[16/10]" : "aspect-[16/10]"}`}>
      <Cover cover={post.cover} className="transition-transform duration-700 group-hover:scale-[1.03]" />
    </div>
    <div className={large ? "md:col-span-5" : ""}>
      <p className="font-sans text-[13px] text-muted">
        <span className="uppercase tracking-[0.12em] text-brass-dark">{post.category}</span> · {formatDate(post.date)} · {post.readTime} min
      </p>
      <h3 className={`font-serif text-ink mt-3 group-hover:text-forest transition-colors ${large ? "text-[40px] leading-[1.08] sm:text-[48px]" : "text-[28px] leading-[1.15]"}`}>{post.title}</h3>
      <p className="font-sans text-muted text-[15px] leading-[1.6] mt-3">{post.excerpt}</p>
      <div className="flex items-center gap-3 mt-6">
        <Avatar name={post.author.name} size="w-8 h-8 text-[12px]" />
        <span className="font-sans text-[14px] text-ink">{post.author.name}</span>
        <Icon name="arrowRight" size={18} className="ml-auto text-muted group-hover:text-forest group-hover:translate-x-1 transition" />
      </div>
    </div>
  </Link>
);

const Blog = () => {
  usePageMeta("Journal", "Notes on tax, currencies, invoicing and security for freelancers and small teams, from the Northvault concept.");
  const [cat, setCat] = useState("All");
  const featured = posts.find((p) => p.featured);
  const list = posts.filter((p) => (cat === "All" || p.category === cat) && (cat !== "All" || !p.featured));

  return (
    <>
      <PageHero eyebrow="The Northvault journal" title="Notes on getting paid" highlight="and keeping it." description="Short, practical pieces on tax, currencies, invoicing and security for people who run their own practice." />
      <Container className="py-14 sm:py-20">
        {featured && cat === "All" && (
          <Reveal className="mb-16 pb-16 border-b border-line">
            <PostCard post={featured} large />
          </Reveal>
        )}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
          {blogCategories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`${styles.chip} ${cat === c ? styles.chipActive : styles.chipIdle}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
        {list.length === 0 && <p className={`${styles.lead} text-center py-12`}>No articles in this category yet.</p>}
        <Reveal className="mt-20 rounded-card bg-forest p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <h2 className="font-serif text-[40px] leading-[1.08] text-ivory">One letter a month, worth opening.</h2>
          <NewsletterForm tone="dark" title="Subscribe" text="Tax dates, currency notes and one practical idea. Unsubscribe in one click." />
        </Reveal>
      </Container>
    </>
  );
};

export default Blog;
