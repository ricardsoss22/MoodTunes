import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CameraDisplay from '@/Components/CameraDisplay';
import SuggestedPlaylist from '@/Components/SuggestedPlaylist';
import { useState, useEffect } from 'react';

/**
 * Enhanced Dashboard with a dark, Spotify-inspired aesthetic.
 */
export default function Dashboard() {
    const [lastSnapshot, setLastSnapshot] = useState(null);
    const [mood, setMood] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [spotifyToken, setSpotifyToken] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => setSelectedFile(event.target.files[0]);

    const handleUpload = () => {
        if (selectedFile) {
            setIsProcessing(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('http://127.0.0.1:6969/predict', { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => setMood(data.result))
                .catch(() => setError('Failed to analyze mood. Please try again.'))
                .finally(() => setIsProcessing(false));
        }
    };
                                
    useEffect(() => {
        const getSpotifyToken = async () => {
            try {
                const response = await fetch('/spotify/token');
                const data = await response.json();
                setSpotifyToken(data.access_token);
            } catch {
                setError('Failed to connect to Spotify. Please try again.');
            }
        };

        getSpotifyToken();
    }, []);

    const moodToGenres = {
        happy: ['happy', 'pop', 'dance'],
        sad: ['sad', 'acoustic', 'indie'],
        angry: ['metal', 'rock', 'intense'],
        neutral: ['ambient', 'chill', 'electronic'],
        surprised: ['upbeat', 'energetic', 'edm'],
        fearful: ['calm', 'meditation', 'classical'],
        disgusted: ['punk', 'alternative', 'grunge'],
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-extrabold text-gray-900"> </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-8 rounded-xl shadow-lg bg-black">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Section */}
                            <div className="space-y-8">
                                <h3 className="text-2xl font-semibold text-green-500">Mood Detection Camera</h3>
                                <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
                                    <CameraDisplay onSnapshot={setLastSnapshot} />
                                </div>
                                <div className="p-6 rounded-lg bg-gray-800">
                                    <label
                                        htmlFor="file-picker"
                                        className="block text-sm font-medium text-gray-300 mb-3"
                                    >
                                        Or upload a photo
                                    </label>
                                    <input
                                        id="file-picker"
                                        type="file"
                                        className="block w-full px-4 py-2 text-sm bg-black rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        onClick={handleUpload}
                                        className="mt-4 w-full py-2 text-sm font-bold bg-green-500 text-black rounded-lg hover:bg-green-600 transition duration-200"
                                    >
                                        Analyze Mood
                                    </button>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="space-y-8">
                                <h3 className="text-2xl font-semibold text-green-500">Mood Analysis</h3>
                                <div className="p-6 rounded-lg bg-gray-800">
                                    {isProcessing ? (
                                        <p className="text-green-400">Analyzing your mood...</p>
                                    ) : mood ? (
                                        <p className="text-lg font-semibold text-gray-200">
                                            Detected Mood:{" "}
                                            <span className="text-green-500 capitalize">{mood}</span>
                                        </p>
                                    ) : (
                                        <p className="text-gray-400">Take a snapshot or upload a photo to analyze your mood.</p>
                                    )}
                                    {error && <p className="text-red-500 mt-3">{error}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Suggested Playlist */}
                        {mood && spotifyToken && (
                            <div className="mt-10">
                                <h3 className="text-2xl font-semibold text-green-500 mb-4">
                                    Suggested Playlist
                                </h3>
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
        </AuthenticatedLayout>
    );
}
