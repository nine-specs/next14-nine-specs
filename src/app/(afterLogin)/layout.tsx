import Chatbot from "@/common/Chatbot/Chatbot";
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
      <Chatbot />
    </>
  );
}
