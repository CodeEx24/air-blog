import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export default function PaginationControls({
  hasNextPage,
  onLoadMore,
}: PaginationControlsProps) {
  return (
    <>
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={onLoadMore}
            variant={"ghost"}
            className="text-lg text-orange-500 hover:text-orange-700"
          >
            See More...
          </Button>
        </div>
      )}
    </>
  );
}
