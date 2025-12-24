import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosClient } from '@/lib/axios';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StreamCard from '@/components/StreamCard';
import MapComponent from '@/components/Map';
import LoadingGetData from '@/components/Loading/LoadingGetData';

interface HelmetDetail {
  id: number;
  name: string;
  path_slug: string;
  status: boolean;
  region_id: number;
  lat: string;
  long: string;
  star: boolean;
  type: number;
  regions?: {
    id: number;
    name: string;
  };
}

export default function HelmetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [camera, setCamera] = useState<HelmetDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/electron/cctv/${id}`);
        setCamera(response.data.data);
      } catch (err: any) {
        console.error('Error fetching Helmet detail:', err);
        setError(err.response?.data?.message || 'Failed to load camera details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingGetData />
      </DashboardLayout>
    );
  }

  if (error || !camera) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="text-red-500 text-xl">{error || 'Camera not found'}</div>
          <button
            onClick={() => navigate('/helmet')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Helmet Cameras
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const latitude = parseFloat(camera.lat) || -2.548926;
  const longitude = parseFloat(camera.long) || 118.0148634;

  return (
    <DashboardLayout>
      <div>
        <div className="py-3">
          <button
            onClick={() => navigate('/helmet')}
            className="flex items-center gap-2 px-6 py-2 bg-[#1a4d5c] text-white rounded hover:bg-[#2a5d6c] transition"
          >
            <span>◄ Kembali</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="relative h-[28.5rem]">
              <StreamCard
                active={camera.status}
                is_detail={false}
                path_slug={camera.path_slug}
                name={camera.name}
                redirect="/helmet"
                type={2}
                star={camera.star}
                pin={true}
              />
            </div>
          </div>

          <div>
            <div className="relative h-[28.5rem]">
              <button
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                title="Fullscreen Map"
                onClick={() => window.open(`/peta`, '_blank')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                </svg>
              </button>

              <MapComponent 
                latitude={latitude}
                longitude={longitude}
                cctvName={camera.name}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
