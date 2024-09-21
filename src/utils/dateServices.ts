export const shortDateFormat = (argument: string) => {
    const date = new Date(argument)
    return date.toLocaleDateString('vi-VN')
}
