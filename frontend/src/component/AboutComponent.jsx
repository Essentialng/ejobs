import { FaBriefcase } from 'react-icons/fa';

function AboutComponent({ logo, title, content }) {
  return (
    <div className="border-2 hover:scale-105 border-slate-300 bg-white py-6 px-4 rounded-lg shadow-lg text-center max-w-sm mx-auto transition-all duration-500">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 border-2 border-slate-300 rounded-full text-orange-500 text-3xl">
          {logo}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2 text-slate-800">{title}</h2>
      <p className="text-slate-600">{content}</p>
    </div>
  );
}

export default AboutComponent;
