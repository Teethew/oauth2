function base64urlEncode(str: string) {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export function generateRandomString(len: number) {
    const arr = new Uint8Array(len);
    window.crypto.getRandomValues(arr);
    const buf = new TextDecoder()
        .decode(arr)
        .replace(/[^\x00-\x7F]/g, "");

    console.log(buf)
    const str = base64urlEncode(buf);
    return str.substring(0, len);
}