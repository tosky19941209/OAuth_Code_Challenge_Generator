const generateRandomBase64String = async (length = 24) =>
    Buffer.from(crypto.getRandomValues(new Uint8Array(length))).toString(
        'base64url'
    );

const computeCodeChallengeFromVerifier = async (verifier) => {
    const hashedValue = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(verifier)
    );
    return Buffer.from(hashedValue).toString('base64url');
};

const isCodeVerifierValid = async (codeVerifier, codeChallenge) =>
    (await computeCodeChallengeFromVerifier(codeVerifier)) === codeChallenge;


const main = async () => {
    const codeVerifier = await generateRandomBase64String();
    const codeChallenge = await computeCodeChallengeFromVerifier(codeVerifier);

    if (isCodeVerifierValid(codeVerifier, codeChallenge))
        console.log("code Veriffier =>", codeVerifier)
    console.log("code Challenge =>", codeChallenge)
    console.log('verifier matches!')
}


main()