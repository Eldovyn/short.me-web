import React from 'react';
import { Clipboard } from 'lucide-react';
import IconApp from "@/../public/icon-software.png";
import Image from 'next/image';
import Payment1 from "@/../public/button payment 1.png";
import Payment2 from "@/../public/button payment 2.png";
import Payment3 from "@/../public/button payment.png";
import Qris from "@/../public/Adobe Express - file.png";

const GenerateIconPayment: React.FC<GeneratePaymentProps> = ({ method }) => {
    if (method === 'bca') {
        return <Image src={Payment2} alt="payment bca" />;
    } else if (method === 'qris') {
        return <Image src={Payment1} alt="payment qris" />;
    } else {
        return <Image src={Payment3} alt="payment other" />;
    }
};

const GeneratePayment: React.FC<GeneratePaymentProps> = ({ method }) => {
    return (
        <>
            <h2 className="font-semibold">Metode Pembayaran</h2>
            {(method === 'bca' || method === 'mandiri') && (
                <div className="flex items-center my-2">
                    <GenerateIconPayment method={method} />
                </div>
            )}
            <div className="flex justify-between items-center">
                <span>Kode Pembayaran</span>
                <div className="flex items-center">
                    <span className="mr-2">1234567890</span>
                    <Clipboard size={16} className="text-gray-500 cursor-pointer" />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span>Total Pembayaran</span>
                <div className="flex items-center">
                    <span className="mr-2">Rp 50.000,00</span>
                    <Clipboard size={16} className="text-gray-500 cursor-pointer" />
                </div>
            </div>
        </>
    )
}

const PaymentStatus: React.FC = () => {
    const method: PaymentMethod = 'qris';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                <div>
                    <Image src={IconApp} width={200} height={200} alt="App Icon" className="translate-x-[-45px]" />
                    <p className="text-xl text-gray-700">Rp 50.000,00</p>
                    <p className="text-sm text-gray-500">Order ID $TR00000001</p>
                    <p className="text-sm text-yellow-600">Pending</p>
                </div>
                <div className="mt-6 p-4 border border-gray-300 rounded-lg">
                    {(['bca', 'mandiri'] as PaymentMethod[]).includes(method) && (
                        <GeneratePayment method={method} />
                    )}
                    {method === 'qris' && (
                        <div className="flex items-center justify-center">
                            <Image src={Qris} alt="qris" width={200} height={200} />
                        </div>
                    )}
                </div>

                <button className="mt-6 w-full py-2 bg-blue-600 text-white font-bold rounded-[10px] hover:bg-blue-700 transition">
                    Check Status
                </button>
            </div>
        </div>
    );
};

export default PaymentStatus;
