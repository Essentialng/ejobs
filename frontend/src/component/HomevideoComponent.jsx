import { useRef, useState } from 'react';
import { BiPause } from 'react-icons/bi';
import { BsPlay } from 'react-icons/bs';
import { CgPlayButton } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';

function HomevideoComponent({ source, likes, views }) {

  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  const handleVideoToggle = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative transition group w-full sm:w-80 md:w-96 bg-white shadow-md rounded-lg overflow-hidden p-4">
      <video 
        // controls 
        ref={videoRef}
        autoPlay={false} 
        src={source} 
        type="video/mp4"
        className="w-auto h-[450px] [&::-webkit-media-controls-enclosure]:text-4xl object-cover"
      />
        {isPlaying && <BiPause 
  onClick={handleVideoToggle} 
  className={`text-white ${isPlaying ? 'block' : 'hidden'} group-hover:block absolute w-44 h-44 top-1/3 left-1/3`}
/>} 
{!isPlaying && <CgPlayButton 
  onClick={handleVideoToggle} 
  className={`text-white ${isPlaying ? 'hidden' : 'block'} group-hover:block absolute w-44 h-44 top-1/3 left-1/3`}
/>}
      <div className="flex items-center justify-between absolute bottom-0 left-0 w-full bg-black text-white p-3">
        <div className="flex items-center">
          <MdFavorite className="text-red-500 mr-2 w-4 h-4" />
          <span>{likes} Likes</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">{views}</span>
          <span>Views</span>
        </div>
      </div>
    </div>
  );
}

export default HomevideoComponent;
