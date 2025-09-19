import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManageComp from "./ManageComp";

export default async function Manage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/");
    }

    return <ManageComp />;
}
