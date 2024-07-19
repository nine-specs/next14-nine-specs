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

  // const session = await getSession();

  // const user: TUser = await (
  //   await fetch("/api/profile", {
  //     method: "POST",
  //     body: JSON.stringify({ userId: session?.user?.id }),
  //   })
  // ).json();

  // const userData = await GetUser();

  return (
    <>
      <ProfilePage userId={userId} />
    </>
  );
}
