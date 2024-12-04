import React from 'react';
import ColleagueCard from './colleague-card';

export interface Colleague {
  id: string;
  name: string;
  profilePicture: string;
  country: string;
  timezone: string;
  hourDifference: number;
}

interface ColleaguesListProps {
  colleagues: Colleague[];
  onRemoveColleague: (id: string) => void;
}

const ColleaguesList: React.FC<ColleaguesListProps> = ({
  colleagues,
  onRemoveColleague,
}) => {
  if (colleagues.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No colleagues added yet. Add colleagues to see their local time.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {colleagues.map((colleague) => (
        <ColleagueCard
          key={colleague.id}
          name={colleague.name}
          profilePicture={colleague.profilePicture}
          country={colleague.country}
          timezone={colleague.timezone}
          hourDifference={colleague.hourDifference}
          onRemove={() => onRemoveColleague(colleague.id)}
        />
      ))}
    </div>
  );
};

export default ColleaguesList;
