<script>
import photo from './assets/wam.png';
</script>

<style>

    div.box {
        width: 50%;
        position: absolute;
        left: 40%;
        top: 250px;

        & p {
            &:not(:last-child) {
                padding-bottom: 1.5em;
            }

            font-size: 1.2em;

            &.prenom {
                color: var(--r-heading-color);
            }

            & a {
                color: inherit;
            }
        }
    }
</style>

<section data-background-image="{photo}" data-background-size="500px" data-background-position="bottom 0 left 150px">
	<div class="box">
		<p class="prenom">Sébastien Buchoux</p>
		<p>
			Tech Lead / Architecte
		</p>
		<p><i class="fa-solid fa-location-dot"></i> Onepoint Toulouse</p>
		<p><i class="fa-brands fa-linkedin"></i> <a href="https://www.linkedin.com/in/sebastien-buchoux/" target="_blank">sebastien-buchoux</a>
		</p>
		<p><i class="fa-brands fa-github"></i> <a href="https://github.com/seb-buch/" target="_blank">seb-buch</a>
		</p>
	</div>
</section>