import React from 'react';
import { reloadRoutes } from 'react-static/node';
import jdown from 'jdown';
import chokidar from 'chokidar';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './config/site.json';

chokidar.watch('content').on('all', () => reloadRoutes());

export default {
  siteRoot: 'https://bonner.jp',
  getSiteData: () => ({
    title: 'jp',
  }),
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#2b5876" />
        <meta name="application-name" content="jp"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>jp</title>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  getRoutes: async () => {
    let { posts, jobAd } = await jdown('content');
    posts = posts.filter(p => p.public);
    return [
      {
        path: '/',
        component: 'src/components/home',
        getData: () => ({
          config,
          posts,
        }),
      },
      {
        path: '/work',
        component: 'src/components/work',
        getData: () => ({
          config,
          jobAd
        }),
      },
      {
        path: '/posts',
        component: 'src/components/blag',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/${post.slug}`,
          component: 'src/components/post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  webpack: (config, { defaultLoaders, stage }) => {
    let loaders = [];

    if (stage === 'dev') {
      loaders = [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }];
    } else {
      loaders = [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: stage === 'prod',
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader'
        },
      ];

      // Don't extract css to file during node build process
      if (stage !== 'node') {
        loaders = ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: false,
              hmr: false,
            },
          },
          use: loaders,
        });
      }
    }

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: loaders,
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ];
    return config;
  },
};
