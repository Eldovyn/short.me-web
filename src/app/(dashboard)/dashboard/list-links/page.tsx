'use client';
import React from 'react';
import { Trash2, QrCode } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { Edit } from 'lucide-react';

const ShortLinkList = () => {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const links = ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5', 'Link 6'];

    const handleDelete = (index: number) => {
        console.log(`Delete link at index: ${index}`);
    };

    if ((isSm || isDefault || isMd) && !isLg) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-10">List Short Link</h1>
                <br />
                <div className="space-y-4">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-2 border-[#D9D9D9] border bg-white ${isMd ? 'w-[519px] h-[85px]' : 'w-[358px] h-[50px]'} rounded-[10px]`}
                        >
                            <span className={`ps-10 ${isMd ? 'text-[30px]' : 'text-[15px]'}`}>{link}</span>
                            {isMd ? (
                                <div className="flex flex-row">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-white"
                                    >
                                        <div className="border bg-[#1447E6] p-3 me-3 rounded-[10px]">
                                            <QrCode size={25} />
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-white"
                                    >
                                        <div className="border bg-[#C10007] p-3 me-3 rounded-[10px]">
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
                <div className="flex items-center justify-center bg-blue-600 rounded-lg mt-5 translate-y-[25px]">
                    <button
                        className="text-white px-4 h-[51px] rounded-l-lg focus:outline-none"
                    >
                        &lt;
                    </button>
                    <span className="text-white mx-4">{1}</span>
                    <button
                        className="text-white px-4 h-[51px] rounded-r-lg focus:outline-none"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        );
    }
};

export default ShortLinkList;
