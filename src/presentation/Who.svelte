<script>
import photo from './assets/wam.png';
</script>

<style>
    div.box {
        width: 50%;
        position: absolute;
        left: 40%;
        top: 300px;

        & p {
            padding-bottom: 2em;
            font-size: 1.2em;

            &.prenom {
                color: var(--r-heading-color);
            }

            & span {
                font-family: "JetBrainsMono Nerd Font", sans-serif;
                padding-right: 0.5em;
            }
        }
    }
</style>

<section data-background-image="{photo}" data-background-size="600px" data-background-position="bottom 0 left 150px">
	<div class="box">
		<p class="prenom">Sébastien Buchoux</p>
		<p>
			Tech Lead / Architecte
		</p>
		<p><span></span> Onepoint Toulouse</p>
		<p><span></span> seb-buch</p>
	</div>
</section>