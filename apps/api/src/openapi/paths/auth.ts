export const authRegisterPath = {
	post: {
		tags: ['Auth'],
		operationId: 'postAuthRegister',
		summary: 'Inscription par téléphone et PIN',
		security: [],
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/AuthRegisterRequest',
					},
				},
			},
		},
		responses: {
			'201': {
				description: 'Utilisateur créé et connecté',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/AuthRegisterResponse',
						},
					},
				},
			},
			'400': {
				description: 'Données invalides',
			},
			'409': {
				description: 'Utilisateur déjà existant',
			},
			'500': {
				description: 'Erreur interne du serveur',
			},
		},
	},
};

export const authLoginPath = {
	post: {
		tags: ['Auth'],
		operationId: 'postAuthLogin',
		summary: "Démarre la connexion (PIN -> envoi d'un code)",
		security: [],
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/AuthLoginRequest',
					},
				},
			},
		},
		responses: {
			'200': {
				description: 'Code de validation envoyé',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/AuthLoginStartResponse',
						},
					},
				},
			},
			'400': {
				description: 'Données invalides',
			},
			'401': {
				description: 'Identifiants invalides',
			},
			'500': {
				description: 'Erreur interne du serveur',
			},
		},
	},
};

export const authLoginVerifyPath = {
	post: {
		tags: ['Auth'],
		operationId: 'postAuthLoginVerify',
		summary: 'Vérifie le code et termine la connexion',
		security: [],
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/AuthLoginOtpRequest',
					},
				},
			},
		},
		responses: {
			'200': {
				description: 'Connexion réussie',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/AuthRegisterResponse',
						},
					},
				},
			},
			'400': {
				description: 'Données invalides',
			},
			'401': {
				description: 'Code invalide ou expiré',
			},
			'404': {
				description: 'Utilisateur introuvable',
			},
			'500': {
				description: 'Erreur interne du serveur',
			},
		},
	},
};
