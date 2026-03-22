interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
}

export function RatingDisplay({ rating, maxRating = 5 }: RatingDisplayProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-2.5 rounded-full ${
            i < rating ? 'bg-brand-gold' : 'bg-brand-brown/10'
          }`}
        />
      ))}
    </div>
  );
}
