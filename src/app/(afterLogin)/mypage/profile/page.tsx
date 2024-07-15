import { GetUser } from "@/hooks/profile/useGetUser";
import ProfilePage from "./ProfilePage";

export default async function page() {
  const userData = await GetUser();
  return (
    <>
      <ProfilePage userData={userData} />
    </>
  );
}
