import StockItem from "./StockItem";

/**
 * 주식 종목 리스트
 */
export default function StockList() {
  return (
    <>
      <ul className="flex flex-col">
        {Array.from({ length: 4 }, (_, index) => (
          <li key={index} className="py-2">
            <StockItem />
          </li>
        ))}
      </ul>
    </>
  );
}
