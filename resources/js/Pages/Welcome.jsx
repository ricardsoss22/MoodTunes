import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to MoodTunes" />
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                {/* Navigation */}
                <nav className="relative px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">
                            MoodTunes
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-white/90 transition hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="relative px-8 py-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                            {/* Left Column - Text Content */}
                            <div className="flex flex-col justify-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    Let your mood guide your music
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                    MoodTunes uses advanced AI to detect your mood through your camera
                                    and creates the perfect Spotify playlist to match how you're feeling.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                        >
                                            Get Started
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                        >
                                            Try it Free
                                        </Link>
                                    )}
                                    <a
                                        href="#features"
                                        className="text-sm font-semibold leading-6 text-white transition hover:text-gray-300"
                                    >
                                        Learn more <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Column - Feature Cards */}
                            <div className="grid auto-rows-fr gap-4 sm:gap-6">
                                {/* Mood Detection Card */}
                                <div className="rounded-xl bg-white/10 p-6 ring-1 ring-inset ring-white/10">
                                    <div className="flex items-center gap-x-4">
                                        <div className="h-12 w-12 flex-none rounded-lg bg-white/10 flex items-center justify-center">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                            </svg>
                                        </div>
                                        <div className="text-base font-semibold leading-7 text-white">
                                            Mood Detection
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-gray-300">
                                        Our AI-powered mood detection analyzes your facial expressions in real-time
                                        to understand how you're feeling.
                                    </p>
                                </div>

                                {/* Spotify Integration Card */}
                                <div className="rounded-xl bg-white/10 p-6 ring-1 ring-inset ring-white/10">
                                    <div className="flex items-center gap-x-4">
                                        <div className="h-12 w-12 flex-none rounded-lg bg-white/10 flex items-center justify-center">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                                            </svg>
                                        </div>
                                        <div className="text-base font-semibold leading-7 text-white">
                                            Spotify Integration
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-gray-300">
                                        Seamlessly connects with Spotify to create personalized playlists
                                        that match your current emotional state.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
