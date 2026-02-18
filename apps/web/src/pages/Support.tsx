import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import Header from '@/components/header/Header';
import SupportInfoCard from '@/components/support/SupportInfoCard';
import SupportContactList from '@/components/support/SupportContactList';

const Support = () => {
	const navigate = useNavigate();

	const contactOptions = [
		{
			icon: Phone,
			label: 'Appeler le support',
			description: '+225 07 00 00 00 00',
			action: 'tel:+2250700000000',
		},
		{
			icon: Mail,
			label: 'Envoyer un email',
			description: 'support@zongopay.com',
			action: 'mailto:support@zongopay.com',
		},
		{
			icon: MessageCircle,
			label: 'Chat en direct',
			description: 'Discutez avec un conseiller',
			action: 'chat',
		},
	];

	return (
		<div className='min-h-screen bg-background pb-8'>
			<Header
				title='Contacter le support'
				variant='gradient'
				onBack={() => navigate('/profile')}
			/>

			<div className='px-6 py-6'>
				<div className='space-y-4'>
					<SupportInfoCard
						icon={Clock}
						title="Horaires d'ouverture"
						subtitle='Lun - Sam : 8h00 - 20h00'
					/>
				</div>

				<SupportContactList contacts={contactOptions} />
			</div>
		</div>
	);
};

export default Support;
