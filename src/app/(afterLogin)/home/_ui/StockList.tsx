import StockItem from "./StockItem";

/**
 * 주식 종목 리스트
 */
export default function StockList() {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <li key={index}>
            <StockItem />
          </li>
        ))}
      </ul>
    </>
  );
}
