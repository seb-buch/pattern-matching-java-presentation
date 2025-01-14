<script lang="ts">
import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';
import VerticalSpacer from '$lib/VerticalSpacer.svelte';
import Footnote from '$lib/Footnote.svelte';

type GreeterIO = { input: string, output: string  };
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
\t// cas: utilisateur non authentifié
\tif (state instanceof Unauthenticated) {
\t\treturn "Welcome guest!";
\t}
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\t// cas: utilisateur non authentifié
\tif (state instanceof Unauthenticated) {
\t\treturn "Welcome guest!";
\t}

\t// cas: utilisateur authentifié
\tif (state instanceof Authenticated) {
\t\tAuthenticated authenticated = (Authenticated) state;
\t\tUser user = authenticated.user();

\t\t// distinction du type d'utilisateur
\t\tString greeting = greetUser(user);
\t}
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\t// cas: utilisateur non authentifié
\tif (state instanceof Unauthenticated) {
\t\treturn "Welcome guest!";
\t}

\t// cas: utilisateur authentifié
\tif (state instanceof Authenticated) {
\t\tAuthenticated authenticated = (Authenticated) state;
\t\tUser user = authenticated.user();

\t\t// distinction du type d'utilisateur
\t\tString greeting = greetUser(user);

\t\t// distinction nouvel utilisateur / utilisateur récurrent
\t\tLocalDateTime lastConnection = authenticated.lastConnection();
\t\tif (lastConnection == null) {
\t\t\treturn String.format("%s, welcome!", greeting);
\t\t}
\t\treturn String.format("%s, glad you are back!", greeting);
\t}
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\t// cas: utilisateur non authentifié
\tif (state instanceof Unauthenticated) {
\t\treturn "Welcome guest!";
\t}

\t// cas: utilisateur authentifié
\tif (state instanceof Authenticated) {
\t\tAuthenticated authenticated = (Authenticated) state;
\t\tUser user = authenticated.user();

\t\t// distinction du type d'utilisateur
\t\tString greeting = greetUser(user);

\t\t// distinction nouvel utilisateur / utilisateur récurrent
\t\tLocalDateTime lastConnection = authenticated.lastConnection();
\t\tif (lastConnection == null) {
\t\t\treturn String.format("%s, welcome!", greeting);
\t\t}
\t\treturn String.format("%s, glad you are back!", greeting);
\t}

\t// cas: erreur d'authentification
\tAuthenticationError errorState = (AuthenticationError) state;
\treturn greetWhenError(errorState.errorCode());
}`,
];

let mainLogicPatternCodeChunks:string[] = [
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\treturn switch (state) {
\t};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\treturn switch (state) {
\t\t// cas: utilisateur non authentifié
\t\tcase Unauthenticated() -> "Welcome guest!";
\t};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\treturn switch (state) {
\t\t// cas: utilisateur non authentifié
\t\tcase Unauthenticated() -> "Welcome guest!";

\t\t// cas: utilisateur authentifié (nouvel utilisateur)
\t\tcase Authenticated(
\t\t\t\tLocalDateTime lastConnection,
\t\t\t\tUser user
\t\t) when lastConnection == null -> greetUser(user) + ", welcome!";
\t};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\treturn switch (state) {
\t\t// cas: utilisateur non authentifié
\t\tcase Unauthenticated() -> "Welcome guest!";

\t\t// cas: utilisateur authentifié (nouvel utilisateur)
\t\tcase Authenticated(
\t\t\t\tLocalDateTime lastConnection,
\t\t\t\tUser user
\t\t) when lastConnection == null -> greetUser(user) + ", welcome!";

\t\t// cas: utilisateur authentifié (utilisateur récurrent)
\t\tcase Authenticated(
\t\t\t\tLocalDateTime _,
\t\t\t\tUser user
\t\t) -> greetUser(user) + ", glad you are back!";
\t};
}`,
	`
String getGreetingFromAuthenticationState(AuthenticationState state) {
\treturn switch (state) {
\t\t// cas: utilisateur non authentifié
\t\tcase Unauthenticated() -> "Welcome guest!";

\t\t// cas: utilisateur authentifié (nouvel utilisateur)
\t\tcase Authenticated(
\t\t\t\tLocalDateTime lastConnection,
\t\t\t\tUser user
\t\t) when lastConnection == null -> greetUser(user) + ", welcome!";

\t\t// cas: utilisateur authentifié (utilisateur récurrent)
\t\tcase Authenticated(
\t\t\t\tLocalDateTime _,
\t\t\t\tUser user
\t\t) -> greetUser(user) + ", glad you are back!";

\t\t// cas: erreur d'authentification
\t\tcase AuthenticationError(int errorCode) -> greetWhenError(errorCode);
\t};
}`,
];


let authenticatedLogicNoPatternCodeChunks: string[] = [
	`
String greetUser(User user) {
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}

\t// cas: root
\tif (user instanceof AdminUser adminUser && adminUser.adminLevel() == AdminLevel.ROOT)
\t\treturn "Greetings grand master";

\t// cas: admin
\treturn String.format("Hi %s", user.username());
}`,
];

let authenticatedLogicDefenseNoPatternCodeChunks: string[]=[
	`
String greetUser(User user) {
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}

\tif (user instanceof AdminUser adminUser) {
\t\tAdminLevel adminLevel = adminUser.adminLevel();
\t}
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}

\tif (user instanceof AdminUser adminUser) {
\t\tAdminLevel adminLevel = adminUser.adminLevel();

\t\t// cas: root
\t\tif (adminLevel == AdminLevel.ROOT)
\t\t\treturn "Greetings grand master";

\t\t// cas: admin
\t\tif (adminLevel == AdminLevel.ADMIN)
\t\t\treturn String.format("Hi %s", user.username());
\t}
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}

\tif (user instanceof AdminUser adminUser) {
\t\tAdminLevel adminLevel = adminUser.adminLevel();

\t\t// cas: root
\t\tif (adminLevel == AdminLevel.ROOT)
\t\t\treturn "Greetings grand master";

\t\t// cas: admin
\t\tif (adminLevel == AdminLevel.ADMIN)
\t\t\treturn String.format("Hi %s", user.username());

\t\t// garde-fou
\t\tthrow new AssertionError("Unknown admin level:" + adminLevel);
\t}
}`,
	`
String greetUser(User user) {
\t// cas: utilisateur normal
\tif (user instanceof NormalUser) {
\t\treturn String.format("Hello %s", user.username());
\t}

\tif (user instanceof AdminUser adminUser) {
\t\tAdminLevel adminLevel = adminUser.adminLevel();

\t\t// cas: root
\t\tif (adminLevel == AdminLevel.ROOT)
\t\t\treturn "Greetings grand master";

\t\t// cas: admin
\t\tif (adminLevel == AdminLevel.ADMIN)
\t\t\treturn String.format("Hi %s", user.username());

\t\t// garde-fou
\t\tthrow new AssertionError("Unknown admin level:" + adminLevel);
\t}

\t// garde-fou
\tthrow new AssertionError("Unknown user:" + user);
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
\t\t// cas: root
\t\tcase AdminUser(String _, AdminLevel lvl) when lvl == AdminLevel.ROOT -> "Greetings grand master";
\t};
}`,
	`
String greetUser(User user) {
\treturn switch (user) {
\t\t// cas: root
\t\tcase AdminUser(String _, AdminLevel lvl) when lvl == AdminLevel.ROOT -> "Greetings grand master";

\t\t// cas: admin
\t\tcase AdminUser(String username, AdminLevel _) -> "Hi " + username;
\t};
}`,
	`
String greetUser(User user) {
\treturn switch (user) {
\t\t// cas: root
\t\tcase AdminUser(String _, AdminLevel lvl) when lvl == AdminLevel.ROOT -> "Greetings grand master";

\t\t// cas: admin
\t\tcase AdminUser(String username, AdminLevel _) -> "Hi " + username;

\t\t// cas: utilisateur normal
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
				position: absolute;
				bottom: 0;
				right: 0;
    }

		p.conclusion {
				padding-top: 1em;
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

{#snippet dataModelChunkSnippet(limit: number)}
<Slide autoAnimate autoAnimateRestart="{limit===0 ? true:null}">
	<h3>Modèle de données</h3>
	<VerticalSpacer height="2em" />
	<Code id="greeter-data" width="1600px">
		{concatenateCodeChunks(dataModelCodeChunks, limit)}
	</Code>
</Slide>
{/snippet}

{#snippet logicChunkSnippet(chunk:string, index: number, title: string, conclusion: string | undefined=undefined, separation: string='2em')}
	<Slide autoAnimate autoAnimateRestart="{index===0 ? true:null}">
		<h3>{title}</h3>
		<VerticalSpacer height="{separation}"/>
		<Code id="greeter-nopattern" width="1600px">
		{chunk}
	</Code>
		{#if conclusion}
			<p class="fragment conclusion">{conclusion}</p>
		{/if}
	</Slide>
{/snippet}


	<Slide  >
		<h3>Exemple concret: un <em>greeter</em></h3>
		<p>Fonction qui renvoie un message en fonction de l’état d'authentification d’un utilisateur:</p>
		<table>
			<tbody>
			<tr class="fragment" data-fragment-index="1" >
				<td style="padding-bottom: 2em">Visiteur anonyme</td>
				<td style="padding-bottom: 2em">⟹</td>
				<td style="padding-bottom: 2em"><code style="color:var(--r-heading-color)">Welcome guest!</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="2">
				<td>Utilisateur</td>
				<td>⟹</td>
				<td><code style="color:var(--r-heading-color)">Hello &lbrace;username&rbrace;, &lbrace;welcome_message&rbrace;!</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="2">
				<td>Administrateur</td>
				<td>⟹</td>
				<td><code style="color:var(--r-heading-color)">Hi &lbrace;username&rbrace;, &lbrace;welcome_message&rbrace;!</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="2">
				<td style="padding-bottom: 2em">Root</td>
				<td style="padding-bottom: 2em">⟹</td>
				<td style="padding-bottom: 2em"><code style="color:var(--r-heading-color)">Greetings grand master, &lbrace;welcome_message&rbrace;!</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="3">
				<td>Erreur (code: 401)</td>
				<td>⟹</td>
				<td><code style="color:var(--r-heading-color)">Oops, couldn't log you in (reason: bad credentials).</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="3">
				<td>Erreur (code: 404)</td>
				<td>⟹</td>
				<td><code style="color:var(--r-heading-color)">Sorry, this account has been deleted or doesn't exist.</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="3">
				<td>Erreur (code: 5xx)</td>
				<td>⟹</td>
				<td><code style="color:var(--r-heading-color)">Impossible to connect to the authentication server.</code></td>
			</tr>
			<tr class="fragment" data-fragment-index="3">
				<td>Erreur (code: autre)</td>
				<td>⟹</td>
				<td><code style="color:var(--r-heading-color)">An unknown error happened. (code: &lbrace;code&rbrace;).</code></td>
			</tr>
			</tbody>
		</table>
		<p class="explanation fragment" data-fragment-index="2">
			<code>&lbrace;welcome_message&rbrace;</code> = "welcome" si première
			connection; "glad you are
			back" sinon
		</p>
	</Slide>

<section>
{#each { length : dataModelCodeChunks.length }, index}
	{@render dataModelChunkSnippet(index)}
{/each}
</section>

<section>
{#each mainLogicNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Logique principale – pattern matching ❌', index===mainLogicNoPatternCodeChunks.length-1 ? 'Exhaustivité 😔' : undefined, '1em')}
{/each}
</section>

<section>
{#each mainLogicPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Logique principale – pattern matching ✅', index===mainLogicPatternCodeChunks.length-1 ? 'Exhaustivité 😃' : undefined, '1em')}
{/each}
</section>

<section>
{#each authenticatedLogicNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Distinction utilisateur authentifié – pattern matching ❌', index===authenticatedLogicNoPatternCodeChunks.length-1 ? 'Exhaustivité 😔' : undefined, '3em')}
{/each}
</section>

<section>
{#each authenticatedLogicDefenseNoPatternCodeChunks as chunk, index}
	{@render logicChunkSnippet(chunk, index, 'Distinction utilisateur authentifié (alt) – pattern matching ❌', index===authenticatedLogicDefenseNoPatternCodeChunks.length-1 ? 'Exhaustivité (à l\'exécution) 🙂 – Lisibilité 🫤' : undefined, '3em')}
{/each}
</section>

<section>
	{#each authenticatedLogicPatternCodeChunks as chunk, index}
		{@render logicChunkSnippet(chunk, index, 'Cas utilisateur authentifié – pattern matching ✅', index===authenticatedLogicPatternCodeChunks.length-1 ? 'Exhaustivité (à la compilation) 😃 – Lisibilité 😃' : undefined, '5em')}
	{/each}
</section>

<section>
	<Slide autoAnimate autoAnimateRestart>
		<h3 data-id="title">Cas erreur d'authentification – pattern matching ❌</h3>
		<VerticalSpacer height="5em"/>
		<Code id="logic-error"  width="1400px">
	 {`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\t}
\t};
}
`
	 }
	</Code>
	</Slide>
	<Slide autoAnimate>
		<h3 data-id="title">Cas erreur d'authentification – pattern matching ❌</h3>
		<VerticalSpacer height="5em"/>
		<Code id="logic-error"  width="1400px">
	 {`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t\t}
\t};
}
`
	 }
	</Code>
	</Slide>
	<Slide autoAnimate>
		<h3 data-id="title">Cas erreur d'authentification – pattern matching ❌</h3>
		<VerticalSpacer height="5em"/>
		<Code id="logic-error"  width="1400px">
	 {`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t\tdefault -> {
\t\t\tif (errorCode >= 500 && errorCode < 600)
\t\t\t\tyield "Impossible to connect to the authentication server.";
\t\t}
\t};
}
`
	 }
	</Code>
	</Slide>
	<Slide autoAnimate>
		<h3 data-id="title">Cas erreur d'authentification – pattern matching ❌</h3>
		<VerticalSpacer height="5em"/>
		<Code id="logic-error"  width="1400px">
	 {`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t\tdefault -> {
\t\t\tif (errorCode >= 500 && errorCode < 600)
\t\t\t\tyield "Impossible to connect to the authentication server.";
\t\t\tyield String.format("An unknown error happened. (code: %d)", errorCode);
\t\t}
\t};
}
`
	 }
	</Code>
		<p class="fragment conclusion">Exhaustivité 😃 – Lisibilité 🫤</p>
	</Slide>
	<Slide autoAnimate >
		<h3 data-id="title">Cas erreur d'authentification – pattern matching ✅</h3>
		<VerticalSpacer height="5em"/>
		<Code id="logic-error" width="1400px">
	 {`
String greetWhenError(int errorCode) {
\treturn switch (errorCode) {
\t\tcase 401 -> "Oops, couldn't log you in (reason: bad credentials).";
\t\tcase 404 -> "Sorry, this account has been deleted or doesn't exist.";
\t\tcase int i when (i >= 500 && i < 600) -> "Impossible to connect to the authentication server.";
\t\tcase int i -> String.format("An unknown error happened. (code: %d)", i);
\t};
}
`
	 }
	</Code>
		<p class="fragment conclusion">Exhaustivité 😃 – Lisibilité 😃</p>
		<Footnote><em>Pattern matching</em> avec type primitif &rarr; Java 23 <em>Preview</em></Footnote>
	</Slide>
</section>