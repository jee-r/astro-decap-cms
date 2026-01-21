// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import DecapCMS from '@jee-r/astro-decap-cms';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [
		mdx(),
		sitemap(),
		DecapCMS({
			previewStyles: [
				'/src/styles/global.css',
				'/src/styles/cms-preview.css',
			],
			config: {
				backend: {
					name: 'git-gateway',
					branch: 'main',
				},
				media_folder: 'src/assets',
				public_folder: '../../assets',
				collections: [
					{
						name: 'blog',
						label: 'Blog Posts',
						label_singular: 'Blog Post',
						folder: 'src/content/blog',
						create: true,
						delete: true,
						fields: [
							{
								name: 'title',
								widget: 'string',
								label: 'Title',
							},
							{
								name: 'description',
								widget: 'text',
								label: 'Description',
							},
							{
								name: 'pubDate',
								widget: 'datetime',
								label: 'Publication Date',
								format: 'MMM DD YYYY',
								date_format: 'MMM DD YYYY',
								time_format: false,
							},
							{
								name: 'updatedDate',
								widget: 'datetime',
								label: 'Updated Date',
								format: 'MMM DD YYYY',
								date_format: 'MMM DD YYYY',
								time_format: false,
								required: false,
							},
							{
								name: 'heroImage',
								widget: 'image',
								label: 'Hero Image',
								required: false,
							},
							{
								name: 'body',
								widget: 'markdown',
								label: 'Post Content',
							},
						],
					},
				],
			},
		}),
	],
});
