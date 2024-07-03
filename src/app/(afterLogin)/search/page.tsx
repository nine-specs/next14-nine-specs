import SearchInput from "./_components/SearchInput";
import RecentSearches from "./_components/RecentSearches";
import PopularSearches from "./_components/PopularSearches";
import { getRecentSearches } from "@/hooks/search/useGetSearchData";

export default async function searchPage() {
  const recentSearchData = await getRecentSearches();

  return (
    <div className=" w-[590px] h-[896px] flex flex-col relative gap-8  mx-auto mt-[56px]">
      {/* 검색창 */}
      <SearchInput />
      {/* 최근검색어 */}
      <RecentSearches recentSearchData={recentSearchData} />
      {/* 인기검색어 */}
      <PopularSearches />
    </div>
  );
}
