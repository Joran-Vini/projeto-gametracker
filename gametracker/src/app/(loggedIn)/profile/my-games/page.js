'use client';

import { useSearchParams } from "next/navigation";
import ProfileGameList from "@/components/games/ProfileGameList";

export default function MyGamesPage() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');


    return (
        <ProfileGameList />
    )
}