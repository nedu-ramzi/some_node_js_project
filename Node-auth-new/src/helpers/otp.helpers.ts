export const otpGen = (): string => {
    return Math.floor(Math.random() * 999999).toString();
}