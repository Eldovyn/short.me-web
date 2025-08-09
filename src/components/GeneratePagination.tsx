import React from 'react';
import { Ellipsis } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

const GeneratePagination: React.FC<{ totalPages: number }> = ({ totalPages }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("current_page")) || 1;

    const isMd = useMediaQuery({ minWidth: 768 });

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("current_page", newPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const renderPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages.map((page, index) =>
            typeof page === 'number' ? (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[48px] h-[48px] px-4 rounded-[10px] border border-[#D9D9D9] transition-colors ${currentPage === page ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                >
                    {page}
                </button>
            ) : (
                <div
                    key={index}
                    className="flex justify-center items-center min-w-[48px] h-[48px] border border-[#D9D9D9] bg-white rounded-[10px]"
                >
                    <Ellipsis size={20} className="text-black" />
                </div>
            )
        );
    };

    if (isMd) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="min-w-[48px] h-[48px] px-4 bg-white border border-[#D9D9D9] text-black rounded-[10px] disabled:opacity-50"
                >
                    &#60;
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="min-w-[48px] h-[48px] px-4 bg-white border border-[#D9D9D9] text-black rounded-[10px] disabled:opacity-50"
                >
                    &#62;
                </button>
            </div>
        );
    }

    return (
            <div className="flex items-center justify-center space-x-5">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="min-w-[48px] h-[48px] px-4 bg-white text-black rounded-[10px] disabled:opacity-50"
                >
                    &#60;
                </button>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="min-w-[48px] h-[48px] px-4 bg-white text-black rounded-[10px] disabled:opacity-50"
                >
                    {currentPage}
                </button>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="min-w-[48px] h-[48px] px-4 bg-white text-black rounded-[10px] disabled:opacity-50"
                >
                    &#62;
                </button>
            </div>
        );
};

export default GeneratePagination;
