import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/debounce";
import { useCallback } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Search blogs"
      className="w-80"
      onChange={handleSearchChange}
    />
  );
}
