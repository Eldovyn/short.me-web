'use client'
import { useMediaQuery } from "react-responsive"
import { useState } from "react"
import { Info, Link } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"


const AddLinkPage = () => {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    const isTitleError = true;
    const isLinkError = true
    const isDescriptionError = true

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Title:', title, 'Link:', link, 'Description:', description);
    };

    if ((isSm || isMd || isDefault) && !isLg) {
        return (
            <>
                <div className="h-screen flex flex-col items-center justify-center bg-[#F3F3F7]">
                    <h1 className="text-[40px] font-semibold mb-20">Short Your Link</h1>
                    <form onSubmit={handleSubmit} className={`w-full max-w-md ${(isSm || isDefault) && !isMd ? 'ps-10 pe-10' : ''}`}>
                        <div className={`relative rounded-md ${isTitleError ? 'mb-0' : 'mb-4'}`}>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Info />
                            </div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                autoComplete="title"
                                placeholder="title"
                                className={`block w-full rounded-md border ${isTitleError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                            />
                        </div>
                        {isTitleError && (
                            <p className="text-[10px] text-right me-3 text-[#C10007] mb-3">Title is required</p>
                        )}
                        <div className={`relative rounded-md ${isLinkError ? 'mb-0' : 'mb-4'}`}>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Link />
                            </div>
                            <input
                                type="text"
                                name="link"
                                id="link"
                                autoComplete="link"
                                placeholder="link"
                                className={`block w-full rounded-md border ${isLinkError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                            />
                        </div>
                        {isLinkError && (
                            <p className="text-[10px] text-right me-3 text-[#C10007] mb-3">Link is required</p>
                        )}
                        <Textarea className={`${isDescriptionError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ps-14 `} placeholder="description" />
                        {isDescriptionError && (
                            <p className="text-[10px] text-right me-3 text-[#C10007]">Email is required</p>
                        )}
                        <br />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                        >
                            Add Short Link
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#F3F3F7]">
            <h1 className="text-[40px] font-semibold mb-20">Short Your Link</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className={`relative rounded-md ${isTitleError ? 'mb-0' : 'mb-4'}`}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Info />
                    </div>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        placeholder="title"
                        className={`block w-full rounded-md border ${isTitleError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                    />
                </div>
                {isTitleError && (
                    <p className="text-[10px] text-right me-3 text-[#C10007] mb-3">Title is required</p>
                )}
                <div className={`relative rounded-md ${isLinkError ? 'mb-0' : 'mb-4'}`}>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Link />
                    </div>
                    <input
                        type="text"
                        name="link"
                        id="link"
                        autoComplete="link"
                        placeholder="link"
                        className={`block w-full rounded-md border ${isLinkError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                    />
                </div>
                {isLinkError && (
                    <p className="text-[10px] text-right me-3 text-[#C10007] mb-3">Link is required</p>
                )}
                <Textarea className={`${isDescriptionError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ps-14 `} placeholder="description" />
                {isDescriptionError && (
                    <p className="text-[10px] text-right me-3 text-[#C10007]">Email is required</p>
                )}
                <br />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                    Add Short Link
                </button>
            </form>
        </div>
    );

}

export default AddLinkPage