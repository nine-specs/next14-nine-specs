import Title from "../_ui/Title";
import PopularNewsItem from "./PopularNewsItem";

export default function PopularNews() {
  return (
    <>
      <section className="w-full mb-12">
        <Title title="오늘 인기있는 뉴스" />
        <ul className="grid grid-cols-2 grid-rows-2 gap-4 h-full max-h-[420px]">
          {Array.from({ length: 3 }, (_, index) => (
            <li
              key={index}
              className={`${
                index === 0 ? "row-span-2 h-[420px]" : "h-[200px]"
              } ${index === 2 ? "col-start-2" : ""}`}
            >
              <PopularNewsItem index={index} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
