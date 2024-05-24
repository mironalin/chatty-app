import { ThemeProvider } from "@/components/theme-toggle/theme-provider";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "@/components/conversations/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Sidebar>
        <div className="h-full">
          <ConversationList isCollapsed={false} initialItems={conversations} users={users} />
          {children}
        </div>
      </Sidebar>
    </ThemeProvider>
  );
}
