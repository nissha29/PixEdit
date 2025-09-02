'use client';

import { useActiveTabStore } from '@/store/store';
import { toolbarItems } from '@/lib/constants';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Crown, LogOut, User, Zap } from 'lucide-react';

export default function LeftSidebar() {
    const { activeTab, setActiveTab } = useActiveTabStore();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
        setIsOpen(false);
    };

    const handleUpgrade = () => {
        router.push('/upgrade');
        setIsOpen(false);
    };

    const planType = session?.user?.plan || 'premium';
    const isPremium = planType === 'premium';

    return (
        <div className='relative'>
            <div className='flex h-full justify-between items-center flex-col border-r-2 border-neutral-800 w-28 bg-background py-5'>
                <aside className="flex flex-col items-center p-10 z-20">
                    {toolbarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className='flex flex-col justify-center items-center mt-5'>
                                <div className='flex flex-col justify-center items-center gap-1.5'>
                                    <button
                                        onClick={() => {
                                            console.log('Button clicked:', item.id);
                                            setActiveTab(item.id);
                                        }}
                                        className={`p-3 rounded-xl transition-all duration-200 ease-in-out cursor-pointer ${activeTab === item.id
                                            ? `${item.color} text-white shadow-lg transform scale-105`
                                            : 'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-400 text-neutral-100 hover:shadow-md active:shadow-lg'
                                            }`}
                                        title={item.label}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </button>
                                    <div className='text-center text-neutral-200'>{item.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </aside>
                <div className=''>
                    {session?.user.image && <Image src={session?.user.image} width={100} height={100} alt='user image' className='rounded-full w-12 h-12 cursor-pointer' onClick={() => setIsOpen(prev => !prev)} />}
                </div>
            </div>

            {isOpen && (
                <div className="absolute bottom-20 left-20 bg-neutral-900 backdrop-blur-sm border border-neutral-700 rounded-md shadow-2xl min-w-2xs overflow-hidden z-50">
                    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-4 border-b border-neutral-600">
                        <div className="flex items-center gap-3">
                            {session?.user.image ? (
                                <Image
                                    src={session.user.image}
                                    width={48}
                                    height={48}
                                    alt='user image'
                                    className='rounded-full w-12 h-12 ring-2 ring-neutral-700'
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-neutral-600 flex items-center justify-center">
                                    <User className="w-6 h-6 text-neutral-300" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold truncate">
                                    {session?.user?.name || 'User'}
                                </h3>
                                <p className="text-neutral-300 text-sm truncate">
                                    {session?.user?.email || 'No email'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3 border-b border-neutral-700">
                        <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">Plan</span>
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${isPremium
                                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30'
                                : 'bg-neutral-700 text-neutral-300 border border-neutral-600'
                                }`}>
                                {isPremium && <Crown className="w-3 h-3" />}
                                <span className="capitalize">{planType}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 space-y-1">
                        {!isPremium && (
                            <button
                                onClick={handleUpgrade}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-yellow-400 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-orange-500/10 rounded-lg transition-all duration-200 group border border-yellow-500/20 hover:border-yellow-500/40"
                            >
                                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                <span className="text-sm font-medium">Upgrade to Premium</span>
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-all duration-200 group"
                        >
                            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-sm font-medium">Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}