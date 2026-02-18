import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

type AuthShellProps = {
	title: string;
	description: string;
	children: ReactNode;
};

const AuthShell = ({ title, description, children }: AuthShellProps) => {
	return (
		<Card className='shadow-card border-0 max-h-[90vh] flex flex-col animate-slide-up'>
			<CardHeader className='pb-2'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='pt-2 overflow-y-auto'>{children}</CardContent>
		</Card>
	);
};

export default AuthShell;
