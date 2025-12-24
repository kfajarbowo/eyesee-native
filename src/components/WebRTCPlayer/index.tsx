import { useEffect, useRef } from 'react'

interface WebRTCPlayerProps {
  streamPath: string;
  mediamtxUrl: string;
}

export default function WebRTCPlayer({ streamPath, mediamtxUrl }: WebRTCPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Initialize WebRTC connection to MediaMTX
  const startWebRTC = async () => {
    try {
      const pc = new RTCPeerConnection()

      pc.ontrack = (event) => {
        if (videoRef.current && !videoRef.current.srcObject) {
          videoRef.current.srcObject = event.streams[0]
        }
      }

      pc.addTransceiver('video', { direction: 'recvonly' })
      pc.addTransceiver('audio', { direction: 'recvonly' })

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      // Send offer to MediaMTX signaling server
      const res = await fetch(`${mediamtxUrl}/${streamPath}`, {
        method: 'POST',
        body: new RTCSessionDescription(offer).sdp,
        headers: {
          'Content-Type': 'application/sdp',
        },
      })

      if (!res.ok) {
        console.error('MediaMTX response error:', res.status)
        return
      }

      const answer = await res.text()
      await pc.setRemoteDescription(new RTCSessionDescription({
        type: 'answer',
        sdp: answer
      }))
    } catch (error) {
      console.error('WebRTC error:', error)
    }
  }

  useEffect(() => {
    startWebRTC()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamPath, mediamtxUrl])

  return (
    <video 
      ref={videoRef} 
      autoPlay 
      playsInline 
      muted 
      className="w-full h-full object-cover"
    />
  )
}
