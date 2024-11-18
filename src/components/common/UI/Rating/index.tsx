import Star from "../Star";

interface RatingPointProps {
  point: number | undefined;
  size: number;
}

 const Rating = ({ point = 0, size }: RatingPointProps) => {
  if (point < 0 || point > 5) {
    console.log("Invalid rating point");
    return;
  }

  const ratedStars = Array.from({ length: point }, (_, index) => (
    <Star key={index} isRated={true} size={size} />
  ));

  const unratedStars = Array.from({ length: 5 - point }, (_, index) => (
    <Star key={index + point} isRated={false} size={size} />
  ));

  return <ul>{[...ratedStars, ...unratedStars]}</ul>;
};

export default Rating;
