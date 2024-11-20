import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <form
                onSubmit={submit}
                className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl"
                style={{
                    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
                }}
            >
                <h2 className="text-3xl font-extrabold text-center text-green-600">
                    Create Your Account
                </h2>
                <p className="mt-2 text-center text-gray-600">
                    Join us today!
                </p>

                <div className="mt-6">
                    <label htmlFor="name" className="block text-gray-800">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-green-300"
                        placeholder="Enter your name"
                        required
                    />
                    {errors.name && (
                        <p className="mt-2 text-red-500">{errors.name}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="block text-gray-800">
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
                        <p className="mt-2 text-red-500">{errors.email}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block text-gray-800">
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
                        <p className="mt-2 text-red-500">{errors.password}</p>
                    )}
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-gray-800"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-green-300"
                        placeholder="Confirm your password"
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="mt-2 text-red-500">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <a
                        href={route('login')}
                        className="text-sm text-green-500 underline hover:text-green-600"
                    >
                        Already registered?
                    </a>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-400 focus:ring-2 focus:ring-green-300 ${
                            processing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {processing ? 'Processing...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}
