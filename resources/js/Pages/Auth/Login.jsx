import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex items-center justify-center min-h-screen bg-black">
                <form
                    onSubmit={submit}
                    className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg"
                    style={{
                        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <h2 className="text-3xl font-extrabold text-center text-green-600">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Please log in to your account
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mt-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-green-300"
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-green-300"
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    {/* Forgot Password and Submit */}
                    <div className="mt-6 flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-green-500 underline hover:text-green-600"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className={`rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-400 focus:ring-2 focus:ring-green-300 ${
                                processing
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            }`}
                        >
                            {processing ? 'Processing...' : 'Log in'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
