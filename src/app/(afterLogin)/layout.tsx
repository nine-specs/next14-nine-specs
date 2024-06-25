import ChatIconButton from "@/common/Chatbot/ChatIconButton";
import Header from "@/common/Header/Header";

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isLoggedIn />
      {children}
      <ChatIconButton />
    </>
  );
}
