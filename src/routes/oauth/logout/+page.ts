// THIS IS A CLIENT-SIDE ONLY PAGE
export const ssr = false;

import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { resolve } from '$app/paths';
import { createKeycloakApi } from '$lib/api';

export const load: PageLoad = async ({ fetch }) => {
	const redirectUri = window.location.origin + resolve('/oauth/logout/callback');

	const logoutUrl = createKeycloakApi(fetch, new URL(window.location.href)).logoutUrl({
		// We are doing a front-channel logout, so we don't pass a refresh token
		postLogoutRedirectUri: redirectUri
	});
	throw redirect(302, logoutUrl);
};
