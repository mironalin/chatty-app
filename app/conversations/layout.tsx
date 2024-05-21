import { ThemeProvider } from "@/components/theme-toggle/theme-provider";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "@/components/conversations/ConversationList";
import getConversations from "../actions/getConversations";

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Sidebar>
        <div className="h-full">
          <ConversationList isCollapsed={false} initialItems={conversations} />
          {children}
        </div>
      </Sidebar>
    </ThemeProvider>
  );
}
