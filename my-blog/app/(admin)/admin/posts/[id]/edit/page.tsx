import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "@/app/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { tags: true },
  });

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Edit Post</h1>
      <PostForm initialData={post} />
    </div>
  );
}