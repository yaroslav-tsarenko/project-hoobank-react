import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CTA from "../components/CTA";
import Avatar from "../components/ui/Avatar";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Container from "../components/ui/Container";
import Cover from "../components/ui/Cover";
import Icon from "../components/ui/Icon";
import { getPost, posts } from "../constants/blog";
import { useToast } from "../context/ToastContext";
import usePageMeta from "../hooks/usePageMeta";
import { formatDate } from "../lib/format";
import { PostCard } from "./Blog";
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
  return <div className="fixed top-0 left-0 h-[2px] bg-forest z-[95]" style={{ width: `${pct}%` }} aria-hidden="true" />;
};

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="font-serif text-[34px] leading-[1.15] text-ink mt-6">{block.text}</h2>;
    case "ul":
      return (
        <ul className="border-t border-line">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 py-3 border-b border-line font-sans text-ink text-[17px] leading-[1.6]">
              <span className="w-1.5 h-1.5 rounded-full bg-brass mt-[11px] shrink-0" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote className="border-l-2 border-brass pl-6 py-1 my-2 font-serif italic text-[30px] leading-[1.25] text-forest">“{block.text}”</blockquote>;
    default:
      return <p className="font-sans text-[18px] leading-[1.75] text-ink/85">{block.text}</p>;
  }
};

const PostContent = ({ post }) => {
  usePageMeta(post.title, post.excerpt);
  const toast = useToast();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const [saved, setSaved] = useState(false);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", description: "Paste it wherever you share reading." });
    } catch {
      toast({ title: "Could not copy the link", description: window.location.href, variant: "info" });
    }
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <Container className="pt-10 sm:pt-14 pb-10">
          <div className="max-w-[820px] mx-auto">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journal", to: "/blog" }, { label: post.category }]} />
            <h1 className="font-serif text-[42px] leading-[1.05] sm:text-[60px] text-ink">{post.title}</h1>
            <p className="font-sans text-[19px] leading-[1.6] text-muted mt-6">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line">
              <Avatar name={post.author.name} size="w-11 h-11 text-[14px]" />
              <div className="flex-1 min-w-[180px]">
                <p className="font-sans text-ink font-medium">{post.author.name}</p>
                <p className="font-sans text-muted text-[14px]">
                  {post.author.role} · {formatDate(post.date)} · {post.readTime} min read
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSaved((s) => !s)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save article"}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${saved ? "border-forest bg-forest text-ivory" : "border-line text-muted hover:text-ink hover:border-ink/40"}`}
              >
                <Icon name="book" size={17} />
              </button>
              <button type="button" onClick={share} aria-label="Copy link to article" className="w-10 h-10 rounded-full border border-line text-muted hover:text-ink hover:border-ink/40 flex items-center justify-center">
                <Icon name="copy" size={17} />
              </button>
            </div>
          </div>
        </Container>
        <Container>
          <div className="max-w-[1040px] mx-auto aspect-[21/9] rounded-card overflow-hidden border border-line">
            <Cover cover={post.cover} />
          </div>
        </Container>
        <Container className="py-14">
          <div className="max-w-[680px] mx-auto flex flex-col gap-6">
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
            <div className="pt-8 border-t border-line mt-8">
              <Link to="/blog" className="font-sans text-forest link inline-flex items-center gap-2">
                <Icon name="arrowLeft" size={16} /> All articles
              </Link>
            </div>
          </div>
        </Container>
      </article>
      <Container className="py-14 border-t border-line">
        <h2 className="font-serif text-[40px] leading-tight text-ink mb-10">Keep reading</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
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
