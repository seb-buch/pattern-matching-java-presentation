<script lang="ts">
import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';
import VerticalSpacer from '$lib/VerticalSpacer.svelte';

type GreeterIO = { input: string, output: string };
let greeterIOs: GreeterIO[] = [
	{ input: 'Visiteur anonyme', output: 'Welcome guest!' },
	{ input: 'Utilisateur', output: 'Hello {username}, {welcome_message}!' },
	{ input: 'Administrateur', output: 'Hi {username}, {welcome_message}!' },
	{ input: 'Root', output: 'Greetings grand master, {welcome_message}!' },
	{ input: 'Erreur (code: 401)', output: 'Oops, couldn\'t log you in (reason: bad credentials).' },
	{ input: 'Erreur (code: 404)', output: 'Sorry, this account has been deleted or doesn\'t exist.' },
	{ input: 'Erreur (code: 5XX)', output: 'Impossible to connect to the authentication server.' },
	{ input: 'Erreur (code: autre)', output: 'An unknown error happened. (code: {code})' }
];

let dataModelCodeChunks: string[] = [
	`
public sealed interface AuthenticationState permits Unauthenticated, Authenticated, AuthenticationError {}`,
	`
// cas: utilisateur non authentifié
public record Unauthenticated() implements AuthenticationState {}`,
	`
// cas: utilisateur authentifié
public record Authenticated(LocalDateTime lastConnection, User user) implements AuthenticationState {}`,
	`
// distinction du type d'utilisateur
public sealed interface User permits NormalUser, AdminUser {
    String username();
}`,
	`public record NormalUser(String username) implements User {}`,
	`public record AdminUser(String username, AdminLevel adminLevel) implements User {}
public enum AdminLevel {
	ADMIN,
	ROOT
}`,
	`
// cas: erreur d'authentification
public record AuthenticationError(int errorCode) implements AuthenticationState {}`,
];

type LogicStep = {
	mainLogicChunk:string,
	authenticatedLogidChunk:string,

}
let mainLogicNoPatternCodeChunks:string[]=[
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		if (state instanceof Unauthenticated) {
				return "Welcome guest!";
		}
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		if (state instanceof Unauthenticated) {
				return "Welcome guest!";
		}
		if (state instanceof Authenticated) {
				Authenticated authenticated = (Authenticated) state;
				User user = authenticated.user();
				String greeting = greetUser(user);
		}
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		if (state instanceof Unauthenticated) {
				return "Welcome guest!";
		}
		if (state instanceof Authenticated) {
				Authenticated authenticated = (Authenticated) state;
				User user = authenticated.user();
				String greeting = greetUser(user);
				LocalDateTime lastConnection = authenticated.lastConnection();
				if (lastConnection == null) {
						return String.format("%s, welcome!", greeting);
				}
				return String.format("%s, glad you are back!", greeting);
		}
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		if (state instanceof Unauthenticated) {
				return "Welcome guest!";
		}
		if (state instanceof Authenticated) {
				Authenticated authenticated = (Authenticated) state;
				User user = authenticated.user();
				String greeting = greetUser(user);
				LocalDateTime lastConnection = authenticated.lastConnection();
				if (lastConnection == null) {
						return String.format("%s, welcome!", greeting);
				}
				return String.format("%s, glad you are back!", greeting);
		}
		AuthenticationError errorState = (AuthenticationError) state;
		return greetWhenError(errorState.errorCode());
}`,
];

let authenticatedLogicNoPatternCodeChunks: string[] = [
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
}`,
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
		if (user instanceof AdminUser adminUser && adminUser.adminLevel() == AdminLevel.ROOT)
				return "Greetings grand master";
		return String.format("Hi %s", user.username());
}`,
];

let authenticatedLogicDefenseNoPatternCodeChunks: string[]=[
	`
String greetUser(User user) {
}`,
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
}`,
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
		if (user instanceof AdminUser adminUser) {
		}
}`,
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
		if (user instanceof AdminUser adminUser) {
				AdminLevel adminLevel = adminUser.adminLevel();
				if (adminLevel == AdminLevel.ROOT)
						return "Greetings grand master";
				if (adminLevel == AdminLevel.ADMIN)
						return String.format("Hi %s", user.username());
		}
}`,
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
		if (user instanceof AdminUser adminUser) {
				AdminLevel adminLevel = adminUser.adminLevel();
				if (adminLevel == AdminLevel.ROOT)
						return "Greetings grand master";
				if (adminLevel == AdminLevel.ADMIN)
						return String.format("Hi %s", user.username());
				throw new AssertionError("Unknown admin level:" + adminLevel);
		}
}`,
	`
String greetUser(User user) {
		if (user instanceof NormalUser) {
				return String.format("Hello %s", user.username());
		}
		if (user instanceof AdminUser adminUser) {
				AdminLevel adminLevel = adminUser.adminLevel();
				if (adminLevel == AdminLevel.ROOT)
						return "Greetings grand master";
				if (adminLevel == AdminLevel.ADMIN)
						return String.format("Hi %s", user.username());
				throw new AssertionError("Unknown admin level:" + adminLevel);
		}
		throw new AssertionError("Unknown user:" + user);
}`,
];

let errorLogicNoPatternCodeChunks:string[] = [
	`
String greetWhenError(AuthenticationError authenticationError) {
		int errorCode = authenticationError.errorCode();

		return switch (errorCode) {
		};
}`,
	`
String greetWhenError(AuthenticationError authenticationError) {
		int errorCode = authenticationError.errorCode();

		return switch (errorCode) {
				case 401 -> "Oops, couldn't log you in (reason: bad credentials).";
		};
}`,
	`
String greetWhenError(AuthenticationError authenticationError) {
		int errorCode = authenticationError.errorCode();

		return switch (errorCode) {
				case 401 -> "Oops, couldn't log you in (reason: bad credentials).";
				case 404 -> "Sorry, this account has been deleted or doesn't exist.";
		};
}`,
	`
String greetWhenError(AuthenticationError authenticationError) {
		int errorCode = authenticationError.errorCode();

		return switch (errorCode) {
				case 401 -> "Oops, couldn't log you in (reason: bad credentials).";
				case 404 -> "Sorry, this account has been deleted or doesn't exist.";
				default -> {
				}
		};
}`,
	`
String greetWhenError(AuthenticationError authenticationError) {
		int errorCode = authenticationError.errorCode();

		return switch (errorCode) {
				case 401 -> "Oops, couldn't log you in (reason: bad credentials).";
				case 404 -> "Sorry, this account has been deleted or doesn't exist.";
				default -> {
						if (errorCode >= 500 && errorCode < 600)
								yield "Impossible to connect to the authentication server.";
				}
		};
}`,
	`
String greetWhenError(AuthenticationError authenticationError) {
		int errorCode = authenticationError.errorCode();

		return switch (errorCode) {
				case 401 -> "Oops, couldn't log you in (reason: bad credentials).";
				case 404 -> "Sorry, this account has been deleted or doesn't exist.";
				default -> {
						if (errorCode >= 500 && errorCode < 600)
								yield "Impossible to connect to the authentication server.";
						yield String.format("An unknown error happened. (code: %d)", errorCode);
				}
		};
}`,
];

let mainLogicPatternCodeChunks:string[] = [
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		return switch (state) {
		};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		return switch (state) {
				case Unauthenticated() -> "Welcome guest!";
		};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		return switch (state) {
				case Unauthenticated() -> "Welcome guest!";

				case Authenticated(
								LocalDateTime lastConnection,
								User user
				) when lastConnection == null -> greetUser(user) + ", welcome!";
		};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		return switch (state) {
				case Unauthenticated() -> "Welcome guest!";

				case Authenticated(
								LocalDateTime lastConnection,
								User user
				) when lastConnection == null -> greetUser(user) + ", welcome!";

				case Authenticated(
								LocalDateTime _,
								User user
				) -> greetUser(user) + ", glad you are back!";
		};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
		return switch (state) {
				case Unauthenticated() -> "Welcome guest!";

				case Authenticated(
								LocalDateTime lastConnection,
								User user
				) when lastConnection == null -> greetUser(user) + ", welcome!";

				case Authenticated(
								LocalDateTime _,
								User user
				) -> greetUser(user) + ", glad you are back!";

				case AuthenticationError(int errorCode) -> greetWhenError(errorCode);
		};
}`,
];

let authenticatedLogicPatternCodeChunks:string[]=[
	`
String greetUser(User user) {
\treturn switch (user) {
\t};
}`,
	`
String greetUser(User user) {
\treturn switch (user) {
\t\tcase AdminUser(String _, AdminLevel lvl) when lvl == AdminLevel.ROOT -> "Greetings grand master";
\t};
}`,
	`
String greetUser(User user) {
\treturn switch (user) {
\t\tcase AdminUser(String _, AdminLevel lvl) when lvl == AdminLevel.ROOT -> "Greetings grand master";
\t\tcase AdminUser(String username, AdminLevel _) -> "Hi " + username;
\t};
}`,
	`
String greetUser(User user) {
\treturn switch (user) {
\t\tcase AdminUser(String _, AdminLevel lvl) when lvl == AdminLevel.ROOT -> "Greetings grand master";
\t\tcase AdminUser(String username, AdminLevel _) -> "Hi " + username;
\t\tcase NormalUser(String username) -> "Hello " + username;
\t};
}`,
]

let errorLogicPatternMatching: string[] = [
	`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t};
}`,
	`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t};
}`,
	`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t};
}`,
	`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t\tcase int i when (i >= 500 && i < 600) -> "Impossible to connect to the authentication server.";
\t};
}`,
	`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t\tcase int i when (i >= 500 && i < 600) -> "Impossible to connect to the authentication server.";
\t\tcase int i -> String.format("An unknown error happened. (code: %d)", i);
\t};
}`,
];

function concatenateCodeChunks(chunks: string[], limit: number) : String{
	return chunks.slice(0, limit+1).join('\n');
}
</script>

<style>
    p.explanation {
        font-size: 0.7em;
        font-style: italic;
    }

    table {
        margin: 1em auto;
        font-size: 0.9em;

        tr {
            td {
                border-bottom: none;
            }

            td:not(:last-child) {
                padding-bottom: 0.6em;
            }

            & td:nth-child(2) {
                padding: 0 1.5em;
            }

        }
    }
</style>

{#snippet greeterIOSnippet(greeterIO: GreeterIO, index: Number)}
	<tr class="fragment" data-fragment-index="{index}">
		<td>{greeterIO.input}</td>
		<td>⟹</td>
		<td><code>{greeterIO.output}</code></td>
	</tr>
{/snippet}

{#snippet dataModelChunkSnippet(limit: number)}
<Slide autoAnimate autoAnimateRestart="{limit===0 ? true:null}">
	<h3>Modèle de données</h3>
	<Code id="greeter-data" width="1600px">
		{concatenateCodeChunks(dataModelCodeChunks, limit)}
	</Code>
</Slide>
{/snippet}

{#snippet logicChunkSnippet(chunk:string, index: number, title: string)}
	<Slide autoAnimate autoAnimateRestart="{index===0 ? true:null}">
		<h3>{title}</h3>
		<VerticalSpacer height="2em"/>
		<Code id="greeter-nopattern" width="1600px">
		{chunk}
	</Code>
	</Slide>
{/snippet}

<Slide>
	<h3>Exemple concret: un <em>greeter</em></h3>
	<p>Fonction qui renvoie un message en fonction de l’état d'authentification d’un utilisateur:</p>
	<table>
		{#each greeterIOs as greeterIO, index}
			{@render greeterIOSnippet(greeterIO, index)}
		{/each}
	</table>
	<p class="fragment explanation" data-fragment-index="1">
		<code>&lbrace;welcome_message&rbrace;</code> = "welcome" si première
		connection; "glad you are
		back" sinon
		<br />
	</p>
</Slide>

<section>
{#each { length : dataModelCodeChunks.length }, index}
	{@render dataModelChunkSnippet(index)}
{/each}
</section>

<section>
{#each mainLogicNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Logique principale – pattern matching ❌')}
{/each}
</section>

<section>
{#each authenticatedLogicNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Cas utilisateur authentifié – pattern matching ❌')}
{/each}
</section>

<section>
{#each authenticatedLogicDefenseNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Cas utilisateur authentifié (alt) – pattern matching ❌')}
{/each}
</section>

<section>
{#each errorLogicNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Cas erreur d\'authentification – pattern matching ❌')}
{/each}
</section>

<section>
{#each mainLogicPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Logique principale – pattern matching ✅')}
{/each}
</section>

<section>
{#each authenticatedLogicPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Cas utilisateur authentifié – pattern matching ✅')}
{/each}
</section>

<section>
{#each errorLogicPatternMatching as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Cas erreur d\'authentification – pattern matching ✅')}
{/each}
</section>