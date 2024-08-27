// app/page.tsx (or app/page.js)
import { Suspense } from "react";
import Notes from "./Notes";
import Loading from "./Loading";

export default function Home() {
  return (
    <main className="bg-white flex gap-4 p-4 flex-wrap justify-between">
      <Suspense fallback={<Loading />}>
        <Notes />
      </Suspense>
    </main>
  );
}
