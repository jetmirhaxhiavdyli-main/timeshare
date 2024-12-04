import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { AddColleagueDialog } from "../dialogs/add-colleague-dialog";
import { v4 as uuidv4 } from 'uuid';
import { Colleague } from "@/components/calendar/colleagues-list";

interface NavbarProps {
  calendarId: string;
  calendarName: string;
  onAddColleague?: (colleague: Colleague) => void;
}

export default function Navbar({ calendarId, calendarName, onAddColleague }: NavbarProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddColleague = (newColleague: { name: string; profilePicture: string; country: string; timezone: string }) => {
    const now = new Date();
    
    // Calculate hour difference (simplified version)
    const userOffset = now.getTimezoneOffset();
    const colleagueOffset = new Date().getTimezoneOffset(); // This should be based on colleague's timezone
    const hourDifference = Math.round((colleagueOffset - userOffset) / 60);

    const newColleagueWithId: Colleague = {
      id: uuidv4(),
      ...newColleague,
      hourDifference,
    };

    if (onAddColleague) {
      onAddColleague(newColleagueWithId);
    }
    setDialogOpen(false);
  };

  const copyShareableLink = () => {
    navigator.clipboard.writeText(calendarId);
    toast.success('Calendar ID copied to clipboard');
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{calendarName}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>ID:</span>
              <span>{calendarId}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={copyShareableLink}
              >
                Share Link
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setDialogOpen(true)}
            >
              Add Colleague
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/auth')}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <AddColleagueDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddColleague={handleAddColleague}
      />
    </>
  );
}
