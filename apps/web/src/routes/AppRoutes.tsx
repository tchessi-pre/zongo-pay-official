import type { ComponentType } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Onboarding from '@/pages/Onboarding';
import Auth from '@/pages/Auth';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import SendMoney from '@/pages/Send';
import Receive from '@/pages/Receive';
import Scan from '@/pages/Scan';
import Cagnottes from '@/pages/Cagnottes';
import CreateCagnotte from '@/pages/CreateCagnotte';
import CagnotteDetails from '@/pages/CagnotteDetails';
import InviteParticipants from '@/pages/InviteParticipants';
import ContributeToPool from '@/pages/ContributeToPool';
import Profile from '@/pages/Profile';
import PaymentMethods from '@/pages/PaymentMethods';
import Security from '@/pages/Security';
import Language from '@/pages/Language';
import Help from '@/pages/Help';
import HelpDetail from '@/pages/HelpDetail';
import Support from '@/pages/Support';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';

type AppRouteConfig = {
	path: string;
	component: ComponentType;
	isProtected?: boolean;
};

const appRoutes: AppRouteConfig[] = [
	{ path: '/', component: Index },
	{ path: '/onboarding', component: Onboarding },
	{ path: '/auth', component: Auth },
	{ path: '/login', component: Login },
	{ path: '/register', component: Register },
	{ path: '/dashboard', component: Dashboard, isProtected: true },
	{ path: '/send', component: SendMoney, isProtected: true },
	{ path: '/receive', component: Receive, isProtected: true },
	{ path: '/scan', component: Scan, isProtected: true },
	{ path: '/cagnottes', component: Cagnottes, isProtected: true },
	{ path: '/cagnottes/new', component: CreateCagnotte, isProtected: true },
	{ path: '/cagnottes/:id', component: CagnotteDetails, isProtected: true },
	{
		path: '/cagnottes/:id/invite',
		component: InviteParticipants,
		isProtected: true,
	},
	{
		path: '/cagnottes/:id/contribute',
		component: ContributeToPool,
		isProtected: true,
	},
	{ path: '/profile', component: Profile, isProtected: true },
	{ path: '/payment-methods', component: PaymentMethods, isProtected: true },
	{ path: '/security', component: Security, isProtected: true },
	{ path: '/language', component: Language, isProtected: true },
	{ path: '/help', component: Help, isProtected: true },
	{ path: '/help/:category', component: HelpDetail, isProtected: true },
	{ path: '/support', component: Support, isProtected: true },
	{ path: '/terms', component: Terms, isProtected: true },
	{ path: '*', component: NotFound },
];

const AppRoutes = () => (
	<Routes>
		{appRoutes.map(({ path, component: Component, isProtected }) => (
			<Route
				key={path}
				path={path}
				element={
					isProtected ? (
						<ProtectedRoute>
							<Component />
						</ProtectedRoute>
					) : (
						<Component />
					)
				}
			/>
		))}
	</Routes>
);

export default AppRoutes;
