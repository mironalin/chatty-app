import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Sidebar>
        <div className="h-full">{children}</div>
      </Sidebar>
    </ThemeProvider>
  );
}
