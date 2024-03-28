import { getRoom } from "@/services/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { splitTags, TagsList } from "@/components/tags-list";


export default async function RoomPage(props: { params: { roomId: string } }) {
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    if (!room) {
        return <div className="">
            No room of this ID found. Please check the URL or try again later.
        </div>
    }

    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    video player
                </div>
            </div>
            <div className="col-span-1 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-base">
                        {room.name}
                    </h1>
                    {room.githubRepo &&
                        <Link
                            className="flex items-center gap-2 text-sm"
                            href={room.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github /> Github Project
                        </Link>
                    }
                    <p className="text-base text-gray-600">
                        {room.description}
                    </p>
                    <h3>Tags:</h3>
                    <TagsList tags={splitTags(room.tag)} />
                </div>
            </div>
        </div>
    );
}