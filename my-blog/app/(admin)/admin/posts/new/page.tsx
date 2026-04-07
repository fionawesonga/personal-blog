import PostForm from "@/app/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">New Post</h1>
      <PostForm />
    </div>
  );
}