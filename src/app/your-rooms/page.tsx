import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/services/rooms";
import { SearchBar } from "../browse/SearchBar";
import UserRoomCard from "./user-room-card";
import { unstable_noStore } from "next/cache";



export default async function YourRoomsPage() {
    unstable_noStore();
    const rooms = await getUserRooms();

    return (
        <main className="min-h-screen flex-col p-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl">Your Rooms</h1>
                <Button asChild>
                    <Link href={"/create-room"}>
                        Create Room
                    </Link>
                </Button>
            </div>
            <div className="mb-8">
                <SearchBar />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {
                    rooms.map((room) => {
                        return <UserRoomCard key={room.id} room={room} />;
                    })
                }
            </div>
        </main>
    );
}
