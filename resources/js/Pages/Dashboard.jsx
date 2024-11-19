import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CameraDisplay from '@/Components/CameraDisplay';
import SuggestedPlaylist from '@/Components/SuggestedPlaylist';
import { useState, useEffect } from 'react';

/**
 * Dashboard component that integrates mood detection camera functionality.
 * This component provides a user interface for capturing photos and analyzing moods
 * using the Python FastAPI backend.
 * 
 * @component
 * @returns {JSX.Element} A dashboard interface with camera display and mood analysis
 * 
 * @example
 * ```jsx
 * <Dashboard />
 * ```
 */
export default function Dashboard() {
    const [lastSnapshot, setLastSnapshot] = useState(null);
    const [mood, setMood] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [spotifyToken, setSpotifyToken] = useState(null);

    // Map moods to music genres
    const moodToGenres = {
        'happy': ['happy', 'pop', 'dance'],
        'sad': ['sad', 'acoustic', 'indie'],
        'angry': ['metal', 'rock', 'intense'],
        'neutral': ['ambient', 'chill', 'electronic'],
        'surprised': ['upbeat', 'energetic', 'edm'],
        'fearful': ['calm', 'meditation', 'classical'],
        'disgusted': ['punk', 'alternative', 'grunge']
    };

    useEffect(() => {
        // Fetch Spotify token when component mounts
        const getSpotifyToken = async () => {
            try {
                const response = await fetch('/spotify/token');
                const data = await response.json();
                setSpotifyToken(data.access_token);
            } catch (err) {
                console.error('Error fetching Spotify token:', err);
                setError('Failed to connect to Spotify. Please try again.');
            }
        };

        getSpotifyToken();
    }, []);

    /**
     * Handles the snapshot taken from the camera and sends it to the Python backend
     * for mood analysis.
     * 
     * @async
     * @param {File} snapshotFile - The image file captured from the camera
     * @throws {Error} When the API request fails or returns an error status
     */
    const handleSnapshot = async (snapshotFile) => {
        setLastSnapshot(snapshotFile);
        setIsProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', snapshotFile);

            const response = await fetch('http://127.0.0.1:6969/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMood(data.result);
        } catch (err) {
            console.error('Error sending snapshot:', err);
            setError('Failed to analyze mood. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Mood Detection Camera</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                        <CameraDisplay onSnapshot={handleSnapshot} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Mood Analysis</h3>
                                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                        {(() => {
                                            let content;
                                            if (error) {
                                                content = <p className="text-red-500">{error}</p>;
                                            } else if (isProcessing) {
                                                content = (
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <p>Processing your mood...</p>
                                                    </div>
                                                );
                                            } else if (mood) {
                                                content = (
                                                    <div>
                                                        <p className="text-lg font-medium">Detected Mood: <span className="capitalize text-blue-500">{mood}</span></p>
                                                    </div>
                                                );
                                            } else {
                                                content = <p>Take a snapshot to analyze your mood</p>;
                                            }
                                            return content;
                                        })()}
                                    </div>
                                </div>
                            </div>
                            {mood && spotifyToken && (
                                <div className="mt-8">
                                    <SuggestedPlaylist 
                                        emotion={moodToGenres[mood.toLowerCase()] || ['pop', 'indie', 'electronic']} 
                                        accessKey={spotifyToken}
                                        currentMood={mood} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
