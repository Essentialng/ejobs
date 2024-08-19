import { FaReact } from 'react-icons/fa';

function HomevideoComponent({ source, likes, views }) {
  return (
    <div className="relative w-full sm:w-80 md:w-96 bg-white shadow-md rounded-lg overflow-hidden p-4">
      <video 
        controls 
        autoPlay={false} 
        src={source} 
        type="video/mp4"
        className="w-auto h-[450px] [&::-webkit-media-controls-enclosure]:text-4xl object-cover"
      />
      <div className="flex items-center justify-between absolute bottom-0 left-0 w-full text-slate-100 bg-gradient-to-b from-gray-800 to-transparent p-3">
        <div className="flex items-center">
          <FaReact className="text-orange-500 mr-2" />
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
