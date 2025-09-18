import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Manage() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'unauthenticated') {
        return null;
    }
    return <div>
        Manage
    </div>
}