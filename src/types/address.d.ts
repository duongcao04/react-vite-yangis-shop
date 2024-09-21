type Province = {
    code: string
    name: string
}
type District = {
    code: string
    name: string
    province: string
}
type Commune = {
    code: string
    name: string
    district: string
    province: string
}
