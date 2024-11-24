const settings = {
	modes: {
		dev: 'dev',
		prod: 'prod',
	},
};

settings.builds = {
	[settings.modes.dev]: 'development',
	[settings.modes.prod]: 'production',
};

module.exports = settings;
