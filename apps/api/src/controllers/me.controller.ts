import type { Context } from 'hono';
import { getMe } from '../services/me.service.js';

/**
 * Retrieves the authenticated user's profile and wallet information.
 *
 * @async
 * @function
 * @name meController
 * @kind function
 * @param {Context<any>} c
 * @returns {Promise<JSONRespondReturn<{ code: string; message: string; }, 401> | JSONRespondReturn<{ user: { id: string; phone: string; fullName: string; }; wallets: { id: string; balance: Decimal; currency: string; provider: string; }[]; }, ContentfulStatusCode> | JSONRespondReturn<{ code: string; message: string; }, 404>>}
 * @exports
 */
export async function meController(c: Context) {
	const user = c.get('user') as { id: string } | undefined;

	if (!user) {
		return c.json(
			{
				code: 'UNAUTHORIZED',
				message: 'Utilisateur non authentifié',
			},
			401
		);
	}

	try {
		const result = await getMe(user.id);
		return c.json(result);
	} catch (error) {
		if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
			return c.json(
				{
					code: 'USER_NOT_FOUND',
					message: "L'utilisateur n'existe plus",
				},
				404
			);
		}

		throw error;
	}
}
