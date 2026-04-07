import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Clock, Eye } from "lucide-react";
import CommentSection from "@/app/components/blog/CommentSection";
import LikeButton from "@/app/components/blog/LikeButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      tags: true,
      comments: {
        where: { approved: true },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { likes: true } },
    },
  });

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag.id} className="text-xs text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full">
            {tag.name}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-800">
        <span>{formatDate(post.createdAt)}</span>
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {post.readingTime} min read
        </span>
        <span className="flex items-center gap-1">
          <Eye size={13} />
          {post.views.toLocaleString()} views
        </span>
        <div className="ml-auto">
          <LikeButton postId={post.id} initialCount={post._count.likes} />
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-neutral max-w-none prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Bottom like */}
      <div className="mt-12 pt-8 border-t border-neutral-800 flex items-center justify-between">
        <p className="text-neutral-400 text-sm">Did you enjoy this post?</p>
        <LikeButton postId={post.id} initialCount={post._count.likes} />
      </div>

      {/* Comments */}
      <CommentSection postId={post.id} initialComments={post.comments as any} />
    </article>
  );
}