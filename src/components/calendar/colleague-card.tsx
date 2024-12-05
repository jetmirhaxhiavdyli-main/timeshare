import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

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
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white">
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
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ColleagueCard;
