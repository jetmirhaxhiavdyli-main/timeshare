import { useState, useMemo, FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import countriesWithTimezones from "@/lib/countries-with-timezones";
import Image from "next/image";

interface AddColleagueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddColleague: (colleague: { 
    name: string; 
    profilePicture: string; 
    country: string; 
    timezone: string;
  }) => void;
}

export const AddColleagueDialog: FC<AddColleagueDialogProps> = ({ open, onOpenChange, onAddColleague }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openCountrySelect, setOpenCountrySelect] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) {
      return countriesWithTimezones.slice(0, 5);
    }
    return countriesWithTimezones.filter(country => 
      country.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const selectedCountryData = countriesWithTimezones.find((country) => country.value === selectedCountry);
    if (!selectedCountryData) return;

    onAddColleague({
      name: fullName,
      profilePicture: imageUrl || '',
      country: selectedCountryData.label,
      timezone: selectedTimezone,
    });

    // Reset form
    setSelectedCountry("");
    setSelectedTimezone("");
    setImageUrl("");
    setFullName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Colleague</DialogTitle>
          <DialogDescription>
            Add a colleague to see their local time and schedule meetings accordingly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Profile Image Upload */}
          <div className="grid gap-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full border-2 border-gray-200 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="max-w-[250px]"
              />
            </div>
          </div>

          {/* Full Name Input */}
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Enter full name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Country and Timezone Select */}
          <div className="grid gap-2">
            <Label>Country and Timezone</Label>
            <Popover open={openCountrySelect} onOpenChange={setOpenCountrySelect}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCountrySelect}
                  className="w-full justify-between"
                >
                  {selectedCountry
                    ? `${countriesWithTimezones.find((country) => country.value === selectedCountry)?.label} (${selectedTimezone})`
                    : "Select country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search country..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <div key={country.value}>
                        {country.timezones.map((timezone) => (
                          <CommandItem
                            key={`${country.value}-${timezone}`}
                            onSelect={() => {
                              setSelectedCountry(country.value);
                              setSelectedTimezone(timezone);
                              setOpenCountrySelect(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country.value && selectedTimezone === timezone
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div>
                              <div>{country.label}</div>
                              <div className="text-sm text-gray-500">{timezone}</div>
                            </div>
                          </CommandItem>
                        ))}
                      </div>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button 
            className="mt-4"
            onClick={handleSubmit}
            disabled={!fullName || !selectedCountry || !selectedTimezone}
          >
            Add Colleague
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
