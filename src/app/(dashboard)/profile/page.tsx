'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, User, MailIcon, Lock, Mail, LockIcon } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import Avatar from "@/../public/image 3.png";
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';

const InputField = ({ icon: Icon, type = "text", placeholder, value, onChange, error, showToggle = false, showPassword, togglePassword, isCompact }: any) => (
    <div className={`relative rounded-md ${error ? 'mb-0' : ''}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon size={25} />
        </div>
        <input
            type={showToggle ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`block w-full rounded-md border ${error ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white ${isCompact ? 'h-[37px]' : 'py-3'} pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
        />
        {showToggle && (
            <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none">
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
            </button>
        )}
        {error && <p className="text-[10px] text-right me-3 text-[#C10007] mb-1">{error}</p>}
    </div>
);

const FormInputGroup = ({ label, icon, placeholder, error, isCompact }: any) => (
    <div className="flex mt-5 flex-col">
        <Label className='text-[20px] text-[#787878] font-semibold'>{label}</Label>
        <div className={`relative rounded-md ${error ? 'mb-0' : ''}`}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {icon}
            </div>
            <input
                type="text"
                placeholder={placeholder}
                className={`block ${isCompact ? 'w-[220px]' : 'w-[312px]'} h-[44px] rounded-md border ${error ? 'border-[#C10007]' : 'border-[#D9D9D9]'} bg-white pl-14 pr-3 text-gray-900 placeholder-[#374151] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`}
            />
        </div>
    </div>
);

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isDefault = useMediaQuery({ maxWidth: 639 });
    const isLg = useMediaQuery({ minWidth: 1024 });
    const is1464 = useMediaQuery({ maxWidth: 1464 });

    const isCompact = (isSm || isDefault) && !isMd;

    const isUsernameError = "Username is required";
    const isEmailError = "Email is required";
    const isPasswordError = "Password is required";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, email, password });
    };

    if ((isSm || isMd || isDefault) && !isLg) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F3F7]">
                <h1 className="text-2xl font-semibold text-center mb-15">Update Profile</h1>
                <div className="flex justify-center mb-8">
                    <Image src={Avatar} alt="Avatar" width={200} height={200} />
                </div>
                <form onSubmit={handleSubmit} className={`${isCompact ? 'ps-10 pe-10' : 'w-[354px]'}`}>
                    <InputField icon={User} placeholder="username" value={username} onChange={(e: any) => setUsername(e.target.value)} error={isUsernameError} isCompact={isCompact} />
                    <InputField icon={MailIcon} placeholder="email" value={email} onChange={(e: any) => setEmail(e.target.value)} error={isEmailError} isCompact={isCompact} />
                    <InputField icon={Lock} placeholder="password" value={password} onChange={(e: any) => setPassword(e.target.value)} error={isPasswordError} showToggle showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)} isCompact={isCompact} />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-[10px] hover:bg-blue-700 transition mt-10">
                        Save Changes
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex h-screen justify-center items-center flex-col gap-15">
            <div className="border border-[#D9D9D9] w-[80%] h-[162px] rounded-[10px] bg-white pt-5 pb-5 ps-22 flex flex-row gap-10">
                <Image src={Avatar} alt="Avatar" width={122} height={122} />
                <div className="flex flex-col justify-center gap-2">
                    <h1 className="font-semibold text-[30px]">Example@gmail.com</h1>
                    <div className="flex flex-row gap-5">
                        <p className='text-[20px] font-semibold'>Example</p>
                        <p className='text-[20px] border border-[#D9D9D9] h-[36px] w-[130px] rounded-[10px] flex items-center justify-center font-semibold'>Free</p>
                    </div>
                </div>
            </div>
            <div className="border border-[#D9D9D9] w-[80%] rounded-[10px] bg-white pt-8 pb-5 ps-10">
                <h1 className="font-semibold text-[30px] ps-13">Personal Information</h1>
                <form>
                    <div className={`flex items-center justify-center ${is1464 ? 'flex-col gap-5' : 'flex-col'}`}>
                        <div className={`flex ${is1464 ? 'flex-row gap-5' : 'flex-row gap-42'}`}>
                            <FormInputGroup label="Username" icon={<User size={25} />} placeholder="email" error={isUsernameError} isCompact={is1464} />
                            <FormInputGroup label="Email" icon={<Mail size={25} />} placeholder="email" error={isEmailError} isCompact={is1464} />
                        </div>
                        <div className={`flex ${is1464 ? 'flex-row gap-5' : 'flex-row gap-42'}`}>
                            <FormInputGroup label="Password" icon={<LockIcon size={25} />} placeholder="email" error={isPasswordError} isCompact={is1464} />
                            <div className="flex mt-5 flex-col">
                                <Label className='text-[20px] text-[#787878] font-semibold'>Role</Label>
                                <div className="relative rounded-md">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User size={25} />
                                    </div>
                                    <p className={`flex items-center pl-14 pr-3 ${is1464 ? 'w-[220px]' : 'w-[312px]'} h-[44px] rounded-md border border-[#D9D9D9] bg-white text-[#374151] sm:text-sm`}>
                                        User
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button className={`${is1464 ? 'w-[220px]' : 'w-[312px]'} h-[44px] bg-[#1447E6] hover:bg-blue-700 text-white mb-1`}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
