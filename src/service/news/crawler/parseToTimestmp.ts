export default function parseToTimestamp(creationTime: string): number {
  // `creationTime` 형식 예제: "2024.07.12. 오전 9:57" 또는 "2024.07.12. 09:57"
  const datePatternWithPeriod = /(\d{4})\.(\d{2})\.(\d{2})\. (\S+) (\d{1,2}):(\d{2})/;
  const datePatternWithoutPeriod = /(\d{4})\.(\d{2})\.(\d{2})\. (\d{1,2}):(\d{2})/;

  let match = creationTime.match(datePatternWithPeriod);
  let hour: number;

  if (match) {
    // "오전" 또는 "오후"가 있는 경우
    const [_, year, month, day, period, hourStr, minute] = match;
    hour = parseInt(hourStr, 10);

    // '오전' 또는 '오후' 처리
    if (period === "오후" && hour < 12) {
      hour += 12;
    } else if (period === "오전" && hour === 12) {
      hour = 0;
    }

    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1, // 월은 0부터 시작
      parseInt(day, 10),
      hour,
      parseInt(minute, 10),
    ).getTime();
  } else {
    match = creationTime.match(datePatternWithoutPeriod);

    if (!match) {
      throw new Error("Invalid date format");
    }

    // "오전" 또는 "오후"가 없는 경우
    const [_, year, month, day, hourStr, minute] = match;
    hour = parseInt(hourStr, 10);

    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1, // 월은 0부터 시작
      parseInt(day, 10),
      hour,
      parseInt(minute, 10),
    ).getTime();
  }
}
