import { useState } from "react";
import axios from "axios";

/**
 * A component that fetches a list of Spotify playlists based on the provided emotion, and displays them.
 *
 * @param {{emotion: string[], accessKey: string, currentMood: string}} props
 * @param {string[]} props.emotion - A list of emotions to search for.
 * @param {string} props.accessKey - The user's Spotify access key.
 * @param {string} props.currentMood - The current detected mood.
 * @returns {JSX.Element}
 */
export default function SuggestedPlaylist({ emotion = [], accessKey = "", currentMood = "" }) {
    const [items, setItems] = useState(null);
    const [offset, setOffset] = useState(Math.floor(Math.random() * 50));
    const [isLoading, setIsLoading] = useState(false);
    const [savingToHistory, setSavingToHistory] = useState(null);

    const handleSaveToHistory = async (playlist, e) => {
        e.stopPropagation();
        if (savingToHistory === playlist.id) {
            console.debug('Already saving playlist:', playlist.id);
            return;
        }

        console.debug('Saving playlist to history:', {
            playlistId: playlist.id,
            playlistName: playlist.name,
            currentMood,
        });

        setSavingToHistory(playlist.id);
        try {
            const payload = {
                playlist_id: playlist.id,
                playlist_name: playlist.name,
                playlist_url: playlist.external_urls.spotify,
                mood: currentMood,
                image_url: playlist.images[0].url
            };
            console.debug('Sending payload:', payload);

            const response = await axios.post('/history/add', payload);
            console.debug('Successfully saved to history:', response.data);
        } catch (error) {
            console.error('Error saving to history:', {
                error: error.response?.data || error.message,
                playlist: playlist.id,
                mood: currentMood
            });
        } finally {
            setSavingToHistory(null);
        }
    };

    const openPlaylist = (url, e) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };

    const requestPlaylists = async () => {
        setIsLoading(true);
        const query = emotion.join("&genre:");
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=genre:${query}&type=playlist&limit=50&offset=${offset}`, {
                headers: {
                    Authorization: `Bearer ${accessKey}`,
                },
            });
            const jsonData = await response.json();
            setItems(
                jsonData.playlists.items.sort(() => 0.5 - Math.random()).slice(0, 3)
            );
        } catch (error) {
            console.error('Error fetching playlists:', error);
        } finally {
            setIsLoading(false);
            setOffset(Math.floor(Math.random() * 50));
        }
    };

    return (
        <div className="space-y-6">
            {items ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-300">Based on your mood</p>
                        <button
                            onClick={requestPlaylists}
                            disabled={isLoading}
                            className="flex items-center gap-2 rounded-lg border border-primary bg-transparent px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-dark disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Refresh
                                </>
                            )}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                <img
                                    src={item.images[0].url}
                                    alt={item.name}
                                    className="aspect-square w-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={(e) => handleSaveToHistory(item, e)}
                                            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                            disabled={savingToHistory === item.id}
                                        >
                                            {savingToHistory === item.id ? (
                                                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => openPlaylist(item.external_urls.spotify, e)}
                                            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-1">
                                            {item.tracks.total} tracks
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex justify-center">
                    <button
                        onClick={requestPlaylists}
                        className="flex items-center gap-2 rounded-lg border border-primary bg-transparent px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-dark"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        Get Playlist Suggestions
                    </button>
                </div>
            )}
        </div>
    );
}
