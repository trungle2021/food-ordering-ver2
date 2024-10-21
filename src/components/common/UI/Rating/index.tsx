import Star from "../Star";

interface RatingPointProps {
  ratingPoint: number | undefined;
  size: number;
}

 const Rating = ({ ratingPoint = 0, size }: RatingPointProps) => {
  if (ratingPoint < 0 || ratingPoint > 5) {
    console.log("Invalid rating point");
    return;
  }

  const ratedStars = Array.from({ length: ratingPoint }, (_, index) => (
    <Star key={index} isRated={true} size={size} />
  ));

  const unratedStars = Array.from({ length: 5 - ratingPoint }, (_, index) => (
    <Star key={index + ratingPoint} isRated={false} size={size} />
  ));

  return <ul>{[...ratedStars, ...unratedStars]}</ul>;
};

export default Rating;
