import React from 'react';
import Image from 'next/image';

interface ColleagueCardProps {
  name: string;
  profilePicture: string;
  country: string;
  timezone: string;
  hourDifference: number;
  onRemove: () => void;
}

const ColleagueCard: React.FC<ColleagueCardProps> = ({
  name,
  profilePicture,
  country,
  timezone,
  hourDifference,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md">
      <div className="flex items-center">
        <Image
          src={profilePicture}
          alt="Profile Picture"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{country}</p>
          <p className="text-sm text-gray-600">Timezone: {timezone}</p>
          <p className="text-sm text-gray-600">Hour Difference: {hourDifference} hrs</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default ColleagueCard;
