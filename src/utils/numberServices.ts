function formatMoney(argument: string | number) {
    const result: number = +argument
    return result.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
}

export { formatMoney }
