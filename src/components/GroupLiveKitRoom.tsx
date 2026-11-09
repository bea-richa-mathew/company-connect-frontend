
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  ControlBar,
  ConnectionStateToast,
  useParticipants,
} from "@livekit/components-react";

import { Users } from "lucide-react";

import "@livekit/components-styles";

interface GroupLiveKitRoomProps {
  token: string;
  serverUrl: string;
  mode: "audio" | "video";
  onLeave: () => void;
}

function AudioRoomContent() {
  const participants = useParticipants();

  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-6">
        <div className="rounded-full bg-indigo-600/20 p-5 text-indigo-400">
          <Users size={36} />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Group Audio Call
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Connected to your team conversation
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            {participants.length}{" "}
            {participants.length === 1
              ? "participant"
              : "participants"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {participants.map((participant) => {
            const name =
              participant.name ||
              participant.identity ||
              "User";

            return (
              <div
                key={participant.identity}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-center"
              >
                <p className="font-medium">
                  {name}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {participant.isMicrophoneEnabled
                    ? "Microphone on"
                    : "Muted"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center border-t border-zinc-800 p-4">
        <ControlBar
          controls={{
            microphone: true,
            camera: false,
            screenShare: false,
            chat: false,
            leave: true,
          }}
        />
      </div>
    </div>
  );
}

export default function GroupLiveKitRoom({
  token,
  serverUrl,
  mode,
  onLeave,
}: GroupLiveKitRoomProps) {
  return (
    <div className="h-[75vh] min-h-[400px] overflow-hidden rounded-2xl bg-zinc-950">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        audio={true}
        video={mode === "video"}
        onDisconnected={onLeave}
        onError={(error) => {
          console.error(
            "LiveKit connection error:",
            error
          );
        }}
        data-lk-theme="default"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {mode === "video" ? (
          <VideoConference />
        ) : (
          <AudioRoomContent />
        )}

        <RoomAudioRenderer />

        <ConnectionStateToast />
      </LiveKitRoom>
    </div>
  );
}
