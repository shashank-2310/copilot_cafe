"use client";

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Room } from '@/db/schema';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from './actions';
import { useRouter } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export function CoPilotVideo({ room }: { room: Room }) {
    const session = useSession();
    const router = useRouter();
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);

    useEffect(() => {
        if (!session.data || !room) return;
        if (!apiKey) throw new Error("Stream API key is missing");

        const userId = session.data.user.id;
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: userId,
                name: session.data.user.name ?? undefined,
                image: session.data.user.image ?? undefined,
            },
            tokenProvider: () => generateTokenAction(),
        });
        const call = client.call('default', room.id);
        call.join({ create: true });
        setClient(client);
        setCall(call);

        return () => {
            call.leave()
                .then(() => { client.disconnectUser(); })
                .catch(console.error);
        }
    }, [session, room]);


    return (
        client && call && (
            <StreamVideo client={client}>
                <StreamTheme>
                    <StreamCall call={call}>
                        <SpeakerLayout />
                        <CallControls onLeave={() => {
                            router.push('/');
                        }} />
                        <CallParticipantsList onClose={() => undefined} />
                    </StreamCall>
                </StreamTheme>
            </StreamVideo>
        )
    );
};