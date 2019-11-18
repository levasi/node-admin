<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand href="#">NavBar</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">
						<router-link to="/" tag="span">Home</router-link>
					</b-nav-item>
					<b-nav-item href="#">
						<router-link to="/posts" tag="span">Posts</router-link>
					</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<!-- <b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
					</b-nav-form>-->

					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em>Login</em>
						</template>
						<b-dropdown-item @click="googleLogin" href="#">Google Login</b-dropdown-item>
						<b-dropdown-item href="#">Profile</b-dropdown-item>
						<b-dropdown-item href="#">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		<router-view></router-view>
	</div>
</template>

<script>
import PostService from "../postService.js";
import { BNavbar } from "bootstrap-vue";
import { addAuthenticationListener } from "../StitchAuth";

export default {
	name: "navigation",
	pluggins: {
		"b-navbar": BNavbar
	},
	props: {},
	data() {
		return {
			posts: [],
			error: "",
			text: "",
			test: "",
			credentials: ""
		};
	},
	methods: {
		googleLogin(){

		},
		async createPost() {
			await PostService.insertPost(this.text);
			const postsData = await PostService.getPosts();
			this.posts = postsData.posts;
			this.text = null;
		},
		async deletePost(id) {
			await PostService.deletePost(id);
			const postsData = await PostService.getPosts();
			this.posts = postsData.posts;
		}
	},
	async created() {
		let appId = "node-admin";
		const client = Stitch.initializeDefaultAppClient(appId);
		this.test = client.auth.isLoggedIn;
		// const credentials = new Stitch.GoogleRedirectCredential();
		// this.credentials = credentials;
		// client.auth.loginWithRedirect(credentials);
		try {
			const postsData = await PostService.getPosts();
			this.posts = postsData.posts;
		} catch (error) {
			this.error = error;
		}
	}
};
</script>

<style lang="scss">
</style>
