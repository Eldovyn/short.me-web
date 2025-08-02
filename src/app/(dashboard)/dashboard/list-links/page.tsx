'use client';
import React, { useState } from 'react';
import { Trash2, QrCode, Edit } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import GeneratePagination from '@/components/GeneratePagination';
import { Checkbox } from "@/components/ui/checkbox"

const ShortLinkList = () => {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const links = ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5', 'Link 6'];

    const [selectedLinks, setSelectedLinks] = useState<number[]>([]);

    const handleCheckboxChange = (index: number) => {
        setSelectedLinks((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleDelete = (index: number) => {
        console.log(`Delete link at index: ${index}`);
    };

    const handleBulkDelete = () => {
        console.log("Delete selected links:", selectedLinks);
    };

    const totalPages = 10;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F3F7] p-4">
            <h1 className={`${isLg ? 'text-[45px]' : 'text-2xl'} font-bold mb-10`}>List Short Link</h1>
            <br />
            <div className="space-y-4">
                {isLg && selectedLinks.length > 0 && (
                    <div className="flex justify-end mb-5">
                        <button onClick={handleBulkDelete}>
                            <div className="bg-[#C10007] w-[234px] h-[57px] rounded-[10px] flex flex-row items-center justify-center gap-8">
                                <Trash2 size={25} className="text-white" />
                                <p className="text-white text-[20px]">{`Delete All (${selectedLinks.length})`}</p>
                            </div>
                        </button>
                    </div>
                )}
                {links.map((link, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center p-2 border-[#D9D9D9] border bg-white ${(isSm || isDefault) && !isMd ? 'w-[358px] h-[50px]' : ''} ${isMd && !isLg ? 'w-[519px] h-[85px]' : ''} ${isLg ? 'w-[618px] h-[85px]' : ''} rounded-[10px]`}
                    >
                        <div className="flex flex-row items-center gap-3 ms-5">
                            <Checkbox
                                className='w-[20px] h-[20px] translate-y-[0.5px]'
                                checked={selectedLinks.includes(index)}
                                onCheckedChange={() => handleCheckboxChange(index)}
                            />
                            <span className={`${isMd && !isLg ? 'text-[30px]' : ''} ${isSm || isDefault ? 'text-[15px]' : ''} ${isLg ? 'text-[20px]' : ''}`}>{link}</span>
                        </div>
                        {isMd ? (
                            <div className="flex flex-row gap-5">
                                {isLg && (
                                    <button
                                        onClick={() => console.log(`Edit link at index: ${index}`)}
                                        className="text-white"
                                    >
                                        <div className="border bg-[#1447E6] p-3 rounded-[10px]">
                                            <Edit size={25} />
                                        </div>
                                    </button>
                                )}
                                <button
                                    onClick={() => console.log(`QR link at index: ${index}`)}
                                    className="text-white"
                                >
                                    <div className="border bg-[#1447E6] p-3 rounded-[10px]">
                                        <QrCode size={25} />
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-white"
                                >
                                    <div className="border bg-[#C10007] p-3 rounded-[10px]">
                                        <Trash2 size={25} />
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <Trash2 size={25} className='me-3 text-[#C10007]' />
                        )}
                    </div>
                ))}
            </div>
            <br />
            <div className="p-5">
                <GeneratePagination totalPages={totalPages} />
            </div>
        </div>
    );
};

export default ShortLinkList;
