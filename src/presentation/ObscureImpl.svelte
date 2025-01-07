<script lang="ts">

import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';
</script>

<Slide>
	<Code>
		{`
		    public String getGreetingFromAuthenticationState(AuthenticationState state) {
        if (state instanceof AuthenticationState.Unauthenticated) {
            return "Welcome guest!";
        } else {
            if (state instanceof AuthenticationState.Authenticated) {
                AuthenticationState.Authenticated authenticated = (AuthenticationState.Authenticated) state;
                if (authenticated.user() instanceof User.AdminUser) {
                    User.AdminUser adminUser = (User.AdminUser) authenticated.user();
                    if (adminUser.adminLevel() == AdminLevel.ROOT) {
                        if (authenticated.lastConnection() == null) {
                            return "Greetings grand master, welcome!";
                        } else {
                            return "Greetings grand master, glad you are back!";

                        }
                    } else {
                        if (authenticated.lastConnection() == null) {
                            return "Hi " + adminUser.username() + ", welcome!";
                        } else {

                            return "Hi " + adminUser.username() + ", glad you are back!";
                        }
                    }
                } else {
                    if (authenticated.user() instanceof User.NormalUser) {
                        User.NormalUser normalUser = (User.NormalUser) authenticated.user();
                        if (authenticated.lastConnection() == null) {
                            return "Hello " + normalUser.username() + ", welcome!";
                        } else {
                            return "Hello " + normalUser.username() + ", glad you are back!";
                        }
                    } else {
                        throw new IllegalStateException("Unknown user type");
                    }
                }
            } else {
                if (state instanceof AuthenticationState.AuthenticationError) {
                    AuthenticationState.AuthenticationError error = (AuthenticationState.AuthenticationError) state;
                    if (error.errorCode() == 401) {
                        return "Oops, couldn't log you in (reason: bad credentials).";
                    } else {
                        if (error.errorCode() == 404) {
                            return "Sorry, this account has been deleted or doesn't exist.";
                        } else {
                            if (error.errorCode() == 503) {
                                return "Impossible to connect to the authentication server.";
                            } else {
                                return "An unknown error happened.";
                            }
                        }
                    }
                } else {
                    throw new IllegalStateException("Unknown authentication state");
                }
            }
        }
    }
		`}
	</Code>
</Slide>