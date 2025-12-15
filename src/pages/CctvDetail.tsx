import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaExpand, FaCompress, FaStar, FaRegStar } from 'react-icons/fa';
import { getMediaMTXStreamUrl } from '@/utils/getMediaMTXUrl';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { axiosClient } from '@/lib/axios';

interface CctvDetail {
  id: number;
  name: string;
  path_slug: string;
  status: boolean;
  region_id: number;
  regions?: {
    id: number;
    name: string;
  };
}

export default function CctvDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cctv, setCctv] = useState<CctvDetail | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MEDIAMTX_URL = getMediaMTXStreamUrl();

  useEffect(() => {
    const fetchCctvDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/electron/cctv/${id}`);
        setCctv(response.data.data);
      } catch (err: any) {
        console.error('Error fetching CCTV detail:', err);
        setError(err.response?.data?.message || 'Failed to load camera details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCctvDetail();
    }
  }, [id]);

  const toggleFullscreen = () => {
    const elem = document.getElementById('stream-container');
    if (!elem) return;

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading camera details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !cctv) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="text-red-500 text-xl">{error || 'Camera not found'}</div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen p-4 gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-white">{cctv.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">
              Region: {cctv.regions?.name || 'Unknown'}
            </span>
            <span className={`px-3 py-1 rounded text-sm ${
              cctv.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {cctv.status ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Stream Container */}
        <div className="flex-1 relative bg-black rounded-lg overflow-hidden">
          <div id="stream-container" className="w-full h-full">
            {cctv.status ? (
              <iframe
                src={`${MEDIAMTX_URL}/${cctv.path_slug}`}
                allow="fullscreen; autoplay; encrypted-media"
                className="w-full h-full border-none"
                title={cctv.name}
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-gray-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2H4z"
                  />
                  <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-gray-400 text-xl">Camera Offline</span>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 p-3 bg-gray-800 bg-opacity-75 text-white rounded-full hover:bg-opacity-100 transition z-10"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
        </div>

        {/* Camera Info Panel */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Camera Name</h3>
              <p className="text-white font-semibold">{cctv.name}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Stream Path</h3>
              <p className="text-white font-mono text-sm">{cctv.path_slug}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Status</h3>
              <p className={`font-semibold ${cctv.status ? 'text-green-400' : 'text-red-400'}`}>
                {cctv.status ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
