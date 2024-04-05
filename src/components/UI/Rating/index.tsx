import Star from "../Star";

interface RatingPointProps {
  ratingPoint: number | undefined;
  size: number;
}

export const Rating = ({ ratingPoint = 0, size }: RatingPointProps) => {
  const starArray = [];
  let key = 0;
  if (ratingPoint < 0 || ratingPoint > 5) {
    console.log("Invalid rating point");
    ratingPoint = 0;
  } else {
    for (let point = 0; point < ratingPoint; point++) {
      key++;
      starArray.push(<Star key={key} isRated={true} size={size} />);
    }
  }

  for (let totalStar = 0; totalStar < 5 - ratingPoint; totalStar++) {
    key++;
    starArray.push(<Star key={key} isRated={false} size={size} />);
  }

  return <ul>{starArray}</ul>;
};
