import { is } from "date-fns/locale";
import React, { useState } from "react";

interface HeartProps {
  isFavorite: boolean;
  onClick: (newState: boolean) => void;
}

const Heart: React.FC<HeartProps> = ({ isFavorite, onClick }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const handleOnClickFavorite = () => {
    const newFavoriteState = !isFavoriteState;
    setIsFavoriteState(newFavoriteState);
    onClick(newFavoriteState);
  }

  return (
    <div onClick={handleOnClickFavorite}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.4565 7.66892C23.1565 6.26267 22.669 5.10017 21.8065 4.18142C20.5878 2.83142 18.994 2.17517 17.1003 2.17517H16.8565C14.8503 2.23142 13.2003 3.03767 12.0378 4.50017C11.6065 4.01267 11.0628 3.52517 10.444 3.15017C9.22527 2.41892 7.81902 2.11892 6.22527 2.23142C4.46277 2.41892 3.05652 3.20642 2.00652 4.50017C0.900272 5.96267 0.356522 7.61267 0.412772 9.31892C0.469022 10.9127 0.956522 12.3752 1.87527 13.7814C2.90652 15.3752 4.20027 16.5939 5.36277 17.5689C7.01277 19.0314 8.90652 20.3252 11.2878 21.6564C11.5315 21.7877 11.719 21.8439 11.9628 21.8439C12.2065 21.8439 12.394 21.7877 12.6378 21.6564C14.719 20.4939 16.5378 19.2752 18.1878 17.8689C19.894 16.4627 21.1128 15.1127 22.0878 13.6502C23.4003 11.7564 23.8128 9.80642 23.4565 7.66892Z"
          fill={isFavoriteState ? '#EB5757' :'#DBDBDB' }
        />
      </svg>
    </div>
  );
};

export default Heart;