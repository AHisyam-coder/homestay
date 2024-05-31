import React from 'react';

interface Review {
  name: string;
  date: string;
  rating: number;
  title: string;
  details: string;
}

interface StarRatingProps {
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Pak Ali",
    date: "2024-05-25",
    rating: 5,
    title: "Servis mantap!",
    details: "Segala kelengakapan mencukupi untuk kami sekeluarga menetap. sangat la digalakkan untuk menyewa!"
  },
  {
    name: "Pak Ali",
    date: "2024-05-25",
    rating: 5,
    title: "Servis mantap!",
    details: "Segala kelengakapan mencukupi untuk kami sekeluarga menetap. sangat la digalakkan untuk menyewa!"
  },
  {
    name: "Pak Ali",
    date: "2024-05-25",
    rating: 5,
    title: "Servis mantap!",
    details: "Segala kelengakapan mencukupi untuk kami sekeluarga menetap. sangat la digalakkan untuk menyewa!"
  },
  {
    name: "Pak Ali",
    date: "2024-05-25",
    rating: 5,
    title: "Servis mantap!",
    details: "Segala kelengakapan mencukupi untuk kami sekeluarga menetap. sangat la digalakkan untuk menyewa!"
  },
  {
    name: "Pak Ali",
    date: "2024-05-25",
    rating: 5,
    title: "Servis mantap!",
    details: "Segala kelengakapan mencukupi untuk kami sekeluarga menetap. sangat la digalakkan untuk menyewa!"
  },
  {
    name: "Pak Ali",
    date: "2024-05-25",
    rating: 5,
    title: "Servis mantap!",
    details: "Segala kelengakapan mencukupi untuk kami sekeluarga menetap. sangat la digalakkan untuk menyewa!"
  },
  
];

function StarRating({ rating }: StarRatingProps) {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < rating ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-4 w-4 sm:h-5 sm:w-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27l5.18 2.73-1.64-5.3L21 9.27h-5.91L12 3.5 9.91 9.27H4l4.46 5.43-1.64 5.3L12 17.27z" />
          </svg>
        ))}
      </div>
    );
  }
  
  export default function Reviews() {
    return (
      <div className="p-4">
        {reviews.map((review, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b">
            <div>
              <p className="font-bold">{review.name}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <div className="flex items-center">
              <StarRating rating={review.rating} />
            </div>
            <div>
              <p className="font-semibold">{review.title}</p>
              <p>{review.details}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
