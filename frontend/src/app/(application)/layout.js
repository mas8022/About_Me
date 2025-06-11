import BottomBar from "@/components/shared/BottomBar";
import AuthGuard from "../../providers/AuthGuard";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthGuard>
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BottomBar />
      </AuthGuard>
    </div>
  );
}
