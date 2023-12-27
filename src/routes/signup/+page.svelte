<script lang="ts">
	import { enhance } from "$app/forms";

	import type { ActionData } from './$types';
	
	export let form: ActionData;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<input type="submit" />
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
<a href="/login">Sign in</a>

<style>
    
#username {
	margin: 15px;
}

#password {
	margin: 15px;
}

input {
	border:  1px solid black;
}

form {
	width: clamp(120px, 50vw, 420px);
	height: 2.5rem;
	padding: 0 1.25rem;
	border: 1px solid black;
	border-radius: 2px;
	margin: 0.625rem auto;
	transition: all 250ms;
	@media (min-width: 768px) {
		width: clamp(120px, 35vw, 420px);
	}
}

</style>