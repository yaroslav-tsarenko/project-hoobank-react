import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CTA } from "../components";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import { getPost, posts } from "../constants/blog";
import { useToast } from "../context/ToastContext";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";
import { formatDate, PostCard } from "./Blog";
import NotFound from "./NotFound";

const ReadingProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-[3px] bg-blue-gradient z-[95]" style={{ width: `${pct}%` }} aria-hidden="true" />;
};

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="font-poppins font-semibold text-white text-[26px] leading-[36px] mt-6">{block.text}</h2>;
    case "ul":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 font-poppins text-dimWhite text-[18px] leading-[30px]">
              <Icon name="check" size={18} className="text-secondary mt-[6px]" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-secondary pl-6 py-2 font-poppins text-[22px] leading-[34px] text-white italic">“{block.text}”</blockquote>
      );
    default:
      return <p className={styles.paragraph}>{block.text}</p>;
  }
};

const PostContent = ({ post }) => {
  usePageMeta(post.title, post.excerpt);
  const toast = useToast();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const [liked, setLiked] = useState(false);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", description: "Share it with someone who’ll love it." });
    } catch {
      toast({ title: "Couldn’t copy link", description: window.location.href, variant: "info" });
    }
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <Container className="pt-8 pb-10">
          <div className="max-w-[780px] mx-auto">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.category }]} />
            <h1 className={`${styles.heading1} text-[36px] leading-[48px] ss:text-[52px] ss:leading-[68px]`}>{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <img src={post.author.img} alt="" width="48" height="48" className="w-12 h-12 rounded-full" />
              <div className="flex-1 min-w-[160px]">
                <p className="font-poppins text-white font-medium">{post.author.name}</p>
                <p className="font-poppins text-dimWhite text-[14px]">
                  {post.author.role} · {formatDate(post.date)} · {post.readTime} min read
                </p>
              </div>
              <button type="button" onClick={() => setLiked((l) => !l)} aria-pressed={liked} aria-label={liked ? "Unlike article" : "Like article"} className={`w-11 h-11 rounded-full border flex items-center justify-center transition ${liked ? "border-accentPink text-accentPink bg-accentPink/10 scale-110" : "border-white/10 text-dimWhite hover:text-white"}`}>
                <Icon name="heart" size={18} />
              </button>
              <button type="button" onClick={share} aria-label="Copy link to article" className="w-11 h-11 rounded-full border border-white/10 text-dimWhite hover:text-white flex items-center justify-center">
                <Icon name="copy" size={18} />
              </button>
            </div>
          </div>
        </Container>
        <Container>
          <div className="max-w-[1000px] mx-auto aspect-[21/9] rounded-[24px] relative overflow-hidden" style={{ background: post.cover }}>
            <div className="absolute inset-0 grid-bg" aria-hidden="true" />
          </div>
        </Container>
        <Container className="py-12">
          <div className="max-w-[720px] mx-auto flex flex-col gap-6">
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
            <div className="flex flex-wrap gap-3 pt-8 border-t border-white/10 mt-6">
              <Link to="/blog" className="font-poppins text-secondary hover:underline flex items-center gap-2">
                <Icon name="arrowLeft" size={16} /> All articles
              </Link>
            </div>
          </div>
        </Container>
      </article>
      <Container className="py-12">
        <h2 className={`${styles.heading3} mb-8`}>Keep reading</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <CTA />
      </Container>
    </>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;
  return <PostContent key={post.slug} post={post} />;
};

export default BlogPost;
