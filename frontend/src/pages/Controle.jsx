import React from 'react'; 

const Controle = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Live Camera Feed</h1>
      <div className="w-full h-auto flex justify-center">
        <img 
          src="http://192.168.43.226:5000/video_feed"
          alt="Live camera feed"
          className="w-full max-w-[800px] rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Controle;
