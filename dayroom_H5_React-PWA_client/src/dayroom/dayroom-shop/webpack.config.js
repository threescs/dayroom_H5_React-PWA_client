const path = require('path');
const parentTheme = path.resolve(process.cwd() + '/../../pwa-studio/packages/venia-concept');
// 此处还用venia-concept 的环境变量
const validEnv = require(`${parentTheme}/validate-environment`)(process.env);
const webpack = require('webpack');
const {
    WebpackTools: {
        makeMagentoRootComponentsPlugin,
        ServiceWorkerPlugin,
        MagentoResolver,
        UpwardPlugin,
        PWADevServer
    }
} = require('@magento/pwa-buildpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const themePaths = {
    images: path.resolve(__dirname, 'images'),
    templates: path.resolve(__dirname, 'templates'),
    src: path.resolve(__dirname, 'src'),
    output: path.resolve(__dirname, 'dist')
};

const rootComponentsDirs = [
    path.resolve(parentTheme, 'src/RootComponents/'),
    './src/RootComponents/'
];

const libs = [
    'apollo-cache-inmemory',
    'apollo-cache-persist',
    'apollo-client',
    'apollo-link-context',
    'apollo-link-http',
    'informed',
    'react',
    'react-apollo',
    'react-dom',
    'react-feather',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-actions',
    'redux-thunk',
];

module.exports = async function(env) {
    const mode = (env && env.mode) || process.env.NODE_ENV || 'development';

    const enableServiceWorkerDebugging =
        validEnv.ENABLE_SERVICE_WORKER_DEBUGGING;

    const serviceWorkerFileName = validEnv.SERVICE_WORKER_FILE_NAME;
    const braintreeToken = validEnv.BRAINTREE_TOKEN;

    const config = {
        mode,
        context: __dirname, // Node global for the running script's directory
        entry: {
            client: path.resolve(themePaths.src, 'index.js')
        },
        output: {
            path: themePaths.output,
            publicPath: '/',
            filename: 'js/[name].js',
            strictModuleExceptionHandling: true,
            chunkFilename: 'js/[name]-[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.graphql$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'graphql-tag/loader'
                        }
                    ]
                },
                {
                    include: [
                        themePaths.src,
                        /peregrine\/src\//,
                        path.resolve(parentTheme, 'src')
                    ],
                    test: /\.(mjs|js)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                envName: mode,
                                rootMode: 'upward'
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                localIdentName:
                                    '[name]-[local]-[hash:base64:3]',
                                    // '[local]',
                                modules: true
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    // Exclude files from these locations
                    exclude: /node_modules|bower_components/,
                    // fallback: 'style-loader',
                    use: [
                        // Default style loader
                        'style-loader',
                        // CSS loader
                        {
                            loader: 'css-loader',
                            // Scepcify options for the CSS loader
                            options: {
                                // Root - must be specified in order to resolve URLs
                                // in css files and pick up on any images and fonts.
                                //root: paths.appSrc,
                                importLoaders: 2,
                                localIdentName:
                                    // '[name]-[local]-[hash:base64:3]',
                                    '[local]',
                                modules: true,
                            }
                        },
                        //reason we don't watch scss and css at the same time sass-loader see https://github.com/sass/node-sass/issues/2251
                        //SASS loader
                        {
                            loader: 'sass-loader',
                            options: {
                                data: '@import "./src/styles/core";',
                            }
                        }
                    ],
                },
                {
                    test: /\.(jpg|png|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        resolve: {
            modules: [__dirname, 'node_modules', parentTheme],
            mainFiles: ['index'],
            extensions: ['.mjs', '.js', '.json', '.graphql'],
            alias: {
                // 此处定义了在此店面对venia组件接口(别名)
                parentSrc: path.resolve(parentTheme, 'src'),
                parentComponents: path.resolve(parentTheme, 'src/components'),
                parentQueries: path.resolve(parentTheme, 'src/queries')
            }

        },
        plugins: [
            await makeMagentoRootComponentsPlugin({
                rootComponentsDirs,
                context: __dirname
            }),
            new webpack.EnvironmentPlugin(validEnv),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(mode),
                    // Blank the service worker file name to stop the app from
                    // attempting to register a service worker in index.js.
                    // Only register a service worker when in production or in the
                    // special case of debugging the service worker itself.
                    SERVICE_WORKER: JSON.stringify(
                        mode === 'production' || enableServiceWorkerDebugging
                            ? serviceWorkerFileName
                            : false
                    ),
                    BRAINTREE_TOKEN: JSON.stringify(braintreeToken)
                }
            }),
            new ServiceWorkerPlugin({
                env: { mode },
                enableServiceWorkerDebugging,
                serviceWorkerFileName,
                paths: themePaths,
                injectManifest: true,
                injectManifestConfig: {
                    include: [/\.js$/],
                    swSrc: path.resolve(parentTheme, 'src/sw.js'),
                    swDest: 'sw.js'
                }
            }),
            new WebpackAssetsManifest({
                output: 'asset-manifest.json',
                entrypoints: true,
                // Add explicit properties to the asset manifest for
                // venia-upward.yml to use when evaluating app shell templates.
                transform(assets) {
                    // All RootComponents go to prefetch, and all client scripts
                    // go to load.
                    assets.bundles = {
                        load: assets.entrypoints.client.js,
                        prefetch: []
                    };
                    Object.entries(assets).forEach(([name, value]) => {
                        if (name.startsWith('RootCmp')) {
                            const filenames = Array.isArray(value)
                                ? value
                                : [value];
                            assets.bundles.prefetch.push(...filenames);
                        }
                    });
                }
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: new RegExp(
                            `[\\\/]node_modules[\\\/](${libs.join('|')})[\\\/]`
                        ),
                        chunks: 'all'
                    }
                }
            }
        }
    };
    if (mode === 'development') {
        config.devtool = 'eval-source-map';

        const devServerConfig = {
            env: validEnv,
            publicPath: config.output.publicPath,
            graphqlPlayground: {
                queryDirs: [
                    path.resolve(themePaths.src, 'queries'),
                    path.resolve(parentTheme, 'src/queries')
                ]
            }
        };
        const provideHost = !!validEnv.MAGENTO_BUILDPACK_PROVIDE_SECURE_HOST;
        if (provideHost) {
            devServerConfig.provideSecureHost = {
                subdomain: validEnv.MAGENTO_BUILDPACK_SECURE_HOST_SUBDOMAIN,
                exactDomain:
                validEnv.MAGENTO_BUILDPACK_SECURE_HOST_EXACT_DOMAIN,
                addUniqueHash: !!validEnv.MAGENTO_BUILDPACK_SECURE_HOST_ADD_UNIQUE_HASH
            };
        }
        config.devServer = await PWADevServer.configure(devServerConfig);

        // A DevServer generates its own unique output path at startup. It needs
        // to assign the main outputPath to this value as well.

        config.output.publicPath = config.devServer.publicPath;

        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new UpwardPlugin(
                config.devServer,
                validEnv,
                path.resolve(__dirname, validEnv.UPWARD_JS_UPWARD_PATH)
            )
        );
    } else if (mode === 'production') {
        config.performance = {
            hints: 'warning'
        };
        if (!process.env.DEBUG_BEAUTIFY) {
            config.optimization.minimizer = [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                    terserOptions: {
                        ecma: 8,
                        parse: {
                            ecma: 8
                        },
                        compress: {
                            drop_console: true
                        },
                        output: {
                            ecma: 7,
                            semicolons: false
                        },
                        keep_fnames: true
                    }
                })
            ];
        }
    } else {
        throw Error(`Unsupported environment mode in webpack config: ${mode}`);
    }
    return config;
};