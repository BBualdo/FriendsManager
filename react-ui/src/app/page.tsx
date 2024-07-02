import App from "@/components/App";
import RecoilProvider from "@/state/RecoilProvider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RecoilProvider>
        <App />
      </RecoilProvider>
    </main>
  );
}
