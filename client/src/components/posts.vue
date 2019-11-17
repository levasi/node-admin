<template>
	<div class="posts-wrapper">
		<div class="posts-form">
			<input v-model="text" type="text" />
			<button @click="createPost">Add Post</button>
			<BButton block variant="success">Block Level Button</BButton>
			<div class="test">
				test
				<span>one two</span>
			</div>
			<h4>
				<BBadge>New</BBadge>
			</h4>
		</div>
		<div class="posts">
			<div class="post" v-for="(post, index) in posts" :key="index">
				<h4>{{post.title}}</h4>
				<p class="post-content">{{post.content}}</p>
				<button @click="deletePost(post._id)">delete</button>
			</div>
		</div>
	</div>
</template>

<script>
import PostService from "../postService.js";
import { BBadge } from "bootstrap-vue";
import { BButton } from "bootstrap-vue";

export default {
	name: "posts",
	pluggins: {
		BBadge,
		BButton
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
.test {
	padding: 15px;
	span {
		color: green;
		font-weight: bold;
	}
}
</style>
