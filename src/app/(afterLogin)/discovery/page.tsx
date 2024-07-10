import SearchInput from "./_components/SearchInput";
import RecentSearches from "./_components/RecentSearches";
import PopularSearches from "./_components/PopularSearches";
import { getPopularSearches } from "@/hooks/discovery/useGetSearchData";

export default async function searchPage() {
  //인기 검색어 리스트 가져오기
  const PopularSearchData = await getPopularSearches();
  console.log(PopularSearchData);
  return (
    <div className=" w-[590px] h-[896px] flex flex-col relative gap-8  mx-auto mt-[56px]">
      {/* 검색창 */}
      <SearchInput />
      {/* 최근검색어 */}
      <RecentSearches />
      {/* 인기검색어 */}
      <PopularSearches PopularSearchData={PopularSearchData} />
    </div>
  );
}
