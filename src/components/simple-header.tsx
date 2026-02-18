import { Grid2x2PlusIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export function SimpleHeader() {
	const links = [
		{
			label: 'Home',
			href: '#',
		},
		{
			label: 'About Us',
			href: '#/about',
		},
    {
			label: 'Media',
			href: '#/media',
		}
	];

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
			<nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
				<div className="flex items-center gap-2">
					<Grid2x2PlusIcon className="size-6" />
					<p className="font-mono text-lg font-bold">MPR Consulting</p>
				</div>
				<div className="hidden items-center gap-2 lg:flex">
					{links.map((link) => (
						<a
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
						>
							{link.label}
						</a>
					))}
				</div>
			</nav>
		</header>
	);
}
