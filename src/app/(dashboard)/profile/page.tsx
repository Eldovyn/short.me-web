'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, User, MailIcon, Lock } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import Avatar from "@/../public/image 3.png";
import Image from 'next/image';

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });

    const isUsernameError = true;
    const isEmailError = true;
    const isPasswordError = true;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, email, password });
    };

    if ((isSm || isMd || isDefault)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F7]">
                <h1 className="text-2xl font-semibold text-center mb-15">Update Profile</h1>
                <div className="flex justify-center mb-8">
                    <Image
                        src={Avatar}
                        alt="Avatar"
                        width={200}
                        height={200}
                    />
                </div>
                <form onSubmit={handleSubmit} className={`${(isSm || isDefault) && !isMd ? 'ps-10 pe-10' : 'w-[354px]'}`}>
                    <div className={`relative rounded-md ${isUsernameError ? 'mb-0' : ''}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <User size={25} />
                        </div>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            placeholder="username"
                            className={`block w-full rounded-md border ${isUsernameError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                    </div>
                    {isUsernameError && (
                        <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Username is required</p>
                    )}

                    <div className={`relative rounded-md ${isEmailError ? 'mb-0' : ''}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MailIcon size={25} />
                        </div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="email"
                            placeholder="email"
                            className={`block w-full rounded-md border ${isEmailError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                    </div>
                    {isEmailError && (
                        <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Email is required</p>
                    )}

                    <div className={`relative rounded-md ${isPasswordError ? 'mb-0' : ''}`}>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock size={25} />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            className={`block w-full rounded-md border ${isPasswordError ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${(isSm || isDefault) && !isMd ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff size={25} />
                            ) : (
                                <Eye size={25} />
                            )}
                        </button>
                    </div>
                    {isPasswordError && (
                        <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">Password is required</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-[10px] hover:bg-blue-700 transition mt-10"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        );
    }
};

export default UpdateProfile;
