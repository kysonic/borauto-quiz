import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const generateFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};
