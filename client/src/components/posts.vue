<template>
	<b-container class="bv-example-row">
		<b-row>
			<b-col></b-col>
			<b-col>
				<b-form-group class="d-flex">
					<b-form-input @keydown.enter="createPost" v-model="text" placeholder="Enter titile"></b-form-input>
					<b-button @click="createPost" block variant="success">Post</b-button>
				</b-form-group>
			</b-col>
			<b-col></b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-card-group>
					<b-card
						v-for="(post, index) in posts"
						:key="index"
						:title="post.title"
						header-tag="header"
						footer-tag="footer"
					>
						<b-card-text>{{post.content}}</b-card-text>
						<template v-slot:footer>
							<b-button size="sm" @click="deletePost(post._id)" variant="danger">remove</b-button>
						</template>
					</b-card>
				</b-card-group>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import PostService from "../postService.js";
import {
	BBadge,
	BButton,
	BFormInput,
	BFormGroup,
	BCard,
	BCardGroup
} from "bootstrap-vue";

export default {
	name: "posts",
	pluggins: {
		"b-badge": BBadge,
		"b-button": BButton,
		"b-form-input": BFormInput,
		"b-form-group": BFormGroup,
		"b-card": BCard,
		"b-card-group": BCardGroup
	},
	props: {},
	data() {
		return {
			posts: [],
			error: "",
			text: ""
		};
	},
	methods: {
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
