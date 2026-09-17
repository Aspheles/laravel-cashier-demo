import type { PropsWithChildren } from 'react';
import { SiteHeader } from '@/components/site-header';

export default function SiteLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-1 flex-col items-center bg-[#FDFDFC] p-6 lg:p-8 dark:bg-[#0a0a0a]">
            <SiteHeader />
            {children}
        </div>
    );
}
