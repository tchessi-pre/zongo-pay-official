import zongoLogo from '@/assets/zongo-logo.png';

type AuthHeaderProps = {
	title: string;
	subtitle: string;
};

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
	return (
		<div className='text-center'>
			<img src={zongoLogo} alt='Zongo Pay' className='h-20 mx-auto mb-2' />
			<h1 className='text-xl font-bold text-foreground'>{title}</h1>
			<p className='text-muted-foreground mt-2'>{subtitle}</p>
		</div>
	);
};	

export default AuthHeader;
