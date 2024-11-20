import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 py-2 text-sm font-medium leading-5 transition duration-200 ease-in-out ' +
                (active
                    ? 'text-white bg-green-500 border-b-2 border-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white dark:bg-green-700 dark:border-green-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700 focus:text-white focus:bg-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
