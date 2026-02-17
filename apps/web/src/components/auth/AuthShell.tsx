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
		<Card className='shadow-card border-0'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default AuthShell;
