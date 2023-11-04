export default function generateRandomId(): string {
    let randomId = '';
    const idLength = 9;

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * 9);
        randomId += randomIndex;
    }

    return randomId;
};