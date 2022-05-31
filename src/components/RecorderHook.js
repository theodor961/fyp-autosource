import { useRecorder } from "voice-recorder-react";
import React, { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause, FaMicrophone } from 'react-icons/fa'
import { BiSquareRounded } from 'react-icons/bi'
import { HiOutlineUpload } from 'react-icons/hi'

import d9 from './RecorderHooks.module.css'

// Recorder Hook component
export default function RecorderHook(props) {
  const [sent, setSent] = useState(false);

  const audioRef = useRef(null);
  const [hasRecording, setHasRecording] = useState(false);
  const {
    time,
    data,
    stop,
    start,
    pause,
    paused,
    resume,
    recording
  } = useRecorder();



  useEffect(() => {
    if (data.url && audioRef.current) {
      audioRef.current.src = data.url;
    }
  }, [data.url]);

  function checkRecording() {
    if (recording) {
      stop();
      setHasRecording(true);
    }
    else {
      start();
      setHasRecording(false);
    }
  }



  function checkPaused() {
    if (recording) {
      if (paused) resume();
      else pause();
    }
  }

  return (
    <div className={d9.recordingContainer}>
      <div className={d9.content}>
        {recording ?

          <button className={d9.recordButton} type="button" onClick={() => checkRecording()}>
            <BiSquareRounded />
          </button>
          :
          <button className={d9.recordButton} type="button" onClick={() => { checkRecording(); setSent(false) }}>
            <FaMicrophone />
          </button>
        }

        {recording && (
          <>
            <p className={d9.duration}>
              {time.h}:{time.m}:{time.s}
            </p>

            {paused ?
              <button className={d9.pauseButton} type="button" onClick={() => checkPaused()}>
                {<FaPlay /> || 'clear'}
              </button>
              : <>
                <button className={d9.cancelButton} onClick={() => { setHasRecording(false); stop(); }}>{<b>X</b> || 'clear'}</button>
                <button className={d9.pauseButton} type="button" onClick={() => checkPaused()}>
                  {<FaPause /> || 'pause'}
                </button></>
            }
          </>
        )}

        {!recording && hasRecording && (
          <>

            <button className={d9.downloadButton} id={sent ? d9.sent : d9.notSent} type="button" onClick={() => { props.getBolb(data); setSent(true); }}>{<HiOutlineUpload /> || 'submit'}</button>

          </>
        )}


      </div>

      {!recording && hasRecording && (
        <>
          <audio ref={audioRef} controls controlsList="nodownload" />
        </>
      )}
    </div>
  );
}
