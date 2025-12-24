import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosClient } from '@/lib/axios';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StreamCard from '@/components/StreamCard';
import MapComponent from '@/components/Map';
import LoadingGetData from '@/components/Loading/LoadingGetData';

interface CctvDetail {
  id: number;
  name: string;
  path_slug: string;
  status: boolean;
  region_id: number;
  lat: string;
  long: string;
  star: boolean;
  regions?: {
    id: number;
    name: string;
  };
}

export default function CctvDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cctv, setCctv] = useState<CctvDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingGetData />
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

  // Parse coordinates
  const latitude = parseFloat(cctv.lat) || -2.548926;
  const longitude = parseFloat(cctv.long) || 118.0148634;

  return (
    <DashboardLayout>
      <div>
        {/* Back button */}
        <div className="py-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-2 bg-[#1a4d5c] text-white rounded hover:bg-[#2a5d6c] transition"
          >
            <span>◄ Kembali</span>
          </button>
        </div>

        {/* Main content - Grid layout matching web */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Left side - Stream */}
          <div>
            <div className="relative h-[28.5rem]">
              <StreamCard
                active={cctv.status}
                is_detail={false}
                path_slug={cctv.path_slug}
                name={cctv.name}
                redirect="/"
                type={1}
                star={cctv.star}
                pin={true}
              />
            </div>
            {/* Bottom section for related cameras can be added here */}
          </div>

          {/* Right side - Map */}
          <div>
            <div className="relative h-[28.5rem]">
              {/* Fullscreen icon */}
              <button
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                title="Fullscreen Map"
                onClick={() => {
                  // Open map in new window or fullscreen
                  window.open(`/peta`, '_blank');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                </svg>
              </button>

              <MapComponent 
                latitude={latitude}
                longitude={longitude}
                cctvName={cctv.name}
              />
            </div>
            {/* Bottom section for related cameras can be added here */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
