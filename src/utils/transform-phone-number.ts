export const transformPhoneNumber = (
    phoneNumber: string,
    countryCode: string
) => {
    const isStartWithZero = phoneNumber.split('')[0] === '0'

    if (isStartWithZero) {
        return phoneNumber.replace('0', countryCode)
    }

    return phoneNumber
}
