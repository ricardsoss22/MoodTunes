import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

export default function History({ auth, history }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Saved Playlists</h2>}
        >
            <Head title="History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {history.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No playlists saved yet.</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Your saved playlists will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {history.map((item) => (
                                        <div
                                            key={`${item.playlist_id}-${item.created_at}`}
                                            className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.playlist_name}
                                                className="aspect-square w-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                                                <div className="flex justify-end">
                                                    <a
                                                        href={item.playlist_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </a>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-white line-clamp-2">
                                                        {item.playlist_name}
                                                    </h3>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                                                            {item.mood}
                                                        </span>
                                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                            {format(new Date(item.created_at), 'MMM d, yyyy')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
