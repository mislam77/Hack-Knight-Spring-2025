"use client";

import { Filters } from "./filters";
import Image from "next/image";
import Link from "next/link";
import InvisLogo from "@/app/assets/invis-logo-transparent.png";
import { FIREBASE_AUTH } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(FIREBASE_AUTH);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <nav className="flex justify-between items-center">
                    <Image
                        src={InvisLogo}
                        alt="Invis logo"
                        height={56}
                        width={160}
                        className="w-auto"
                    />
                    <div className="flex gap-12 font-medium items-center text-xl text-white">
                        <Link href="/">
                            About Us
                        </Link>
                        <Link href="customerBanking">
                            Manage
                        </Link>
                        <Link href="/simulation-page">
                            Simulation
                        </Link>
                        <Link href="/" onClick={handleSignOut} className="text-white">
                            Sign Out
                        </Link>
                    </div>
                </nav>
                <div className="mt-12">
                    <Filters />
                </div>
            </div>
        </header>
    );
};