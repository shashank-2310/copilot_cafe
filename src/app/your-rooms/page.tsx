import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/services/rooms";
import { SearchBar } from "../browse/SearchBar";
import UserRoomCard from "./user-room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import nodata from "@/assets/nodata.svg"



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
            {rooms.length === 0 && (
                <div className="flex flex-col gap-4 justify-center items-center mt-24">
                    <Image
                        src={nodata}
                        alt="no-data-image"
                        width={200}
                        height={200}
                    />
                    <h2 className="text-2xl">No Rooms yet!</h2>
                    <Button asChild>
                        <Link href={"/create-room"}>
                            Create Room
                        </Link>
                    </Button>
                </div>
            )}
        </main>
    );
}
