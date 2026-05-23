import AdminPanel from "./AdminPanel";
import { getCachedCount, getUsedCount } from "@/lib/reviews-cache";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let initialCount = 0;
  let initialUsedCount = 0;
  try {
    [initialCount, initialUsedCount] = await Promise.all([
      getCachedCount(),
      getUsedCount(),
    ]);
  } catch {
    // Redis not configured — admin panel will show the error on generate.
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin — Generate Reviews</h1>
          <p className="text-gray-500 text-sm mt-1">
            Generate fresh AI reviews and add them to the cache. Takes 6–10 seconds.
          </p>
        </div>

        <AdminPanel initialCount={initialCount} initialUsedCount={initialUsedCount} />
      </div>
    </main>
  );
}
