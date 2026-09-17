import { Link, usePage } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { home, login, register } from '@/routes';

export function SiteHeader() {
    const { auth } = usePage().props;

    return (
        <header className="mb-10 flex w-full max-w-5xl items-center justify-between text-sm">
            <Link
                href={home()}
                className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
            >
                Cashier Pay
            </Link>
            <nav className="flex items-center gap-4">
                {auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 rounded-sm border border-[#19140035] px-3 py-1 text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                            <UserInfo user={auth.user} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <Link
                            href={login()}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={register()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
