import { Head, Link, router, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import SubscriptionController from '@/actions/App/Http/Controllers/SubscriptionController';
import { dashboard, login, register } from '@/routes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Plan } from '@/types';

function formatPrice(cents: number): string {
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    }).format(cents / 100);
}

export default function Welcome({ plans }: { plans: Plan[] }) {
    const { auth } = usePage().props;

    function subscribe(planId: string) {
        if (!auth.user) {
            router.visit(login().url);
            return;
        }

        router.post(SubscriptionController.store().url, { plan: planId });
    }

    return (
        <>
            <Head title="Subscriptions" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-10 flex w-full max-w-5xl items-center justify-between text-sm">
                    <span className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">Cashier Pay</span>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
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

                <main className="w-full max-w-5xl">
                    <div className="mb-12 text-center">
                        <h1 className="text-3xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Pick a subscription</h1>
                        <p className="mt-2 text-[#706f6c] dark:text-[#A1A09A]">Simple, recurring billing powered by Pay.nl.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan) => (
                            <Card key={plan.id} className={cn('flex flex-col', plan.highlighted && 'border-primary shadow-md')}>
                                <CardHeader>
                                    {plan.highlighted && <Badge className="w-fit">Most popular</Badge>}
                                    <CardTitle>{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="mb-6">
                                        <span className="text-3xl font-semibold">{formatPrice(plan.price)}</span>
                                        <span className="text-muted-foreground"> / {plan.interval}</span>
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <Check className="size-4 shrink-0 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={plan.highlighted ? 'default' : 'outline'}
                                        onClick={() => subscribe(plan.id)}
                                    >
                                        Subscribe
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
