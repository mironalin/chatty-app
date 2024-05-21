import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "@/components/UserList";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Sidebar>
        <div className="h-full">
          <UserList isCollapsed={false} items={users} />
          {children}
        </div>
      </Sidebar>
    </ThemeProvider>
  );
}
