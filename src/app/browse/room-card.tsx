"use client";
import { Room } from "@/db/schema"
import { splitTags } from "@/lib/utils"
import { Github } from "lucide-react"
import { TagsList } from "../../components/tags-list"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import Link from "next/link"

interface RoomCardProps {
    room: Room
}

const RoomCard: React.FC<RoomCardProps> = ({ room }: { room: Room }) => {
    return (<Card>
        <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <TagsList tags={splitTags(room.tags)} />
            {room.githubRepo &&
                <Link
                    className="flex items-center gap-2"
                    href={room.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github /> Github Project
                </Link>
            }
        </CardContent>
        <CardFooter>
            <Button asChild>
                <Link href={`/rooms/${room.id}`}>Join Room</Link>
            </Button>
        </CardFooter>
    </Card>)

}

export default RoomCard;