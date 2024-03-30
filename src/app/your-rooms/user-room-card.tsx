"use client";

import { Room } from "@/db/schema"
import { splitTags } from "@/lib/utils"
import { Github, TrashIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TagsList } from "@/components/tags-list"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteRoomAction } from "./action";

interface RoomCardProps {
    room: Room
}

const UserRoomCard: React.FC<RoomCardProps> = ({ room }: { room: Room }) => {
    return (
        <Card>
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
            <CardFooter className="flex gap-2">
                <Button asChild>
                    <Link href={`/rooms/${room.id}`}>Join Room</Link>
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant={"destructive"}>
                            <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove the room and any data associated with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    deleteRoomAction(room.id);
                                }}
                            >
                                Yes, delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>
    )

}

export default UserRoomCard;