import { GetUser } from "@/hooks/profile/useGetUser";
import ProfilePage from "./ProfilePage";
import { getSession } from "@/lib/getSession";
import { TUser } from "@/app/api/profile/route";

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
