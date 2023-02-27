import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverageFrom: [
        "src/**/*.{ts,tsx,js,jsx}",
        "pages/*.{ts,tsx,js,jsx}"
    ],
};

export default config;
