interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
}

export function RatingDisplay({ rating, maxRating = 5 }: RatingDisplayProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <span
          key={i}
          className={`text-xl ${
            i < rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}
