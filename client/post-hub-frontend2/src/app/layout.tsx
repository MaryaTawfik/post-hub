import { Sidebar } from "@/components/Sidebar"; // Adjust path if needed
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar is fixed, so it stays on the left */}
            <Sidebar />

            {/* lg:ml-64 matches the sidebar width (w-64). 
              This "pushes" the content to the right so it's not covered.
            */}
            <main className="flex-1 transition-all duration-300 lg:ml-64 p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}