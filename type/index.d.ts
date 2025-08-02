declare interface GeneratePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}