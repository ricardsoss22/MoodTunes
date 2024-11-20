import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

export default function History({ auth, history }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Saved Playlists</h2>}
        >
            <Head title="Saved Playlists" />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {history.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-600 text-lg font-semibold">No saved playlists yet.</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    Save playlists to see them here.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {history.map((item) => (
                                    <div
                                        key={`${item.playlist_id}-${item.created_at}`}
                                        className="relative group bg-gray-50 rounded-lg shadow hover:shadow-md transition"
                                    >
                                        <div className="relative">
                                            <img
                                                src={item.image_url}
                                                alt={item.playlist_name}
                                                className="h-56 w-full object-cover rounded-t-lg"
                                            />
                                            <button
                                                onClick={() => console.log(`Playing ${item.playlist_name}`)}
                                                className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg transition hover:bg-blue-700"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14.752 11.168l-5.197-3.857A1 1 0 008 8.03v7.94a1 1 0 001.555.832l5.197-3.857a1 1 0 000-1.664z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
                                                {item.playlist_name}
                                            </h3>
                                            <div className="mt-2 flex flex-wrap gap-2 text-sm">
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                                    {item.mood}
                                                </span>
                                                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                                    {format(new Date(item.created_at), 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                            <a
                                                href={item.playlist_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block mt-4 text-blue-600 hover:underline text-sm"
                                            >
                                                Open Playlist
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
