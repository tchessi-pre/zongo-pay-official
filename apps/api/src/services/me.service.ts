import { prisma } from '../db.js';

/**
 * Retrieves the authenticated user's profile and associated wallets.
 * 
 * @async
 * @function
 * @name getMe
 * @kind function
 * @param {string} userId
 * @returns {Promise<{ user: { id: string; phone: string; fullName: string; }; wallets: { id: string; balance: Decimal; currency: string; provider: string; }[]; }>}
 * @exports
 */
export async function getMe(userId: string) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!user) {
		throw new Error('USER_NOT_FOUND');
	}

	const wallets = await prisma.wallet.findMany({
		where: { userId: user.id },
	});

	return {
		user: {
			id: user.id,
			phone: user.phone,
			fullName: user.fullName,
		},
		wallets: wallets.map((w) => ({
			id: w.id,
			balance: w.balance,
			currency: w.currency,
			provider: w.provider,
		})),
	};
}
