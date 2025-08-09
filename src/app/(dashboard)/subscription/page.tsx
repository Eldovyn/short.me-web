import Payment1 from "@/../public/button payment 1.png";
import Payment2 from "@/../public/button payment 2.png";
import Payment3 from "@/../public/button payment.png";
import Image from "next/image";

const SubscriptionPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F3F3F7]">
            <div className="bg-white border-[#D9D9D9] w-[70%] border rounded-[10px] p-15 utama">
                <h1 className="font-semibold text-[30px] ms-3">Subscription Plans</h1>
                <div className="flex flex-col md:flex-row justify-center items-stretch space-y-4 md:space-y-0 md:space-x-4 p-4">
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col">
                        <h3 className="text-green-600 text-lg font-semibold">Free</h3>
                        <p className="text-gray-700">Starter plan</p>
                        <p className="text-2xl font-bold mt-4">Rp 0,00</p>
                        <p className="text-gray-500 mt-2">Free for everyone</p>
                        <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                            <li>Buat short link terbatas (misalnya max 5 link aktif).</li>
                            <li>Limit klik per link (max 100 klik per link).</li>
                        </ul>
                    </div>

                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-[#FE9A00] text-lg font-semibold">Premium</h3>
                            <p className="text-gray-700">Recomended Plan</p>
                            <p className="text-2xl font-bold mt-4">Rp 50.000,00</p>
                            <p className="text-gray-500 mt-2">
                                Plan ini ditujukan untuk pengguna individu dengan fitur tambahan.
                            </p>
                            <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                                <li>Unlimited klik (tanpa batas klik per link).</li>
                                <li>Lebih banyak link aktif hingga 50 link aktif.</li>
                            </ul>
                        </div>
                        <button className="mt-6 w-full bg-white text-black border border-[#D9D9D9] py-2 rounded-md transition">
                            Select Payment
                        </button>
                        <div className="flex flex-row gap-5 mt-6">
                            <Image src={Payment1} alt="payment1" />
                            <Image src={Payment2} alt="payment2" />
                            <Image src={Payment3} alt="payment3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage;
