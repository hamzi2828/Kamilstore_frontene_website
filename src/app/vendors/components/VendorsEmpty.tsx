import { Search } from "lucide-react";

export default function VendorsEmpty() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <Search className="w-10 h-10 text-[#ddd] mb-4" />
      <p className="text-base font-semibold text-[#555] mb-1">No vendors found</p>
      <p className="text-sm text-[#999]">Try a different search term</p>
    </div>
  );
}
