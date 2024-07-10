import { GetServerSideProps } from "next";
import ProfilePage from "./ProfilePage";
import { firestore } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetUser } from "@/hooks/profile/useGetUser";
import { TUser } from "@/app/api/profile/route";

export default function () {
  return (
    <>
      <ProfilePage />
    </>
  );
}
