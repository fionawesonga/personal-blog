import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import DeletePostButton from "@/app/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      tags: true,
      _count: { select: { comments: true, likes: true } },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-neutral-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-5 py-3 text-sm text-neutral-400 font-medium">Title</th>
              <th className="text-left px-5 py-3 text-sm text-neutral-400 font-medium">Status</th>
              <th className="text-left px-5 py-3 text-sm text-neutral-400 font-medium">Views</th>
              <th className="text-left px-5 py-3 text-sm text-neutral-400 font-medium">Date</th>
              <th className="text-right px-5 py-3 text-sm text-neutral-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-white font-medium">{post.title}</p>
                  <p className="text-neutral-400 text-sm">/{post.slug}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    post.published
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-4 text-neutral-300">{post.views}</td>
                <td className="px-5 py-4 text-neutral-400 text-sm">{formatDate(post.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeletePostButton postId={post.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}