import ProfilePage from "./ProfilePage";
import { getSession } from "@/lib/getSession";

export default async function page() {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  const userId = session?.user?.id;
  return (
    <>
      <ProfilePage userId={userId} />
    </>
  );
}
