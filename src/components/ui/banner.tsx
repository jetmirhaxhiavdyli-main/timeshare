import { X } from 'lucide-react';
import { Button } from './button';

interface BannerProps {
  onClose: () => void;
}

export function Banner({ onClose }: BannerProps) {
  return (
    <div className="bg-[#020817] w-full">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-start justify-between">
        <div className="space-y-1.5">
          <h2 className="font-semibold text-lg text-white">Welcome to TimeShare!</h2>
          <p className="text-sm text-gray-300 max-w-2xl">
            TimeShare helps you collaborate across time zones by visualizing your colleagues' working hours. 
            Add your team members and see their local time, making it easier to schedule meetings and 
            coordinate work globally. Share this calendar with your team to help everyone stay in sync!
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-white hover:text-white/80"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
